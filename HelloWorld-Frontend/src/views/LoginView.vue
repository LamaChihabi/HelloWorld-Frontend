<template>
  <div class="login-container">
    <h3>Login</h3>
    <div class="form-container">
      <input v-model="email" placeholder="E-Mail" type="text">
      <input v-model="username" placeholder="Benutzername" type="text">
      <input v-model="password" placeholder="Passwort" type="password">
      <button @click="saveUser">Anmelden</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const email = ref('');
const username = ref('');
const password = ref('');

const saveUser = async () => {
  const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
  const endpoint = `${baseUrl}/api/v1/user`;

  const userData = {
    email: email.value,
    username: username.value,
    password: password.value,
  };

  const requestOptions: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  };

  try {
    const response = await fetch(endpoint, requestOptions);

    if (response.ok) {
      // Benutzer erfolgreich erstellt
      console.log('Benutzer erfolgreich erstellt');

      // Hier können Sie den Benutzerstatus aktualisieren oder auf eine andere Seite weiterleiten
      const router = useRouter();
      router.push('/');
    } else {
      // Fehler beim Erstellen des Benutzers
      console.error('Fehler beim Erstellen des Benutzers');
    }
  } catch (error) {
    console.error('Fehler beim Speichern des Benutzers', error);
  }
};
</script>

<style scoped>
.login-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  border-radius: 16px;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.login-container:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
}

h3 {
  text-align: center;
  color: #3498db;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  transition: border-color 0.3s ease;
}

input:focus {
  border-color: #3498db;
}

button {
  background-color: #3498db;
  color: #fff;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #217dbb;
}
</style>
