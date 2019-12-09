<template>
  <div class="flex flex-wrap">
      <div class="flex flex-wrap w-full md:w-2/3">
        <section class="relative w-full mb-6 pb-3">
            <label 
                for="questiontext"
                class="block text-blue-darker font-bold text-sm mb-2">
                Question Text
            </label>
            <input
                type="text"
                name="questiontext"
                class="shadow appearance-none rounded border-blue-lighter border w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline"
                v-model="$v.question.text.$model"
                />
            <p v-if="errors.question" class="absolute pin-b pin-x">
                <span class="error" v-if="!$v.question.text.required">This field is required.</span>
            </p>
        </section>
        <section class="relative w-5/6 mb-6 pb-3">
            <label 
                for="answertext"
                class="block text-blue-darker font-bold text-sm mb-2">
                Answer
            </label>
            <input
                type="text"
                name="answertext"
                class="shadow appearance-none rounded border-blue-lighter border w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline"
                v-model="$v.question.formAnswer.text.$model"
                />
            <p v-if="errors.formAnswer" class="absolute pin-b pin-x">
                <span class="error" v-if="!$v.question.formAnswer.text.required">This field is required.</span>
            </p>
        </section>
        <section class="relative w-1/6 mb-6 pb-3">
            <input
                type="checkbox"
                name="answerisright"
                value="isRight"
                v-model="$v.question.formAnswer.isRight.$model"
                >
            <label 
                for="answerisright"
                class="text-blue-darker font-bold text-sm mb-2">
                Correct?
            </label>
        </section>
        <section class="relative w-full mb-6 pb-3">
            <label 
                for="themoreyouknow"
                class="block text-blue-darker font-bold text-sm mb-2">
                The More You Know 🌈
            </label>
            <input
                type="text"
                name="themoreyouknow"
                class="shadow appearance-none rounded border-blue-lighter border w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline"
                v-model="$v.question.theMoreYouKnow.$model"
                />
            <p v-if="errors.question" class="absolute pin-b pin-x">
                <span class="error" v-if="!$v.question.theMoreYouKnow.required">This field is required.</span>
            </p>
        </section>
    </div>
    <div class="flex flex-wrap w-full md:w-1/3">
      <p class="block text-blue-darker font-bold text-sm">Working Question</p>
        <ul class="w-full list-reset">
            <li
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
            </li>
        </ul>
    </div>
    <section class="flex items-center justify-between">
        <button 
          @click.prevent="addAnswer" 
          class="p-2 mr-3 rounded mx-auto bg-blue hover:bg-blue-dark text-white focus:outline-none focus:shadow-outline">
          Add Answer
        </button>
        <button
          @click.prevent="addQuestion"
          :disabled="question.answers.length < 2"
          class="p-2 rounded mx-auto bg-blue hover:bg-blue-dark text-white focus:outline-none focus:shadow-outline">
          Add Question
        </button>
      </section>
  </div>
</template>

<script>
import {
  required,
  minLength,
  maxLength,
  } from 'vuelidate/lib/validators/'

export default {
  name: "CreateQuestion",
  data() {
    return {
      feedback: null,
      uiState: 'submit not clicked',
      errors: {
          question: false,
          formAnswer: false,
      },
      formTouched: {
          question: true,
          formAnswer: true
      },
      question: {
        text: "",
        answers: [],
        theMoreYouKnow: "",
        formAnswer: {
            text: "",
            isRight: false
        },
      },
    };
  },
  computed: {
      hasEnoughAnswers() {
          return this.question.answers.length > 1
      },
      hasCorrectAnswer() {
          const arrayOfAnswerResults = this.question.answers.map(x => x.isRight)
          return arrayOfAnswerResults.includes(true)
      }
  },
  validations: {
    question: {
      text: {
        required,
      },
      theMoreYouKnow: {
        required,
      },
      formAnswer: {
        text: {
          required,
        },
        isRight: { }
      }
    },
  },
  methods: {
    addQuestion() {
      this.formTouched.question = !this.$v.question.text.$dirty || !this.$v.question.theMoreYouKnow.$dirty;
      this.errors.question = this.$v.question.text.$error || this.$v.question.theMoreYouKnow.$error;
      if (
        this.formTouched.question === false
        && this.errors.question === false
        && this.hasEnoughAnswers
        && this.hasCorrectAnswer
        ) {
          this.$emit('validQuestion', {
            text: this.question.text,
            answers: this.question.answers,
            theMoreYouKnow: this.question.theMoreYouKnow
          });
          this.question.text = "";
          this.question.answers = [];
          this.question.theMoreYouKnow = "";
          console.log("added a question");
          this.$v.question.$reset()
      }
    },
    addAnswer() {
      this.formTouched.formAnswer = !this.$v.question.formAnswer.$anyDirty;
      this.errors.formAnswer = this.$v.question.formAnswer.$anyError;
      if (this.errors.formAnswer === false && this.formTouched.formAnswer === false) {
        this.question.answers.push({
          text: this.question.formAnswer.text,
          isRight: this.question.formAnswer.isRight
        });
        this.question.formAnswer.text = "";
        this.question.formAnswer.isRight = false;
        console.log("added an answer");
      }
    },
    removeAnswer(i) {
      console.log("removed question", i);
    },
  }
};
</script>

<style lang="postcss" scoped>
.error {
  @apply text-red text-sm italic;
}
</style>