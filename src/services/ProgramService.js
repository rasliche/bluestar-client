import Api from './Api'

export default {
    postProgram(program) {
        
    },
    getPrograms() {
        return Api.get(`/programs`)
    },
    getProgram(programId) {
        return Api.get(`/programs/${programId}`)
    },
}