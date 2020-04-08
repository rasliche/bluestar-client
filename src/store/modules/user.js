import UserService from '@/services/UserService'
import Api from '@/services/Api'
import router from '@/router'

export const namespaced = true

export const state = {
  user: {},
  users: [],
}

export const mutations = {
  SET_USER: (state, userData) => {
    state.user = userData
  },
  SET_USER_OPERATORS: (state, operators) => {
    state.user.operators = operators
  },
  setUserScoreData: (state, userScore) => {
    return state.lessonScores.push(userScore)
  },
  clearUser: (state) => {
    state.user = null
  },
  ADD_USERS: (state, users) => {
    state.users = [...users]
  },
  ADD_SHOP_TO_USER: (state, shop) => {
    state.user.operators.push(shop)
    state.users.find(u => u._id === state.user._id).operators.push(shop)
  }
}

export const actions = {
  joinShop: ({ commit, state }, payload) => {
    return UserService.joinShop(state.user._id, payload)
      .then(response => { // receive a shop back in { data }
        console.log(response.data)
        commit('ADD_SHOP_TO_USER', response.data)
      })
  },
  getUsers: ({ commit }) => {
    return UserService.getUsers().then(response => {
      commit('ADD_USERS', response.data)
    })
  },
  setUser: ({ commit }, userData) => {
    commit('SET_USER', userData)
  },
  setUserOperatorData: ({ commit }, operator) => {
    commit('setUserOperatorData', operator)
  },
  setUserScoreData: ({ commit }, score) => {
    commit('setUserScoreData', score)
  },
  clearUser: ({ commit }) => {
    commit('clearUser')
  },
  getUserScores: async ({ dispatch, commit, getters }) => {
    try {
      const { data } = await Api.get(`/user/${getters.userId}/scores/`)
      data.forEach((l) => {
        commit('setUserScoreData', l)
      })
    } catch (error) {
      console.log('is this the error?')
      console.log(error)
    }
  },
  // users
  submitLessonScore: async (
    { dispatch, commit, getters, rootGetters },
    record
  ) => {
    // Check if it is a new score for user
    console.log('New Record: ', record)
    let previousLessonRecord
    if (getters['user/lessonScores']) {
      previousLessonRecord = getters['user/lessonScores'].find(
        (r) => r.lesson._id === record.lesson._id
      )
    }
    if (previousLessonRecord)
      console.log('Previous Lesson: ', previousLessonRecord)
    if (!previousLessonRecord || previousLessonRecord.score < record.score) {
      // asynchronously add score to user profile in database
      const { data } = await Api.put(
        `/users/${rootGetters['user/userId']}/records`,
        record, // TODO: Why do I need rootGetters here?
        {
          headers: {
            Authorization: `Bearer: ${rootGetters['auth/token']}`
          }
        }
      )
      // dispatch('alert/setAlert', {
      //   type: 'success',
      //   text: `Updated lesson score.`
      //   // text: `Updated ${record.lessonName} score to ${record.score}.`
      // });
      commit('setCurrentUserData', data)
      router.push('/training')
    } else {
      // do logic to update a score if previous score was worse
      // Should have Flash Message showing that nothing was added
      console.log('No new lesson score added.')
      router.push('/me')
    }
  },
  getUserOperators: ({ commit, state }) => {
    return UserService.getUserOperators(state.user._id)
      .then(response => {
        console.log(response.data)
        commit('SET_USER_OPERATORS', response.data)
      })
  }
}
