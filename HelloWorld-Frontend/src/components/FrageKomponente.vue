<template>
  <h3>{{ title }}</h3>
  <div>
    <input v-model="FragenField" placeholder="frage" type="text">
    <!-- <input v-model="AntwortField" placeholder="antwort" @keyup.enter="save()"> -->
    <button type="button" @click="save()">Save</button>
  </div>
  <div>
    <table>
      <thead>
      <tr>
        <th>Frage</th>
        <!-- <th>Antwort</th> -->
      </tr>
      </thead>
      <tbody>
      <tr v-if="items.length === 0">
        <td colspan="2">Noch keine Aufgaben</td>
      </tr>
      <tr v-for="item in items" :key="item.id">
        <td>{{ item.frage }}</td>
        <!-- <td>{{ item.antwort }}</td> -->
      </tr>
      <tr>
        <td>{{ FragenField }}</td>
        <!-- <td>{{ AntwortField }}</td> -->
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Ref } from 'vue';

defineProps<{
  title: string;
}>()

type Fragen = { id?: number, frage: string};

const items: Ref<Fragen[]> = ref([]);
const FragenField = ref('');

function loadFragen() {
  items.value = [];
  fetchData('/Frage', 'GET', {}).then(result => {
    result.forEach((frage: Fragen) => {
      items.value.push(frage);
    });
  });
}

function save() {
  const data: Fragen = {
    frage: FragenField.value,
  };
  fetchData('/frage', 'POST', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(data => {
    console.log('Success:', data);
  }).catch(error => console.log('error', error));
}

async function fetchData(endpoint: string, method: string, options: RequestInit): Promise<any> {
  const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
  const response = await fetch(baseUrl + endpoint, { method, ...options });
  return response.json();
}

// Lifecycle hooks
onMounted(() => {
  loadFragen();
});
</script>

<style scoped>
h3 {
  text-align: center;
}
table {
  margin-left: auto;
  margin-right: auto;
}
button {
  color: blue;
}
</style>
