import Vue from "vue";
import Vuex from "vuex";

import Api from './services/Api'
import router from './router'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
    userId: null,
    name: '',
    email: '',
    operators: [],
    lessonScores: [],
    isAdmin: false,
  },
  getters: {
    isAuthenticated: state => state.token !== null,
    isAdmin: state => {
      if (state.user && state.user.isAdmin) {
        return true
      }
    },
    token: state => state.token
  },
  mutations: {
    authUser: (state, userData) => {
      const { token, user } = userData
      state.userId = user._id
      state.token = token
      state.name = user.name
      state.email = user.email
      state.operators = user.operators
      state.lessonScores = user.lessonScores
      state.isAdmin = user.isAdmin
    },
    setUser: (state, user) => {
      state.userId = user._id
      state.name = user.name
      state.email = user.email
      state.operators = user.operators
      state.lessonScores = user.lessonScores
      state.isAdmin = user.isAdmin
    },
    clearAuth: (state) => {
      state.token = null
      state.user = null
    },
    // users
    recordScore: (state, record) => {
      // do logic to update a score if needed
      if (!state.lessonScores) {
        state.lessonScores = [record]
      }
      else {
        state.lessonScores.push(record)
      }
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
      const expirationDate = new Date(localStorage.getItem('bs-auth-time'))
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

    // users
    submitLessonScore: async ({ commit, state }, record) => {
      // asynchronously add score to user profile in database
      const { data } = await Api.put(`/users/${state.userId}`,
      {
        record: record
      },
      {
        headers: {
          Authorization: `Bearer: ${state.token}`
        }
      })
      // do logic to update a score if previous score was worse
      commit('setUser', data)
      router.push('/training')
    }
  }
});
