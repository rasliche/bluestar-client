<template>
  <div class="quiz h-auto">
    <div v-if="status === 'intro'" key="intro" class="text-center mx-auto">
      <!-- <p>{{ quiz.description }}</p> -->
      <ButtonPrimary @click="startQuiz">
        Start Quiz
      </ButtonPrimary>
    </div>

    <div
      v-if="status === 'questions'" key="questions"
      class="text-center mx-auto"
    >
      <!-- <div v-for="(question, index) in questions" :key="index"> -->
      <Question
        :key="questionIndex"
        :show-review-text="showReviewText"
        :question="questions[questionIndex]"
        :answers="questions[questionIndex].answers"
        @correctAnswer="correctAnswer"
        @wrongAnswer="wrongAnswer"
      >
        <template
          v-slot="{
            question,
            answers,
            handleAnswer,
            showReviewText,
            isRight
          }"
        >
          <div class="question">
            <p class="font-bold">{{ question.text }}</p>
              <div
                v-if="showReviewText"
                key="feedback"
                :class="[
                  isRight ? 'bg-green-lightest' : 'bg-red-lightest',
                  'text-center text-sm h-16 p-2 m-2 rounded'
                ]"
              >
                <strong>{{ isRight ? 'Nice!' : 'Sorry!' }}</strong>
                <p>{{ question.reviewText }}</p>
              </div>
              <div
                v-else
                key="answers"
                class="answer-choices w-full mt-4 flex flex-wrap justify-center"
              >
              <ButtonBase
                v-for="(answer, index) in answers"
                :key="index"
                class="p-2 m-2 border rounded border-blue-darker"
                @click="handleAnswer(index)"
              >
                {{ answer.text }}
              </ButtonBase>
            </div>
            <div v-if="showReviewText">
              <ButtonInfo class="border rounded p-2 m-2" @click="nextQuestion">
                Next ->
              </ButtonInfo>
            </div>
          </div>
        </template>
      </Question>
    </div>

    <div v-if="status === 'results'" key="results" class="text-center mx-auto">
      <p>
        You finished the quiz. Your score was:
        <span class="text-3xl">{{ correct }}</span>
      </p>
      <div v-if="passingScore">
        <p>
          Nice Job. You can move on to the next lesson or retake the quiz for a
          better score.
        </p>
        <!-- <router-link tag="button" to="/training" class="border border-green bg-green-light p-2 m-2 rounded">Training Home</router-link> -->
        <ButtonPrimary
          :disabled="status === 'pending'"
          @click="submitScoreAndContinue"
        >
          Submit Score and Continue
        </ButtonPrimary>
      </div>
      <div v-else class="flex flex-wrap">
        <p class="w-full mt-4">Sorry, but you did not achieve a passing score this time.</p>
        <div class="w-full mt-4 flex justify-around">
          <ButtonSecondary @click="startQuiz">
            Retake the quiz.
          </ButtonSecondary>
          <ButtonSecondary @click="quitQuiz">
            Review the content.
          </ButtonSecondary>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Question from './Question.vue'
import ButtonPrimary from '@/components/BaseUI/ButtonPrimary'
import ButtonBase from '@/components/BaseUI/ButtonBase'
import ButtonInfo from '@/components/BaseUI/ButtonInfo'
import ButtonSecondary from '@/components/BaseUI/ButtonSecondary'
import ButtonDanger from '@/components/BaseUI/ButtonDanger'
// import Modal from "../Modal.vue"

export default {
  name: 'Quiz',
  components: {
    Question,
    ButtonPrimary,
    ButtonSecondary,
    ButtonDanger,
    ButtonBase,
    ButtonInfo,
    // Modal
  },
  props: {
    questions: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      // quizModalOpen: false,
      status: 'intro', // 'questions', 'results', 'pending', 'success', 'failure'
      questionIndex: 0,
      correct: 0,
      showReviewText: false
    }
  },
  computed: {
    passingScore: function() {
      return (this.correct / this.questions.length) * 100 >= 90 ? true : false
    }
  },
  methods: {
    startQuiz() {
      // this.quizModalOpen = true;
      this.status = 'questions'
      this.questionIndex = 0
      this.correct = 0
      this.showReviewText = false
    },
    nextQuestion() {
      if (this.questionIndex < this.questions.length - 1) {
        this.questionIndex += 1
        this.showReviewText = false
      } else {
        this.status = 'results'
      }
    },
    correctAnswer() {
      this.correct += 1
      this.showReviewText = true
    },
    wrongAnswer() {
      this.showReviewText = true
    },
    submitScoreAndContinue() {
      const score = (this.correct / this.questions.length) * 100
      this.status = 'intro'
      this.$emit('quiz-finished', score)
    },
    quitQuiz() {
      this.status = 'intro'
      this.questionIndex = 0
      this.correct = 0
      this.showReviewText = false
      this.$emit('close')
    }
  }
}
</script>
