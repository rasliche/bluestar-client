<script>
export default {
    name: "question",
    props: ['question', 'answers', 'reviewText', 'showReviewText'],
    data() {
        return {
            isRight: false
        }
    },
    render() {
        return this.$scopedSlots.default({
            question: this.question,
            answers: this.answers,
            reviewText: this.reviewText,
            showReviewText: this.showReviewText,
            handleAnswer: this.handleAnswer,
            isRight: this.isRight,
        })
    },
    methods: {
        handleAnswer(i) {
            if (this.answers[i].isRight) {
                this.isRight = true
                this.$emit('correctAnswer')
            } else {
                this.isRight = false
                this.$emit('wrongAnswer')
            }
        }
    }
}
</script>