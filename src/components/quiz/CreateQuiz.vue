<template>
  <!-- <div class="w-full max-w-xs"> -->
    <form class="bg-white rounded px-8 pt-6 pb-8 mb-4">
      <section class="relative mb-6 pb-3">
        <label 
          for="title" 
          class="block text-blue-darker font-bold text-sm mb-2">
          Quiz Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          v-model="$v.quiz.title.$model"
          class="shadow appearance-none rounded border-blue-lighter border w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline"
        />
        <p v-if="errors" class="absolute pin-b pin-x">
          <span class="error" v-if="!$v.quiz.title.required">This field is required.</span>
        </p>
      </section>

      <section class="relative mb-6 pb-3">
        <label 
          for="description" 
          class="block text-blue-darker font-bold text-sm mb-2">
          Quiz Description
        </label>
        <input
          type="text"
          name="description"
          id="description"
          v-model="$v.quiz.description.$model"
          class="shadow appearance-none rounded border-blue-lighter border w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline"
        />
        <p v-if="errors" class="absolute pin-b pin-x">
          <span class="error" v-if="!$v.quiz.description.required">This field is required. </span>
          <span class="error" v-if="!$v.quiz.description.minLength">Field must have at least {{ $v.quiz.description.$params.minLength.min }} characters.</span>
        </p>
      </section>
      
      <section class="relative mb-6 pb-3">
        <label 
          for="passingScorePercent" 
          class="block text-blue-darker font-bold text-sm mb-2">
          Minimum %
        </label>
        <input
          type="number"
          min="0"
          max="100"
          name="passingScorePercent"
          id="passingScorePercent"
          v-model="$v.quiz.passingScorePercent.$model"
          class="shadow appearance-none rounded border-blue-lighter border w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline"
        />
      </section>

      <section v-if="quiz.questions.length" class="relative mb-6 pb-3">
        <!-- <label class="block text-blue-darker font-bold text-lg mb-2">
          Questions
        </label> -->
        <!-- Accordion these questions -->
        <div v-for="(question, index) in quiz.questions" :key="index">
          <p>{{ question.text }}</p>
          <p
            :class="{ 'bg-green-lightest': answer.isRight }"
            v-for="(answer, index) in question.answers"
            :key="index">
            <svg v-if="answer.isRight" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-8 mr-4 fill-current icon-check">
              <circle cx="12" cy="12" r="10" class="text-green-light"></circle>
              <path class="text-green-darker" d="M10 14.59l6.3-6.3a1 1 0 0 1 1.4 1.42l-7 7a1 1 0 0 1-1.4 0l-3-3a1 1 0 0 1 1.4-1.42l2.3 2.3z"></path>
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-8 mr-4 fill-current icon-close-circle">
              <circle cx="12" cy="12" r="10" class="text-red-light"></circle>
              <path class="text-red-darker" d="M13.41 12l2.83 2.83a1 1 0 0 1-1.41 1.41L12 13.41l-2.83 2.83a1 1 0 1 1-1.41-1.41L10.59 12 7.76 9.17a1 1 0 0 1 1.41-1.41L12 10.59l2.83-2.83a1 1 0 0 1 1.41 1.41L13.41 12z"></path>
            </svg>
            {{ answer.text }}
          </p>
        </div>
      </section>

      <section class="relative mb-6 pb-3">
          <section class="relative mb-6 pb-3">
            <label 
              for="questiontext"
              class="block text-blue-darker font-bold text-sm mb-2">
              Question Text
            </label>
            <input
              type="text"
              name="questiontext"
              class="shadow appearance-none rounded border-blue-lighter border w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline"
              v-model="question.text"/>
          </section>
          <div v-for="(answer, index) in question.answers" :key="index">
            <p
              :class="{ 'bg-green-lightest': answer.isRight }"
              v-for="(answer, index) in question.answers"
              :key="index">
              <svg v-if="answer.isRight" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-8 mr-4 fill-current icon-check">
                <circle cx="12" cy="12" r="10" class="text-green-light"></circle>
                <path class="text-green-darker" d="M10 14.59l6.3-6.3a1 1 0 0 1 1.4 1.42l-7 7a1 1 0 0 1-1.4 0l-3-3a1 1 0 0 1 1.4-1.42l2.3 2.3z"></path>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-8 mr-4 fill-current icon-close-circle">
                <circle cx="12" cy="12" r="10" class="text-red-light"></circle>
                <path class="text-red-darker" d="M13.41 12l2.83 2.83a1 1 0 0 1-1.41 1.41L12 13.41l-2.83 2.83a1 1 0 1 1-1.41-1.41L10.59 12 7.76 9.17a1 1 0 0 1 1.41-1.41L12 10.59l2.83-2.83a1 1 0 0 1 1.41 1.41L13.41 12z"></path>
              </svg>
              {{ answer.text }}
            </p>
          </div>
          <section class="relative mb-6 pb-3">
            <label 
              for="answertext"
              class="block text-blue-darker font-bold text-sm mb-2">
              Answer
            </label>
            <input
              type="text"
              name="answertext"
              class="shadow appearance-none rounded border-blue-lighter border w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline"
              v-model="answer.text"/>
            <label for="answerisright">
              <input
                type="checkbox"
                name="answerisright"
                value="isRight"
                v-model="answer.isRight"/>
                Correct?
            </label>
          </section>
          <section class="relative mb-6 pb-3">
            <label 
              for="themoreyouknow"
              class="block text-blue-darker font-bold text-sm mb-2">
              The More You Know 🌈
            </label>
            <input
              type="text"
              name="themoreyouknow"
              class="shadow appearance-none rounded border-blue-lighter border w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline"
              v-model="question.theMoreYouKnow"
            />
          </section>
        </section>
        <button @click.prevent="addAnswer" class="border-2 rounded border-blue">
          Add Answer
        </button>
        <button
          @click.prevent="addQuestion"
          :disabled="question.answers.length < 2"
          class="border-2 rounded border-blue"
        >
          Add Question
        </button>

      <button @click.prevent="submitQuiz" class="border-2 rounded border-blue">
        Create
      </button>
    </form>
  <!-- </div> -->
</template>

<script>
import Api from '../../services/Api'
import {
  required,
  minLength,
  maxLength,
  sameAs,
  } from 'vuelidate/lib/validators/'

export default {
  name: "CreateQuiz",
  data() {
    return {
      feedback: null,
      uiState: 'submit not clicked',
      errors: false,
      formTouched: true,
      quiz: {
        title: "",
        description: "",
        passingScorePercent: 100,
        questions: [],
        lessonSlug: ''
      },
      question: {
        text: "",
        answers: [],
        theMoreYouKnow: ""
      },
      answer: {
        text: "",
        isRight: false
      }
    };
  },
  validations: {
    quiz: {
      title: {
        required,
      },
      description: {
        required,
        maxLength: maxLength(255),
      },
      passingScorePercent: {
        required,
      },
    }
  },
  methods: {
    addQuestion() {
      if (this.question.answers.length > 1) {
        this.quiz.questions.push({
          text: this.question.text,
          answers: this.question.answers,
          theMoreYouKnow: this.question.theMoreYouKnow
        });
        this.question.text = "";
        this.question.answers = [];
        this.question.theMoreYouKnow = "";
      }
      console.log("added a question");
    },
    removeQuestion(i) {
      console.log("removed question", i);
    },
    addAnswer() {
      this.question.answers.push({
        text: this.answer.text,
        isRight: this.answer.isRight
      });
      this.answer.text = "";
      this.answer.isRight = false;
      console.log("added an answer");
    },
    removeAnswer(i) {
      console.log("removed question", i);
    },
    submitQuiz() {
      console.log(this.quiz);
    }
  }
};
</script>

<style lang="postcss" scoped>
.error {
  @apply text-red text-sm italic;
}
</style>