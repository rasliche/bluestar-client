import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    activeUser: null,
    operators: []
  },
  getters: {
    operators: state => {
      return state.operators
    }
  },
  mutations: {
    setOperators: (state, operators) => {
      state.operators = operators
    },
    addOperator: (state, operator) => {
      state.operators.push(operator)
    }
  },
  actions: {
    fetchAllOperators: async ({ commit }) => {
      const { data } = await axios.get('http://localhost:3000/api/operators')
      commit('setOperators', data)
    },
    createNewOperator: async ({ commit }, payload) => {
      console.log(payload)
      const { data, status } = await axios.post('http://localhost:3000/api/operators', payload)
      if (status === 201) {
        commit('addOperator', data)
      }
    }
  }
});
