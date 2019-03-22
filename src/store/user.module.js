import Api from '../services/axios-api'

const state = {
    token: null,
    user: null,
}

const getters = {
    isAuthenticated: state => state.token !== null,
    isAdmin: state => {
        if (state.user && state.user.isAdmin) {
            return true
}
    }
}

const mutations = {
    authUser: (state, userData) => {
        console.log(userData)
        const { user, token } = userData
        state.token = token
        state.user = user
        Api.defaults.headers.common['Authorization'] = `Bearer: ${state.token}`
      },
    clearAuth: (state) => {
        state.token = null
        state.user = null
}
}

const actions = {
    register: async ({ commit }, formData) => {
        const { data } = await Api.post('http://localhost:3000/api/users', formData)
        console.log(data)
        commit('authUser', data)
      },
    login: async ({ commit }, authData) => {
    const { data } = await Api.post('http://localhost:3000/api/auth/login', authData)
    console.log(data)
    commit('authUser', data)
    },  
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}