import ProgramService from '@/services/ProgramService'

export const namespaced = true

export const state = {
    programs: []
}

export const mutations = {
    ADD_PROGRAM: (state, program ) => {
        state.programs.push(program)
    },
    ADD_PROGRAMS: (state, programs ) => {
        state.programs = [...programs]
    },
}

export const actions = {
    getPrograms: ({ commit }) => {
        return ProgramService.getPrograms().then(response => {
            commit('ADD_PROGRAMS', response.data)
        })
    }
}