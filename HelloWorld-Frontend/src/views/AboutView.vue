<template>
  <div v-if="quizStarted" class="quiz">
    <!-- Hier werden die Fragen angezeigt -->
    <h3 class="quiz-question">{{ currentQuestion.text }}</h3>
    <div class="quiz-options">
      <div v-for="(option, index) in currentQuestion.options" :key="index" class="quiz-option">
        <input
            type="radio"
            :id="`option-${index}`"
            :value="option"
            v-model="selectedOption"
            class="quiz-radio"
        />
        <label :for="`option-${index}`" class="quiz-label">{{ option }}</label>
      </div>
    </div>
    <button @click="nextQuestion" class="quiz-button">Next</button>
  </div>

  <div v-else class="about">
    <div class="content">
      <h1>About Us</h1>
      <p>
        Welcome to our quiz app, where learning is fun! We're dedicated to creating an interactive platform that makes education enjoyable for everyone.
      </p>
      <button @click="startQuiz" class="quiz-start-button">Start Quiz</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const quizStarted = ref(false);
const questions = [
  {
    text: 'Wie viele Finger hast du an einer Hand?',
    options: ['Drei', 'Fünf', 'Zwei'],
    correctAnswer: 'Fünf',
  },
  {
    text: 'Was ist die Farbe des Himmels?',
    options: ['Grün', 'Blau', 'Rot'],
    correctAnswer: 'Blau',
  },
  {
    text: 'Wie nennt man das Tier, das auf Bäumen lebt und Nüsse isst?',
    options: ['Hund', 'Katze', 'Eichhörnchen'],
    correctAnswer: 'Eichhörnchen',
  },
  {
    text: 'Was macht die Sonne am Tag?',
    options: ['Schlafen', 'Lachen', 'Scheinen'],
    correctAnswer: 'Scheinen',
  },
  {
    text: 'Wie nennt man das fliegende Insekt, das Licht anzieht?',
    options: ['Schmetterling', 'Biene', 'Mücke'],
    correctAnswer: 'Schmetterling',
  },
  {
    text: 'Was trägt man an den Füßen?',
    options: ['Hut', 'Schuhe', 'Handschuhe'],
    correctAnswer: 'Schuhe',
  },
  {
    text: 'Welches Fahrzeug fährt auf Schienen?',
    options: ['Auto', 'Flugzeug', 'Zug'],
    correctAnswer: 'Zug',
  },
  {
    text: 'Was wächst auf Bäumen und kann man essen?',
    options: ['Steine', 'Blumen', 'Äpfel'],
    correctAnswer: 'Äpfel',
  },
  {
    text: 'Wie nennt man den Ort, an dem man schläft?',
    options: ['Küche', 'Schlafzimmer', 'Wohnzimmer'],
    correctAnswer: 'Schlafzimmer',
  },
  {
    text: 'Was macht man mit einem Regenschirm?',
    options: ['Essen', 'Spielen', 'Schützen'],
    correctAnswer: 'Schützen',
  },
];
let currentQuestionIndex = ref(0);
const currentQuestion = ref(questions[currentQuestionIndex.value]);
const selectedOption = ref(null);

const startQuiz = () => {
  quizStarted.value = true;
};

const nextQuestion = () => {
  // Handle selected option logic, score tracking, etc.
  // For simplicity, this example just moves to the next question.
  currentQuestionIndex.value++;
  if (currentQuestionIndex.value < questions.length) {
    currentQuestion.value = questions[currentQuestionIndex.value];
    selectedOption.value = null;
  } else {
    // Quiz is finished
    quizStarted.value = false;
    // Add logic for displaying quiz results or other actions
  }
};
</script>

<style scoped>
.about {
  background-color: #f9f9f9;
  color: #333;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.content {
  max-width: 800px;
  text-align: center;
  padding: 40px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  border-radius: 8px;
}

h1 {
  color: #3498db;
}

p {
  color: #555;
  line-height: 1.6;
}

.quiz {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.quiz h3 {
  color: #3498db;
}

.quiz label {
  margin-right: 10px;
}

.quiz-button {
  background-color: #3498db;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
  margin-top: 20px;
  transition: background-color 0.3s ease;
}

.quiz-button:hover {
  background-color: #217dbb;
}
</style>
