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
  state: {
    
  },
  getters: {
    
  },
  mutations: {
    // users
    recordScore: (state, record) => {
      // do logic to update a score if needed
      if (!state.lessonScores) {
        state.lessonScores = [record];
      } else {
        state.lessonScores.push(record);
      }
    },
    
  },
  actions: {    
    // users
    submitLessonScore: async ({ commit, state }, record) => {
      // Check if it is a new score for user
      console.log("New Record: ", record);
      let previousLessonRecord;
      if (state.lessonScores) {
        previousLessonRecord = state.lessonScores.find(
          r => r.lessonSlug === record.lessonSlug
          );
        }
        console.log("Previous Lesson: ", previousLessonRecord);
      if (!previousLessonRecord || previousLessonRecord.score < record.score) {
        // asynchronously add score to user profile in database
        const { data } = await Api.put(
          `/users/${state.userId}/records`,
          {
            record: record
          },
          {
            headers: {
              Authorization: `Bearer: ${state.token}`
            }
          }
          );
          console.log("New lesson score added.");
          commit("setUser", data);
          router.push("/training");
        } else {
          // do logic to update a score if previous score was worse
          // Should have Flash Message showing that nothing was added
          console.log("No new lesson score added.");
          router.push("/me");
        }
      }
    },
  });
  