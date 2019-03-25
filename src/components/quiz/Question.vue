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
                console.log("Your answer was right.")
                this.$emit('correctAnswer')
            } else {
                console.log("Your answer was incorrect.")
                this.$emit('wrongAnswer')
            }
            console.log("handled an answer")
        }
    }
}
</script>