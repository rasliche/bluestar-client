const state = {
  alert: {
    text: '',
    type: null
  },
  timer: null
}

const getters = {}

const actions = {
  // Alert Stuff
  setAlert: ({ commit }, payload) => {
    const timer = setTimeout(() => {
      commit('clearAlertState')
    }, 7000)

    commit('setAlertState', {
      type: payload.type,
      text: payload.text
    })
    commit('setTimerState', timer)
  },
  clearAlert: ({ commit }) => {
    commit('clearAlertState')
  }
}

const mutations = {
  setAlertState: (state, { type, text }) => {
    state.alert.type = type
    state.alert.text = text
  },
  setTimerState: (state, timer) => {
    clearTimeout(state.timer)
    state.timer = timer
  },
  clearAlertState: (state) => {
    state.alert.type = null
    state.alert.text = ''
    clearTimeout(state.timer)
    state.timer = null
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
