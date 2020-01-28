import Api from '@/services/Api'

const state = {
  operators: []
}

const getters = {
  operators: (state) => state.operators
}

const mutations = {
  setOperators: (state, operators) => {
    state.operators = operators
  },
  addOperator: (state, operator) => {
    state.operators.push(operator)
  }
}

const actions = {
  getOperators: async ({ commit, rootGetters }) => {
    const { data: operators } = await Api.get('/operators', {
      headers: {
        Authorization: `Bearer: ${rootGetters.token}`
      }
    })
    commit('setOperators', operators)
  },
  postOperator: async ({ commit, dispatch, rootGetters }, newOperator) => {
    const { data: operator } = await Api.post('/operators', newOperator, {
      headers: { Authorization: `Bearer: ${rootGetters['auth/token']}` }
    })
    dispatch(
      'alert/setAlert',
      {
        type: 'success',
        text: `${operator.name} was created.`
      },
      { root: true }
    )
    commit('addOperator', operator)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
