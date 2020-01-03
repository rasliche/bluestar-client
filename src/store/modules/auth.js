import Api from "@/services/Api";
import router from "@/router";

const state = {
  token: null,
}

const getters = {
  isAuthenticated: state => state.token !== null,
  token: state => state.token
}

const mutations = {
  setToken: (state, token) => {
    state.token = token;
  },
  clearToken: state => {
    state.token = null;
  },
}

const actions = {
  // setLogoutTimer: ({ commit }, expirationTime) => {
  //     setTimeout(() => {
  //       commit('user/clearUser', {}, { root: true })
  //       commit("clearToken");
  //     }, expirationTime * 1000);
  //   },
  register: async ({ commit, dispatch }, formData) => {
    try {
      const { data: { user } } = await Api.post("/users", formData);
      commit("authUser", data);
      dispatch('alert/setAlert', {
        type: 'success',
        text: 'Account created and logged in.'
      })
      // const now = new Date();
      // const expirationDate = new Date(now.getTime() + 7200000);
      // localStorage.setItem("bs-auth-time", expirationDate);
      // localStorage.setItem("bs-auth-token", data.token);
      // dispatch("setLogoutTimer", 7200);
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  },
  authUser: async ({ commit, dispatch }, token) => {
    try {
      commit("setToken", token);
      Api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      // const now = new Date();
      // const expirationDate = new Date(now.getTime() + 7200000);
      // localStorage.setItem("bs-auth-time", expirationDate);
      // localStorage.setItem("bs-auth-token", token);
      // dispatch("setLogoutTimer", 7200);
      router.push("/");
    } catch (err) {
      dispatch('alert/setAlert', {
        type: 'error',
        text: 'Error. Please try again.'
      })
    }
  },
  tryAutoLogin: async ({ commit, dispatch, }) => {
    console.log("Tried to auto-login.")
    // const token = localStorage.getItem("bs-auth-token");
    // if (!token) {
    //   return;
    // }
    // commit('setToken', token)
    // const expirationDate = new Date(localStorage.getItem("bs-auth-time"));
    // const now = new Date();
    // if (now >= expirationDate) {
    //   dispatch('logoutUser')
    //   return;
    // }
    // const { data: user } = await Api.get("/users/me", {
    //   headers: {
    //     Authorization: `Bearer: ${token}`
    //   }
    // });
    // dispatch(
    //   'user/setCurrentUser', 
    //   user, 
    //   { root: true })
    // dispatch('alert/setAlert', {
    //   type: 'success',
    //   text: 'Logged in.'
    //   }, 
    //   { root: true })
  },
  logoutUser: ({ commit, dispatch }) => {
    // localStorage.removeItem("bs-auth-token");
    // localStorage.removeItem("bs-auth-time");
    commit("clearToken");
    Api.defaults.headers.common['Authorization'] = ''
    dispatch('user/clearCurrentUser', {}, { root: true })
    dispatch('alert/setAlert', {
      type: 'success',
      text: 'Logged out.'
    }, { root: true })
    router.replace("/");
  },  
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}