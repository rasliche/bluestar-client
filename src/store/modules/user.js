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
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}