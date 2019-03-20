import axios from 'axios'

const state = {
    token: null,
    user: null,
}

const getters = {

}

const mutations = {
    authUser: (state, { user, token }) => {
        state.token = token
        state.user = user
      },
}

const actions = {
    register: async ({ commit }, formData) => {
        const { data } = await axios.post('http://localhost:3000/api/users', formData)
        console.log(data)
        commit('authUser', data)
      },
    login: async ({ commit }, authData) => {
    const { data } = await axios.post('http://localhost:3000/api/auth/login', authData)
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