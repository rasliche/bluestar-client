import Api from "@/services/Api";
import router from "@/router";

const state = {
    userId: null,
    name: null,
    email: null,
    operators: [],
    lessonScores: [],
    isAdmin: false
}

const getters = {
    userId: state => state.userId,
    name: state => state.name,
    email: state => state.email,
    operators: state => state.operators,
    lessonScores: state => state.lessonScores,
    isAdmin: state => state.isAdmin,
}

const mutations = {
    setUser: (state, user) => {
        state.userId = user._id;
        state.name = user.name;
        state.email = user.email;
        state.operators = user.operators;
        state.lessonScores = user.lessonScores;
        state.isAdmin = user.isAdmin;
      },
      clearUser: (state) => {
        state.userId = null;
        state.name = "";
        state.email = "";
        state.operators = [];
        state.lessonScores = [];
        state.isAdmin = false;
      },
}

const actions = {
    setCurrentUser: ({ commit }, user) => {
        commit('setUser', user)
    },
    clearCurrentUser: ({ commit }) => {
        commit('clearUser')
    },
    // users
    submitLessonScore: async ({ dispatch, commit, getters, rootGetters }, record) => {
        // Check if it is a new score for user
        console.log("New Record: ", record);
        let previousLessonRecord;
        if (getters['user/lessonScores']) {
          previousLessonRecord = getters['user/lessonScores'].find(
            r => r.lessonSlug === record.lessonSlug
            );
          }
          console.log("Previous Lesson: ", previousLessonRecord);
        if (!previousLessonRecord || previousLessonRecord.score < record.score) {
          // asynchronously add score to user profile in database
          const { data } = await Api.put(
            `/users/${rootGetters['user/userId']}/records`, record, // TODO: Why do I need rootGetters here?
            {
              headers: {
                Authorization: `Bearer: ${rootGetters['auth/token']}`
              }
            });
            dispatch('alert/setAlert', {
              type: 'success',
              text: `Updated ${record.lessonName} score to ${record.score}.`
            });
            commit("setUser", data);
            router.push("/training");
          } else {
            // do logic to update a score if previous score was worse
            // Should have Flash Message showing that nothing was added
            console.log("No new lesson score added.");
            router.push("/me");
          }
        }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}