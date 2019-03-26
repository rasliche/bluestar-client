<script>
export default {
    name: "question",
    props: ['question', 'answers'],
    render() {
        return this.$scopedSlots.default({
            question: this.question,
            answers: this.answers,
            handleAnswer: this.handleAnswer
        })
    },
    methods: {
        handleAnswer(i) {
            if (this.answers[i].isRight) {
                this.$emit('correctAnswer')
            } else {
                this.$emit('wrongAnswer')
            }
        }
    }
}
</script>