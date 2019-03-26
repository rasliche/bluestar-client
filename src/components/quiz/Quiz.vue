<template>
  <div class="quiz">
    <h3>Take a quiz to pass this lesson: {{ quiz.title }}</h3>
    <transition name="fade" mode="out-in">
      <div v-if="introStage" key="intro">
        <p>{{ quiz.description }}</p>
        <button @click="startQuiz">Start Quiz</button>
      </div>

      <div v-if="questionStage" key="questions">
        <!-- <div v-for="question in quiz.questions"> -->
          <transition name="fade" mode="out-in">
            <Question
              :key="questionIndex"
              :question="quiz.questions[questionIndex].text" 
              :answers="quiz.questions[questionIndex].answers" 
              v-on:correctAnswer="correctAnswer" 
              v-on:wrongAnswer="wrongAnswer">
              <div>Response Div once answers. $emit isRight back up to quiz from question component?</div>
              <div slot-scope="{ question, answers, handleAnswer }" class="question">
                <p class="font-bold">{{ question }}</p>
                <div class="answer-choices" v-for="(answer, index) in answers" :key="index">
                  <button @click="handleAnswer(index)">{{ answer.text }}</button>
                </div>
              </div>
            </Question>
          </transition>
        <!-- </div> -->
      </div>

    
      <div v-if="resultStage" key="results">
        <h3>You finished the quiz</h3>
        <p>Your score was: {{ correct }}</p>
        <div v-if="passingScore">
          <p>Nice Job. You can move on to the next lesson or retake the quiz for a better score.</p>
          <button @click="submitScoreAndContinue">Next Lesson</button>
          <button @click="startQuiz">Retake the quiz.</button>
        </div>
        <div v-else>
          <p>Sorry, but you did not achieve a passing score this time.</p>
          <button @click="startQuiz">Retake the quiz.</button>
        </div>
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
      correct: 0
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
    },
    correctAnswer: function() {
      this.correct +=1
      if (this.questionIndex < this.quiz.questions.length-1) {
        this.questionIndex +=1
      } else {
        this.questionStage = false
        this.resultStage = true
      }
    },
    wrongAnswer: function() {
      if (this.questionIndex < this.quiz.questions.length-1) {
        this.questionIndex +=1
      } else {
        this.questionStage = false
        this.resultStage = true
      }
    },
    submitScoreAndContinue: function() {
      this.$router.push('/training')
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
