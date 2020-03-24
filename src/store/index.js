import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import * as user from './modules/user'
import * as notification from './modules/notification'
import * as operator from './modules/operator'
import * as program from './modules/program'
import * as lesson from './modules/lesson'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    auth,
    user,
    notification,
    operator,
    program,
    lesson
  },
  state: {},
  getters: {},
  mutations: {},
  actions: {}
})
