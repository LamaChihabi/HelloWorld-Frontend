<template>
  <div class="quiz-container">
    <template v-if="!quizStarted">
      <div class="about">
        <div class="content">
          <h1>About Us</h1>
          <p>
            Welcome to our quiz app, where learning is fun! We're dedicated to creating an
            interactive platform that makes education enjoyable for everyone.
          </p>
          <button @click="startQuiz" class="quiz-start-button">Start Quiz</button>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="quiz">
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
        <button @click="checkAnswer" class="quiz-button">Check Answer</button>
        <p v-if="showMessage">{{ message }}</p>
        <button v-if="showEndButton" @click="endQuiz" class="quiz-button">Quiz Beenden</button>
        <template v-if="quizCompleted">
          <p>Super gemacht! Du bist schlau 🌟</p>
          <button @click="endQuiz" class="quiz-button">Quiz Beenden</button>
        </template>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

interface Question {
  text: string;
  options: string[];
  correctAnswer: string;
}

export default defineComponent({
  data() {
    return {
      quizStarted: false,
      questions: [
        {
          text: 'Wie viele Finger hast du an einer Hand?',
          options: ['Drei', 'Fünf', 'Zwei'],
          correctAnswer: 'Fünf',
        },
        {
          text: 'Was ist die Hauptstadt von Frankreich?',
          options: ['Berlin', 'Madrid', 'Paris'],
          correctAnswer: 'Paris',
        },
        {
          text: 'Welches Element hat das chemische Symbol "O"?',
          options: ['Sauerstoff', 'Gold', 'Eisen'],
          correctAnswer: 'Sauerstoff',
        },
        {
          text: 'Welches Element hat das chemische Symbol "H"?',
          options: ['Helium', 'Wasserstoff', 'Stickstoff'],
          correctAnswer: 'Wasserstoff',
        },
        {
          text: 'Was ist die Hauptstadt von Spanien?',
          options: ['Berlin', 'Madrid', 'Paris'],
          correctAnswer: 'Madrid',
        },
        {
          text: 'Wie nennt man einen männlichen Hund?',
          options: ['Katze', 'Hund', 'Kater'],
          correctAnswer: 'Hund',
        },
      ] as Question[],
      currentQuestionIndex: 0,
      currentQuestion: {} as Question,
      selectedOption: null as string | null,
      showMessage: false,
      message: '',
      showEndButton: true,
      quizCompleted: false,
    };
  },
  methods: {
    startQuiz() {
      this.quizStarted = true;
      this.showNextQuestion();
    },
    showNextQuestion() {
      if (this.currentQuestionIndex < this.questions.length) {
        this.currentQuestion = this.questions[this.currentQuestionIndex];
        this.selectedOption = null;
        this.showMessage = true;
      } else {
        this.endQuiz();
      }
    },
    checkAnswer() {
      if (this.selectedOption === this.currentQuestion.correctAnswer) {
        this.showMessage = true;
        this.message = 'Richtig! Weiter zur nächsten Frage.';
        this.currentQuestionIndex++;
        this.showNextQuestion();
      } else {
        this.showMessage = true;
        this.message = 'Falsch! Versuche es erneut.';
      }
    },
    endQuiz() {
      this.quizStarted = false;
      this.showEndButton = true;
      const correctAnswers = this.questions.filter(
          (question) => question.correctAnswer === this.selectedOption
      ).length;

      if (correctAnswers === this.questions.length) {
        this.message = 'Super gemacht! Du bist schlau 🌟';
        this.showEndButton = true;
        this.quizCompleted = true;
      } else if (correctAnswers >= this.questions.length / 2) {
        this.message = 'Du hast es geschafft. Gut gemacht!';
        this.showEndButton = true;
      } else {
        this.message = 'Versuch es nochmal, du schaffst das!';
      }
    },
  },
});
</script>

<style scoped>
.quiz-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5; /* Hintergrundfarbe des Quizcontainers */
}

.about {
  text-align: center;
  padding: 20px;
}

.content {
  max-width: 600px;
  margin: 0 auto;
}

h1 {
  color: #3498db; /* Blaue Textfarbe für h1 */
}

p {
  color: #555;
  line-height: 1.6;
}

.quiz {
  max-width: 600px;
  text-align: center;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  background-color: #ffffff; /* Weißer Hintergrund für das Quiz */
  animation: fadeIn 0.5s ease;
  margin: 20px;

  height: 500px; /* Ändere dies entsprechend deinen Bedürfnissen */
}

.quiz-question {
  color: #3498db; /* Blaue Textfarbe für Quiz-Fragen */
  font-size: 1.5em; /* Vergrößere die Schriftgröße */
  margin-bottom: 20px; /* Erhöhung den Abstand nach unten */
}

.quiz-options {
  margin-top: 20px;
}

.quiz-option {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.quiz-radio {
  margin-right: 10px;
}

.quiz-label {
  color: #555;
  margin-left: 5px;
  font-size: 1.2em; /*die Schriftgröße der Antworten */
}

.quiz-button {
  background-color: #3498db;
  color: #fff;
  border: none;
  padding: 12px 24px; /*  die Polsterung */
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
  margin-top: 30px; /* Abstand nach oben */
  transition: background-color 0.3s ease;
}

.quiz-button:hover {
  background-color: #217dbb;
}

p {
  margin-top: 10px;
  color: #e74c3c; /* Rote Textfarbe für Fehlermeldung */
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>

