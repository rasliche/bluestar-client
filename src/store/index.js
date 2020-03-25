import Vue from 'vue'
import Vuex from 'vuex'

import * as auth from './modules/auth'
import * as lesson from './modules/lesson'
import * as notification from './modules/notification'
import * as operator from './modules/operator'
import * as program from './modules/program'
import * as user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    auth,
    lesson,
    notification,
    operator,
    program,
    user,
  },
  state: {},
  getters: {},
  mutations: {},
  actions: {}
})
