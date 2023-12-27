<template>
  <main>
    <FrageKomponente title="Willkommen bei deiner Quiz-App"/>
  </main>
</template>

<script setup lang="ts">
import FrageKomponente from '@/components/FrageKomponente.vue'
</script>

<style scoped>
main {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f5f5f5; /* Hellgrauer Hintergrund */
}

.FrageKomponente {
  max-width: 600px;
  padding: 40px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  background-color: #ffffff; /* Weißer Hintergrund */
  border-radius: 16px; /* Stärker abgerundete Ecken */
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out; /* Flüssige Animation */
}

.FrageKomponente:hover {
  transform: scale(1.05); /* Leichtes Vergrößern beim Hover */
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2); /* Stärkerer Schatten beim Hover */
}

h1 {
  color: #3498db; /* Blaue Überschrift */
  text-align: center;
  font-size: 32px; /* Größere Schriftgröße */
}

/* Fügen Sie hier weitere spezifische Styles für Ihre Komponente hinzu */
</style>
