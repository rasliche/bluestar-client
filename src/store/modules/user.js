import Api from '@/services/Api'
import router from '@/router'

export const namespaced = true

export const state = {
  user: {},
  userId: null,
  name: null,
  email: null,
  operators: [],
  lessonScores: [],
  isAdmin: false
}

export const getters = {
  userId: (state) => state.userId,
  name: (state) => state.name,
  email: (state) => state.email,
  operators: (state) => state.operators,
  lessonScores: (state) => state.lessonScores,
  isAdmin: (state) => state.isAdmin
}

export const mutations = {
  setUserData: (state, user) => {
    state.userId = user._id
    state.name = user.name
    state.email = user.email
    state.isAdmin = user.isAdmin
  },
  setUserOperatorData: (state, userOperator) => {
    return state.operators.push(userOperator)
  },
  setUserScoreData: (state, userScore) => {
    return state.lessonScores.push(userScore)
  },
  clearUser: (state) => {
    state.userId = null
    state.name = null
    state.email = null
    state.operators = []
    state.lessonScores = []
    state.isAdmin = false
  }
}

export const actions = {
  setUserData: ({ commit }, userData) => {
    commit('setUserData', userData)
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
  }
}
