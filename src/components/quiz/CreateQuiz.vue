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
          for="title" 
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
      
      <section>
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
      <div>
        <h3>Questions</h3>
        <div v-for="(question, index) in quiz.questions" :key="index">
          <p>{{ question.text }}</p>
          <p
            :class="{ 'bg-green-lightest': answer.isRight }"
            v-for="(answer, index) in question.answers"
            :key="index"
          >
            {{ answer.isRight ? "✅" : "❌" }} {{ answer.text }}
          </p>
        </div>
        <div>
          <div>
            <label for="text">Text</label>
            <input
              type="text"
              class="border-blue-lighter border-b-2 pl-2"
              v-model="question.text"
            />
          </div>
          <div v-for="(answer, index) in question.answers" :key="index">
            <p :class="{ 'bg-green-lightest': answer.isRight }">
              {{ answer.isRight ? "✅" : "❌" }} {{ answer.text }}
            </p>
          </div>
          <div>
            <label for="answer">Answer</label>
            <input
              type="text"
              class="border-blue-lighter border-b-2 pl-2"
              v-model="answer.text"
            />
            <input
              type="checkbox"
              value="isRight"
              v-model="answer.isRight"
            />Correct?
          </div>
          <div>
            <label for="text">The More You Know 🌈</label>
            <input
              type="text"
              class="border-blue-lighter border-b-2 pl-2"
              v-model="question.theMoreYouKnow"
            />
          </div>
        </div>
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
      </div>

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
