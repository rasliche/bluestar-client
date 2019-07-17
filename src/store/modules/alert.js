const state = {
    alert: {
        text: '',
        type: null
    }
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
        state.alert.type = null
        state.alert.text = ''
    },
    setAlertState: (state, { type, text }) => {
        state.alert.type = type
        state.alert.text = text
      },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}