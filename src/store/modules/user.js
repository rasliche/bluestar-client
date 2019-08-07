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
    isAdmin: state => state.isAdmin === true,
}

const mutations = {
}

const actions = {
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}