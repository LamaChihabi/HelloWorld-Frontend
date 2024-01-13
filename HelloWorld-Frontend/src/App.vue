<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <header>
    <div class="logo">
      <!-- Fügen Sie hier Ihr Logo hinzu, wenn vorhanden -->
      <img src="@/assets/Quiz app.png" alt="Logo">

    </div>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/login">Login</RouterLink>
      <RouterLink to ="/Quizspiel">Quizspiel</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  background-color: #8e44ad;
  color: #fff;
  padding: 1rem;
  text-align: center;
}

.logo {
  max-width: 300px;
  margin-bottom: 1rem;

}

.logo img {
  width: 100%; /* Verwende 100% für die volle Breite des Containers */
  height: auto; /* Lass die Höhe automatisch anpassen, um das Seitenverhältnis beizubehalten */
}

nav {
  display: flex;
  justify-content: center;
}

nav a {
  text-decoration: none;
  color: #fff;
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

nav a:hover {
  background-color: #2980b9;
}

nav a.router-link-exact-active {
  background-color: #2980b9;
}
</style>
