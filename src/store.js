import Vue from "vue";
import Vuex from "vuex";

import Api from './services/Api'
import router from './router'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
    user: null,
    operators: [],
  },
  getters: {
    user: state => state.user,
    userQuizzes: state => state.user.quizzes,
    isAuthenticated: state => state.token !== null,
    isAdmin: state => {
      if (state.user && state.user.isAdmin) {
        return true
      }
    },
    operators: state => state.operators
  },
  mutations: {
    authUser: (state, userData) => {
      const { user, token } = userData
      state.token = token
      state.user = user
    },
    clearAuth: (state) => {
      state.token = null
      state.user = null
    },
    //operators
    setOperators: (state, operators) => {
      state.operators = operators
    },
    addOperator: (state, newOperator) => {
      state.operators.push(newOperator)
    },
    // users
    recordScore: (state, record) => {
      // do logic to update a score if needed
      state.user.quizScores.push(record)
    }
  },
  actions: {
    setLogoutTimer: ({ commit }, expirationTime) => {
      setTimeout(() => {
        commit('clearAuth')
      }, expirationTime * 1000)
    },
    register: async ({ commit, dispatch }, formData) => {
      try {
        const { data } = await Api.post('/users', formData)
        if (!data.user) {
          console.log(data)
          console.log("error'd out")
          return
        }
        commit('authUser', data)
        const now = new Date()
        const expirationDate = new Date(now.getTime() + 7200000)
        localStorage.setItem('bs-auth-time', expirationDate)
        localStorage.setItem('bs-auth-token', data.token)
        dispatch('setLogoutTimer', 7200)
        router.push('/')
      } catch (err) {
        console.log(err)
      }
    },
    login: async ({ commit, dispatch }, authData) => {
      try {
        const { data } = await Api.post('/auth/login', authData)
        if (!data.user) {
            console.log(data)
            console.log("error'd out")
            return
        }
        console.log(data)
        commit('authUser', data)
        const now = new Date()
        const expirationDate = new Date(now.getTime() + 7200000)
        localStorage.setItem('bs-auth-time', expirationDate)
        localStorage.setItem('bs-auth-token', data.token)
        dispatch('setLogoutTimer', 7200)
        router.push('/')
      } catch (err) {
        console.log(err)
      }
    },
    tryAutoLogin: async ({ commit }) => {
      const token = localStorage.getItem('bs-auth-token')
      if (!token) { return }
      const expirationDate = localStorage.getItem('bs-auth-time')
      const now = new Date()
      if (now >= expirationDate) { return }
      const { data } = await Api.get('/users/me', {
        headers: {
          Authorization: `Bearer: ${token}`
        }
      })
      data.token = token
      commit('authUser', data)
    },
    logout: ({ commit }) => {
      localStorage.removeItem('bs-auth-token')
      localStorage.removeItem('bs-auth-time')
      commit('clearAuth')
      router.replace('/login')
    },
    // shops
    fetchOperators: async ({ commit, state }) => {
      const { data } = await Api.get('/operators', {
        headers: {
          Authorization: `Bearer: ${state.token}`
        }
      })
      commit('setOperators', data)
    },
    addOperator: async ({ commit, state }, newOperator) => {
      const { data } = await Api.post('/operators', newOperator, {
        headers: {
          Authorization: `Bearer: ${state.token}`
        }
      })
      commit('addOperator', data)
    },
    // users
    submitQuizScore: async ({ commit, state }, record) => {
      // asynchronously add score to user profile in database
      // do logic to update a score if previous score was worse
      commit('recordScore', record)
      router.push('/training')
    }
  }
});
