const state = {
    text: '',
    type: null
}

const getters = {

}

const actions = {
    // Alert Stuff
    setAlert: ({ commit }, payload) => {
        commit('setAlertState', {
            type: payload.type,
            text: payload.text,
        })
        setTimeout(() => {
            commit('clearAlertState')
        }, 5000)
    },
    clearAlert: ({ commit }) => {
        commit('clearAlertState')
    },
}

const mutations = {
    clearAlertState: (state) => {
        state.type = null
        state.text = ''
    },
    setAlertState: (state, { type, text }) => {
        state.type = type
        state.text = text
      },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}