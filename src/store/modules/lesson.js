import Api from '@/services/Api'

export const namespace = true

export const state = {
    lesson: {}, // currently viewed lesson
    lessons: [], // all lessons that have been fetched
}

export const mutations = {
    

}

export const actions = {
    getLesson: lessonId => {
        return Api.get(`/lesson/${lessonId}`)
    }

}

export const getters = {

}