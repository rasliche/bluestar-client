import Api from './Api'

export default {
    postLesson(lesson) {
        return Api.post('/lessons')
    },
    getLessons() {
        return Api.get('/lessons')
    },
    getLesson(lessonId) {
        return Api.get(`/lessons/${lessonId}`)
    }
}