<template>
  <div class="quiz h-auto">
    <h3 class="text-center mx-auto">Take a quiz to pass this lesson: {{ quiz.title }}</h3>
    <transition name="fade" mode="out-in">
      <div v-if="introStage" key="intro" class="text-center mx-auto">
        <p>{{ quiz.description }}</p>
        <button @click="startQuiz" class="border border-green bg-green-light p-2 m-2 rounded">Start Quiz</button>
      </div>

      <div v-if="questionStage" key="questions" class="text-center mx-auto">
        <!-- <div v-for="question in quiz.questions"> -->
          <transition name="fade" mode="out-in">
            <Question
              :key="questionIndex"
              :showReviewText="showReviewText"
              :question="quiz.questions[questionIndex].text" 
              :reviewText="quiz.questions[questionIndex].theMoreYouKnow" 
              :answers="quiz.questions[questionIndex].answers" 
              v-on:correctAnswer="correctAnswer" 
              v-on:wrongAnswer="wrongAnswer">

              <template v-slot="{ question, answers, handleAnswer, showReviewText, reviewText, isRight }">
                <div class="question">
                  <div v-if="showReviewText" :class="[ isRight ? 'bg-green-lightest' : 'bg-red-lightest', 'text-center', 'text-sm', 'h-16' ]">
                    <strong>{{ isRight ? 'Nice!' : 'Sorry!' }}</strong>
                    {{ reviewText }}
                  </div>
                  <p class="font-bold">{{ question }}</p>
                  <div class="answer-choices flex flex-wrap justify-center">
                    <button v-for="(answer, index) in answers" :key="index" @click="handleAnswer(index)" class="p-2 m-2 border rounded border-blue-darker">
                      {{ answer.text }}
                    </button>
                  </div>
                  <div v-if="showReviewText">
                    <button @click="nextQuestion" class="border rounded p-2 m-2">Next -></button>
                  </div>
                </div>
              </template>
              
            </Question>
          </transition>
        <!-- </div> -->
      </div>

    
      <div v-if="resultStage" key="results" class="text-center mx-auto">
        <h3>You finished the quiz</h3>
        <p>Your score was: {{ correct }}</p>
        <div v-if="passingScore">
          <p>Nice Job. You can move on to the next lesson or retake the quiz for a better score.</p>
          <button @click="submitScoreAndContinue" class="border border-green bg-green-light p-2 m-2 rounded">Next Lesson</button>
        </div>
        <div v-else>
          <p>Sorry, but you did not achieve a passing score this time.</p>
        </div>
        <button @click="startQuiz" class="border border-yellow bg-yellow-light p-2 m-2 rounded">Retake the quiz.</button>
      </div>
    </transition>
  </div>
</template>

<script>
import Question from './Question.vue'

export default {
  name: "quiz",
  components: {
    Question
  },
  props: ['quiz'],
  data() {
    return {
      introStage: true,
      questionStage: false,
      resultStage: false,
      questionIndex: 0,
      correct: 0,
      showReviewText: false,
    }
  },
  computed: {
    passingScore: function() {
      return (this.correct > (this.quiz.questions.length * 0.5)) ? true : false
    }
  },
  methods: {
    startQuiz: function() {
      this.correct = 0
      this.questionIndex = 0
      this.introStage = false
      this.questionStage = true
      this.resultStage = false
      this.showReviewText = false
    },
    nextQuestion: function() {
      if (this.questionIndex < this.quiz.questions.length-1) {
        this.questionIndex +=1
        this.showReviewText = false
      } else {
        this.questionStage = false
        this.resultStage = true
      }
    },
    correctAnswer: function() {
      this.correct +=1
      this.showReviewText = true;
    },
    wrongAnswer: function() {
      this.showReviewText = true;
    },
    submitScoreAndContinue: function() {
      this.$router.push('/training')
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.disabled {
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
