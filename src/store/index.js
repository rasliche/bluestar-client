import Vue from "vue";
import Vuex from "vuex";

import auth from './modules/auth'
import user from './modules/user'
import alert from './modules/alert'
import operator from './modules/operator'

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    auth,
    user,
    alert,
    operator
  },
  state: {
    
  },
  getters: {
    
  },
  mutations: {
    
  },
  actions: {
    
  },
})
  