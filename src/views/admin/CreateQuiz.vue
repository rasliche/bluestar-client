<template>
    <div class="border-2 rounded w-1/2 mx-auto">
        <h1 class="text-center">Create Quiz</h1>
        <form>
            <div>
                <label for="title" class="text-blue-darker pr-2">Title</label>
                <input type="text" name="title" id="title" v-model="quiz.title" class="border-blue-lighter border-b-2 pl-2">
            </div>
            <div>
                <label for="description" class="text-blue-darker pr-2">Description</label>
                <input type="text" name="description" id="description" v-model="quiz.description" class="pl-2 border-b-2 border-blue-lighter">
            </div>
            <div>
                <label for="passingScorePercent" class="text-blue-darker pr-2">Required %</label>
                <input type="number" min=0 max=100 name="passingScorePercent" id="passingScorePercent" v-model="quiz.passingScorePercent" class="pl-2 border-b-2 border-blue-lighter">
            </div>
            <div>
                <h3>Questions</h3>
                <div v-for="(question, index) in quiz.questions" :key="index">
                    <p>{{ question.text }}</p>
                    <p :class="{'bg-green-lightest': answer.isRight }" v-for="(answer, index) in question.answers" :key="index">
                        {{ answer.isRight ? 'x' : '' }} {{ answer.text }}
                    </p>
                </div>
                <div>
                    <div>
                        <label for="text">Text</label>
                        <input type="text" class="border-blue-lighter border-b-2 pl-2" v-model="question.text">
                    </div>
                    <div v-for="(answer, index) in question.answers" :key="index">
                        <p :class="{'bg-green-lightest': answer.isRight }">
                            {{ answer.isRight ? 'V' : '' }} {{ answer.text }}
                        </p>
                    </div>
                    <div>
                        <label for="answer">Answer</label>
                        <input type="text" class="border-blue-lighter border-b-2 pl-2" v-model="answer.text">
                        <input type="checkbox" value="isRight" v-model="answer.isRight">Correct?
                    </div>
                    <div>
                        <label for="text">The More You Know 🌈</label>
                        <input type="text" class="border-blue-lighter border-b-2 pl-2" v-model="question.theMoreYouKnow">
                    </div>

                </div>
                <button @click.prevent="addAnswer" class="border-2 rounded border-blue">Add Answer</button>
                <button @click.prevent="addQuestion" :disabled="question.answers.length < 2" class="border-2 rounded border-blue">Add Question</button>
            </div>

            <button @click.prevent="submitQuiz" class="border-2 rounded border-blue">Create</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            quiz: {
                title: '',
                description: '',
                passingScorePercent: 100,
                questions: [],
                lessonId: 0,
            },
            question: {
                text: '',
                answers: [],
                theMoreYouKnow: ''
            },
            answer: {
                text: '',
                isRight: false
            }
        }
    },
    methods: {
        addQuestion() {
            if (this.question.answers.length >= 2) {
                this.quiz.questions.push({
                    text: this.question.text,
                    answers: this.question.answers,
                    theMoreYouKnow: this.question.theMoreYouKnow
                    })
                this.question.text = ''
                this.question.answers = []
                this.question.theMoreYouKnow = ''
            }
            console.log('added a question')
        },
        removeQuestion(i) {
            console.log('removed question', i)
        },
        addAnswer() {
            this.question.answers.push({
                text: this.answer.text,
                isRight: this.answer.isRight,
                })
            this.answer.text = ''
            this.answer.isRight = false
            console.log('added an answer')
        },
        removeAnswer(i) {
            console.log('removed question', i)
        },
        submitQuiz() {
            console.log(this.quiz)
        }
    }
}
</script>
