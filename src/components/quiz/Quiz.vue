<template>
  <div class="quiz h-auto">
    <!-- <h3 class="text-center mx-auto mb-2">
      Take a quiz to pass this lesson: {{ quiz.title }}
    </h3> -->
    <transition name="fade" mode="out-in" appear>
      <div v-if="stage === 'intro'" key="intro" class="text-center mx-auto">
        <!-- <p>{{ quiz.description }}</p> -->
        <button
          @click="startQuiz"
          class="border border-green bg-green-light p-2 m-2 rounded"
        >
          Start Quiz
        </button>
      </div>

      <div v-if="stage === 'questions'" key="questions" class="text-center mx-auto">
        <!-- <div v-for="(question, index) in questions" :key="index"> -->
        <transition name="fade" mode="out-in">
          <Question
            :key="questionIndex"
            :showReviewText="showReviewText"
            :question="questions[questionIndex].text"
            :reviewText="questions[questionIndex].theMoreYouKnow"
            :answers="questions[questionIndex].answers"
            v-on:correctAnswer="correctAnswer"
            v-on:wrongAnswer="wrongAnswer">
            <template
              v-slot="{
                question,
                answers,
                handleAnswer,
                showReviewText,
                reviewText,
                isRight
              }">
              <div class="question">
                <p class="font-bold">{{ question }}</p>
                <transition name="fade" mode="out-in">
                  <div
                    v-if="showReviewText"
                    :class="[
                      isRight ? 'bg-green-lightest' : 'bg-red-lightest',
                      'text-center text-sm h-16 p-2 m-2 rounded'
                    ]"
                    key="feedback"
                  >
                    <strong>{{ isRight ? "Nice!" : "Sorry!" }}</strong>
                    <p>{{ reviewText }}</p>
                  </div>
                  <div
                    v-if="!showReviewText"
                    class="answer-choices flex flex-wrap justify-center"
                    key="answers"
                  >
                    <button
                      v-for="(answer, index) in answers"
                      :key="index"
                      @click="handleAnswer(index)"
                      class="p-2 m-2 border rounded border-blue-darker"
                    >
                      {{ answer.text }}
                    </button>
                  </div>
                </transition>
                <div v-if="showReviewText">
                  <button @click="nextQuestion" class="border rounded p-2 m-2">
                    Next ->
                  </button>
                </div>
              </div>
            </template>
          </Question>
        </transition>
        <!-- </div> -->
      </div>

      <div v-if="stage === 'results'" key="results" class="text-center mx-auto">
        <p>
          You finished the quiz. Your score was:
          <span class="text-3xl">{{ correct }}</span>
        </p>
        <div v-if="passingScore">
          <p>
            Nice Job. You can move on to the next lesson or retake the quiz for
            a better score.
          </p>
          <!-- <router-link tag="button" to="/training" class="border border-green bg-green-light p-2 m-2 rounded">Training Home</router-link> -->
          <button
            @click="submitScoreAndContinue"
            class="border border-green bg-green-light p-2 m-2 rounded">
            Submit Score and Continue
          </button>
        </div>
        <div v-else>
          <p>Sorry, but you did not achieve a passing score this time.</p>
        </div>
        <button
          @click="startQuiz"
          class="border border-yellow bg-yellow-light p-2 m-2 rounded">
          Retake the quiz.
        </button>
        <button
          @click="quitQuiz"
          class="border border-yellow bg-yellow-light p-2 m-2 rounded">
          Review the content.
        </button>
      </div>
    </transition>
  </div>
</template>

<script>
import Question from "./Question.vue"
// import Modal from "../Modal.vue"

export default {
  name: "quiz",
  components: {
    Question,
    // Modal
  },
  props: ["questions"],
  data() {
    return {
      // quizModalOpen: false,
      stage: 'intro', // 'questions', 'results'
      questionIndex: 0,
      correct: 0,
      showReviewText: false
    };
  },
  computed: {
    passingScore: function() {
      return (this.correct / this.questions.length) * 100 >= 90
        ? true
        : false;
    }
  },
  methods: {
    startQuiz() {
      // this.quizModalOpen = true;
      this.stage = 'questions'
      this.questionIndex = 0;
      this.correct = 0;
      this.showReviewText = false;
    },
    nextQuestion() {
      if (this.questionIndex < this.questions.length - 1) {
        this.questionIndex += 1;
        this.showReviewText = false;
      } else {
        this.stage = 'results'
      }
    },
    correctAnswer() {
      this.correct += 1;
      this.showReviewText = true;
    },
    wrongAnswer() {
      this.showReviewText = true;
    },
    submitScoreAndContinue() {
      const score = (this.correct / this.questions.length) * 100;
      this.$emit('quiz-finished', score)
      console.log('end of score submit')
    },
    quitQuiz() {
      this.stage = 'intro'
      this.questionIndex = 0;
      this.correct = 0;
      this.showReviewText = false;
      this.$emit('close');
    }
  }
};
</script>