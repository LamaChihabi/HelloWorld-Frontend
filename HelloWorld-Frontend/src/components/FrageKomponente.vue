<template>
  <h3>{{ title }}</h3>
  <div>
    <input v-model="FragenField" placeholder="frage" type="text">
    <button type="button" @click="save()">Save</button>
  </div>
  <div>
    <table>
      <thead>
      <tr>
        <th>Frage</th>

      </tr>
      </thead>
      <tbody>
      <tr v-if="items.length === 0">
      </tr>
      <tr>
        <td>{{ FragenField }}</td>

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

type Fragen = { id?: number, text: string};

const items: Ref<Fragen[]> = ref([]);
const FragenField = ref('');

function loadFragen() {
  const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL // 'http://localhost:8080' in dev mode
  const endpoint = baseUrl + '/api/v1/frage'
  const requestOptions: RequestInit = {
    method: 'GET',
    redirect: 'follow',
  }
  fetch(endpoint, requestOptions)
      .then(response => response.json())
      .then(result => result.forEach((frage: Fragen) => {
        items.value.push(frage)
      }))
      .catch(error => console.log('error', error))
}

function save() {
  const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL // 'http://localhost:8080' in dev mode
  const endpoint = baseUrl + '/api/v1/frage'
  const data: Fragen = {
    text: FragenField.value,

  }
  const requestOptions: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }
  fetch(endpoint, requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data)
      })
      .catch(error => console.log('error', error))
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
