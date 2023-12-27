<template>
  <div>
    <h3>{{ title }}</h3>
    <div class="quiz-form">
      <input v-model="fragenField" placeholder="Frage" type="text">
      <button type="button" @click="save">Speichern</button>
    </div>
    <div>
      <table>
        <thead>
        <tr>
          <th>Frage</th>
          <th>Aktionen</th>
        </tr>
        </thead>
        <tbody>
        <tr v-if="items.length === 0">
          <td colspan="2">Keine Fragen vorhanden</td>
        </tr>
        <tr v-for="frage in items" :key="frage.id">
          <td>{{ frage.text }}</td>
          <td>
            <button @click="remove(frage.id)">Löschen</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Ref } from 'vue';

defineProps<{
  title: string;
}>()

type Frage = { id?: number, text: string };

const items: Ref<Frage[]> = ref([]);
const fragenField = ref('');

function loadFragen() {
  const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
  const endpoint = `${baseUrl}/api/v1/frage`;
  fetch(endpoint)
      .then(response => response.json())
      .then(result => {
        items.value = result;
      })
      .catch(error => console.error('Fehler beim Laden der Fragen:', error));
}

function save() {
  const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
  const endpoint = `${baseUrl}/api/v1/frage`;
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
      .then(response => response.json())
      .then(savedFrage => {
        console.log('Erfolg:', savedFrage);
        items.value.push(savedFrage);
        fragenField.value = '';
      })
      .catch(error => console.error('Fehler beim Speichern der Frage:', error));
}

function remove(id: number | undefined) {
  if (id !== undefined) {
    const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
    const endpoint = `${baseUrl}/api/v1/frage/${id}`;
    const requestOptions: RequestInit = {
      method: 'DELETE',
      redirect: 'follow',
    };
    fetch(endpoint, requestOptions)
        .then(response => {
          if (response.ok) {
            // Entferne die Frage mit der angegebenen ID aus der Liste
            items.value = items.value.filter(frage => frage.id !== id);
            console.log('Frage erfolgreich gelöscht.');
          } else {
            console.error('Fehler beim Löschen der Frage:', response.statusText);
          }
        })
        .catch(error => console.error('Fehler beim Löschen:', error));
  }
}

onMounted(() => {
  loadFragen();
});
</script>

<style scoped>
h3 {
  text-align: center;
  margin-bottom: 20px;
  color: #3498db;
}

.quiz-form {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

input {
  flex: 1;
  padding: 8px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  color: #fff;
  background-color: #3498db;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 4px;
}

button:hover {
  background-color: #217dbb;
}

table {
  margin: 0 auto;
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

th {
  background-color: #3498db;
  color: #fff;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

tr:hover {
  background-color: #e0e0e0;
}

td button {
  background-color: #e74c3c;
}

td button:hover {
  background-color: #c0392b;
}
</style>
