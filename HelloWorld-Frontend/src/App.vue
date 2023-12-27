<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="logo">
      <!-- Fügen Sie hier Ihr Logo hinzu, wenn vorhanden -->
      <img src="/path/to/your/logo.png" alt="Logo" />
    </div>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  background-color: #3498db; /* Blaue Hintergrundfarbe */
  color: #fff; /* Weiße Textfarbe */
  padding: 1rem;
  text-align: center;
}

.logo {
  margin-bottom: 1rem;
}

.logo img {
  max-width: 100%;
  height: auto;
}

nav {
  display: flex;
  justify-content: center;
}

nav a {
  text-decoration: none;
  color: #fff; /* Weiße Textfarbe */
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

nav a:hover {
  background-color: #2980b9; /* Dunkleres Blau beim Hover */
}

nav a.router-link-exact-active {
  background-color: #2980b9; /* Dunkleres Blau für aktiven Link */
}
</style>
