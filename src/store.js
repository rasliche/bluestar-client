import Vue from "vue";
import Vuex from "vuex";

import user from '@/store/user.module'
import quiz from '@/store/quiz.module'
import alert from '@/store/alert.module'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    quiz,
    alert,
  },
});
