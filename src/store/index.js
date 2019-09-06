import Vue from "vue";
import Vuex from "vuex";

import auth from './modules/auth'
import user from './modules/user'
import alert from './modules/alert'

import Api from "../services/Api";
import router from "../router";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    auth,
    user,
    alert,
  },
  // state: {
    
  // },
  // getters: {
    
  // },
  // mutations: {
    
  // },
  // actions: {    

  //   },
  });
  