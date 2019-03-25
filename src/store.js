import Vue from "vue";
import Vuex from "vuex";

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
