const state = {
    quizzes: [
        { 
            title: 'a quiz title',
            description: 'a quiz description',
            questions: [
                {
                    title: 'question text',
                    answers: [
                        { text: 'possible answer A', isRight: true },
                        { text: 'possible answer B', isRight: false },
                        { text: 'possible answer C', isRight: false },
                        { text: 'possible answer D', isRight: false },
                    ]
                }
            ]
        }
    ]
}

const getters = {

}

const mutations = {
    
}

const actions = {

}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}