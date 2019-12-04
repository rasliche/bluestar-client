<template>
  <form class="w-full max-w-3xl bg-white rounded px-8 pt-6 pb-8 mb-4">
    <div class="flex flex-wrap -mx-3">
      <section class="relative w-full md:w-5/6 mb-6 px-3 pb-3">
        <label 
          for="title" 
          class="block text-blue-darker font-bold text-sm mb-2">
          Quiz Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          class="shadow appearance-none rounded border-blue-lighter border w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline"
          v-model="$v.quiz.title.$model"
        />
        <p v-if="errors" class="absolute pin-b pin-x">
          <span class="error" v-if="!$v.quiz.title.required">This field is required.</span>
        </p>
      </section>

      <section class="relative w-full md:w-1/6 mb-6 px-3 pb-3">
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
          class="shadow appearance-none rounded border-blue-lighter border w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline"
          v-model="$v.quiz.passingScorePercent.$model"
        />
        <p v-if="errors" class="absolute pin-b pin-x">
          <span class="error" v-if="!$v.quiz.passingScorePercent.required">This field is required. </span>
        </p>
      </section>

      <section class="relative w-full mb-6 px-3 pb-3">
        <label 
          for="description" 
          class="block text-blue-darker font-bold text-sm mb-2">
          Quiz Description
        </label>
        <input
          type="text"
          name="description"
          id="description"
          class="shadow appearance-none rounded border-blue-lighter border w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline"
          v-model="$v.quiz.description.$model"
        />
        <p v-if="errors" class="absolute pin-b pin-x">
          <span class="error" v-if="!$v.quiz.description.required">This field is required. </span>
          <span class="error" v-if="!$v.quiz.description.minLength">Field must have at least {{ $v.quiz.description.$params.minLength.min }} characters.</span>
          <span class="error" v-if="!$v.quiz.description.maxLength">Field must have less than {{ $v.quiz.description.$params.maxLength.max }} characters.</span>
        </p>
      </section>
    </div>

    <div class="flex flex-wrap -mx-3">
      <CreateQuestion 
        class="w-full md:w-3/5 mb-6 px-3 pb-3"
        @validQuestion="addQuestion"></CreateQuestion>
      <section 
        v-if="quiz.questions.length" 
        class="w-full md:w-2/5 mb-6 px-3 pb-3">
        <!-- Accordion these questions -->
        <ol v-for="(question, index) in quiz.questions" :key="index">
          <li><p>{{ question.text }}</p></li>
          <ul>
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

          </ul>
        </ol>
      </section>
    </div>


    <section class="flex w-full items-center justify-between">
      <button 
        @click.prevent="submitQuiz" 
        class="p-2 rounded mx-auto bg-blue hover:bg-blue-dark text-white focus:outline-none focus:shadow-outline">
        Create
      </button>
    </section>
  </form>
  <!-- </div> -->
</template>

<script>
import Api from '../../services/Api'
import CreateQuestion from '@/components/quiz/CreateQuestion'
import {
  required,
  minLength,
  maxLength,
  sameAs,
  } from 'vuelidate/lib/validators/'

export default {
  name: "CreateQuiz",
  components: { 
    CreateQuestion
  },
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
        // lessonSlug: ''
      },
    };
  },
  validations: {
    quiz: {
      title: {
        required,
      },
      description: {
        required,
        minLength: minLength(15),
        maxLength: maxLength(255),
      },
      passingScorePercent: {
        required,
      },
    },
  },
  methods: {
    addQuestion(question) {
      this.quiz.questions.push(question);
      console.log("added a question");
    },
    removeQuestion(i) {
      console.log("removed question", i);
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