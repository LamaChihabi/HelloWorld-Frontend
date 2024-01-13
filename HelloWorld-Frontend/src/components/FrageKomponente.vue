<template>
  <div>
    <h3 class="quiz-title">{{ title }}</h3>
    <div class="quiz-form">
      <input v-model="fragenField" placeholder="Frage" type="text">
      <button type="button" @click="save" class="quiz-button">
        {{ editingId !== null ? 'Aktualisieren' : 'Speichern' }}
      </button>
    </div>

    <input v-model="searchQuery" placeholder="Frage suchen" type="text">
    <div>
      <table class="quiz-table">
        <thead>
        <tr>
          <th>Frage</th>
          <th>Aktionen</th>
        </tr>
        </thead>
        <tbody>
        <tr v-if="filteredItems.length === 0 && !showConfirmation">
          <td colspan="2">Keine Fragen vorhanden</td>
        </tr>
        <tr v-for="frage in filteredItems" :key="frage.id">
          <td>{{ frage.text }}</td>
          <td>
            <button @click="edit(frage)">Bearbeiten</button>
            <button @click="confirmDelete(frage)">Löschen</button>
            <button @click="sortQuestions('asc')" class="quiz-button">
              A-Z <span v-if="sortOrder === 'asc'">🔼</span>
            </button>
            <button @click="sortQuestions('desc')" class="quiz-button">
              Z-A <span v-if="sortOrder === 'desc'">🔽</span>
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div v-if="showConfirmation" class="confirmation-dialog">
      <p>Möchten Sie diese Frage wirklich löschen?</p>
      <button @click="deleteQuestion" class="confirm-button">Ja</button>
      <button @click="cancelDelete" class="cancel-button">Nein</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import type { Ref } from 'vue';

defineProps<{
  title: string;
}>()

type Frage = { id?: number; text: string };

const items: Ref<Frage[]> = ref([]);
const fragenField = ref('');
const editingId = ref<number | null>(null);
const showConfirmation = ref(false);
const questionToDelete = ref<number | null>(null);
const searchQuery = ref('');
const sortOrder = ref<'asc' | 'desc'>('asc');


function loadFragen() {
  const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL || 'http://localhost:8080';
  console.log('baseUrl:', baseUrl)
  const endpoint = `${baseUrl}/api/v1/frage`;
  console.log('endpoint:', endpoint)
  fetch(endpoint)
      .then((response) => response.json())
      .then((result) => {
        items.value = result;
      })
      .catch((error) => console.error('Fehler beim Laden der Fragen:', error));
}

function sortQuestions(order: 'asc' | 'desc') {
  items.value.sort((a, b) =>
      order === 'asc' ? a.text.localeCompare(b.text) : b.text.localeCompare(a.text)
  );
  sortOrder.value = order;
}

function save() {
  const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
  const endpoint = `${baseUrl}/api/v1/frage`;

  if (editingId.value !== null) {
    const editedFrage = items.value.find((frage) => frage.id === editingId.value);
    if (editedFrage) {
      editedFrage.text = fragenField.value;

      const requestOptions: RequestInit = {

        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedFrage),
      };
      fetch(`${endpoint}/${editingId.value}`, requestOptions)
          .then((response) => response.json())
          .then(() => {
            console.log('Erfolg: Frage aktualisiert');
            fragenField.value = '';
            editingId.value = null;
            loadFragen();
          })
          .catch((error) => console.error('Fehler beim Aktualisieren der Frage:', error));
    }
  } else {
    const data: Frage = {
      text: fragenField.value,
    };

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    fetch(endpoint, requestOptions)
        .then((response) => response.json())
        .then((savedFrage) => {
          console.log('Erfolg: Frage gespeichert', savedFrage);
          items.value.push(savedFrage);
          fragenField.value = '';
        })
        .catch((error) => console.error('Fehler beim Speichern der Frage:', error));
  }
}

function edit(frage: Frage) {
  fragenField.value = frage.text;
  editingId.value = frage.id || null;
}

function confirmDelete(frage: Frage) {
  if (frage.id !== undefined) {
    showConfirmation.value = true;
    questionToDelete.value = frage.id;
  }
}

function deleteQuestion() {
  if (questionToDelete.value !== null) {
    remove(questionToDelete.value);
  }
  showConfirmation.value = false;
}

function cancelDelete() {
  showConfirmation.value = false;
}

function remove(id: number) {
  const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
  const endpoint = `${baseUrl}/api/v1/frage`;
  const requestOptions: RequestInit = {
    method: 'DELETE',
    redirect: 'follow',
  };
  fetch(endpoint, requestOptions)
      .then((response) => {
        if (response.ok) {
          items.value = items.value.filter((frage) => frage.id !== id);
          console.log('Frage erfolgreich gelöscht.');
        } else {
          console.error('Fehler beim Löschen der Frage:', response.statusText);
        }
      })
      .catch((error) => console.error('Fehler beim Löschen:', error));
}

const filteredItems = computed(() => {
  let filteredItems = items.value;

  if (searchQuery.value !== '') {
    filteredItems = filteredItems.filter(
        (frage) => frage.text.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  return filteredItems;
});

onMounted(() => {
  loadFragen();
});
</script>

<style scoped>
h3.quiz-title {
  text-align: center;
  margin-bottom: 20px;
  color: #3498db;
  font-family: 'Open Sans', sans-serif;
}

.quiz-form {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

input {
  flex: 1;
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  transition: border-color 0.3s ease;
}

input:focus {
  border-color: #3498db;
}

table.quiz-table {
  margin: 0 auto;
  width: 100%;
  border-collapse: collapse;
}

table.quiz-table th,
table.quiz-table td {
  padding: 12px;
  text-align: left;
}

table.quiz-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

table.quiz-table tr:hover {
  background-color: #e1e1e1;
}

.confirmation-dialog {
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 5px;
  margin-top: 20px;
}

/* Verbessere den Stil der Aktionenbuttons */
.confirm-button,
.cancel-button {
  background-color: #3498db;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
  margin-right: 10px;
  transition: background-color 0.3s ease; /* Füge einen sanften Übergang hinzu */
}

.confirm-button:hover,
.cancel-button:hover {
  background-color: #217dbb; /* Slightly darker blue on hover */
}
</style>
