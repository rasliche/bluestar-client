import Vue from "vue";
import Vuex from "vuex";
import axios from '@/services/axios-api'

import user from '@/store/user.module'
import quiz from '@/store/quiz.module'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {

  },

  modules: {
    user,
    quiz
  },

  getters: {
    
  },

  mutations: {
    
  },

  actions: {
    
  }
});
