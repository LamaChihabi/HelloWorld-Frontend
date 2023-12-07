import './assets/main.css'

import { createApp } from 'vue';
import App from './App.vue';
import HelloWorld from './components/HelloWorld.vue';

const app = createApp(App);

// Registriere die HelloWorld-Komponente
app.component('HelloWorld', HelloWorld);

app.mount('#app');
