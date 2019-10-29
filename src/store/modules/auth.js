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
  setLogoutTimer: ({ commit }, expirationTime) => {
      setTimeout(() => {
        commit('user/clearUser', {}, { root: true })
        commit("clearToken");
      }, expirationTime * 1000);
    },
  register: async ({ commit, dispatch }, formData) => {
    try {
      const { data } = await Api.post("/users", formData);
      if (!data.user) {
        console.log(data);
        console.log("error'd out");
        return;
      }
      commit("authUser", data);
      dispatch('alert/setAlert', {
        type: 'success',
        text: 'You have created a new account and been logged in.'
      })
      const now = new Date();
      const expirationDate = new Date(now.getTime() + 7200000);
      localStorage.setItem("bs-auth-time", expirationDate);
      localStorage.setItem("bs-auth-token", data.token);
      dispatch("setLogoutTimer", 7200);
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  },
  authUser: async ({ commit, dispatch }, token) => {
    try {
      commit("setToken", token);
      const now = new Date();
      const expirationDate = new Date(now.getTime() + 7200000);
      localStorage.setItem("bs-auth-time", expirationDate);
      localStorage.setItem("bs-auth-token", token);
      dispatch("setLogoutTimer", 7200);
      router.push("/");
    } catch (err) {
      dispatch('alert/setAlert', {
        type: 'error',
        text: 'There was an error logging in. Please try again.'
      })
    }
  },
  tryAutoLogin: async ({ commit, dispatch }) => {
    const token = localStorage.getItem("bs-auth-token");
    if (!token) {
      return;
    }
    const expirationDate = new Date(localStorage.getItem("bs-auth-time"));
    const now = new Date();
    if (now >= expirationDate) {
      return;
    }
    const { data: user } = await Api.get("/users/me", {
      headers: {
        Authorization: `Bearer: ${token}`
      }
    });
    dispatch(
      'user/setCurrentUser', 
      user, 
      { root: true })
    dispatch('alert/setAlert', {
      type: 'success',
      text: 'You have been automatically logged in. Make sure to Logout if this is a shared computer.'
      }, 
      { root: true })
  },
  logoutUser: ({ commit, dispatch }) => {
    localStorage.removeItem("bs-auth-token");
    localStorage.removeItem("bs-auth-time");
    commit("clearToken");
    dispatch('user/clearCurrentUser', {}, { root: true })
    dispatch('alert/setAlert', {
      type: 'success',
      text: 'You have been logged out.'
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