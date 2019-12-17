<script>
export default {
  name: "question",
  props: {
    question: {
      type: String,
      required: true,
    }, 
    answers: {
      text: {
        type: String,
        required: true
      },
      isRight: {
        type: Boolean,
        required: true
      },
      type: Array,
      required: true,
    }, 
    reviewText: {
      type: String
    }, 
    showReviewText: {
      type: Boolean
    },
  },
  data() {
    return {
      isRight: false
    };
  },
  render() {
    return this.$scopedSlots.default({
      question: this.question,
      answers: this.answers,
      reviewText: this.reviewText,
      showReviewText: this.showReviewText,
      handleAnswer: this.handleAnswer,
      isRight: this.isRight,
    });
  },
  methods: {
    handleAnswer(i) {
      if (this.answers[i].isRight) {
        this.isRight = true;
        this.$emit("correctAnswer");
      } else {
        this.isRight = false;
        this.$emit("wrongAnswer");
      }
    }
  }
};
</script>
