// import OperatorService from '@/services/OperatorService'
import Api from '@/services/Api'

export const namespaced = true

export const state = {
  operator: {},
  operators: []
}

export const getters = {
  operatorByName: (state) => (name) => {
    return state.operators.find(o => o.name === name)
  },
  operatorNames: (state) => {
    return state.operators.map(o => o.name)
  }
}

export const mutations = {
  setOperators: (state, operators) => {
    state.operators = operators
  },
  addOperator: (state, operator) => {
    state.operators.push(operator)
  },
  ADD_OPERATORS: (state, operators) => {
    state.operators = [...operators]
  }
}

export const actions = {
  getOperators: async ({ commit, rootGetters }) => {
    const { data: operators } = await Api.get('/operators', {
      headers: {
        Authorization: `Bearer: ${rootGetters.token}`
      }
    })
    commit('ADD_OPERATORS', operators)
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
