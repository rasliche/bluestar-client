import LessonService from '@/services/LessonService'

export const namespaced = true

export const state = {
    lesson: {}, // currently viewed lesson
    lessons: [], // all lessons that have been fetched
}

export const mutations = {
    SET_LESSON: ({ state }, lesson) => {
        state.lesson = lesson
    },
    ADD_LESSON: (state, lesson) => {
        state.lessons.push(lesson)
    },
    ADD_LESSONS: (state, lessons) => {
        state.lessons = [...lessons]
    }

}

export const actions = {
    getLesson: async ({ state, commit }, lessonId) => {
        let lesson = state.lessons.find(lesson => lesson._id === lessonId)
        if (lesson) {
            commit('SET_LESSON', lesson)
            return
        }
        try {
            const { data: lesson } = await LessonService.getLesson(lessonId)
            commit('ADD_LESSON', lesson)
            commit('SET_LESSON', lesson)
        } catch(e) {
            console.log(e)
        }
    },
    getLessons: ({ commit }) => {
        return LessonService.getLessons().then(response => {
            commit('ADD_LESSONS', response.data)
        })
    }
}

export const getters = {
    publishedLessons: state => {
        return state.lessons.filter(lesson => lesson.published)
    }
}