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
    authUser: (state, userData) => {
        const { token, user } = userData;
        state.userId = user._id;
        state.token = token;
        state.name = user.name;
        state.email = user.email;
        state.operators = user.operators;
        state.lessonScores = user.lessonScores;
        state.isAdmin = user.isAdmin;
      },
      setUser: (state, user) => {
        state.userId = user._id;
        state.name = user.name;
        state.email = user.email;
        state.operators = user.operators;
        state.lessonScores = user.lessonScores;
        state.isAdmin = user.isAdmin;
      },
      clearAuth: state => {
        state.token = null;
        state.userId = null;
        state.name = "";
        state.email = "";
        state.operators = [];
        state.lessonScores = [];
        state.isAdmin = false;
  
      },
}

const actions = {
    setLogoutTimer: ({ commit }, expirationTime) => {
        setTimeout(() => {
          commit("clearAuth");
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
      login: async ({ commit, dispatch }, authData) => {
        try {
          const { data } = await Api.post("/auth/login", authData);
          if (!data.user) {
            console.log(data);
            console.log("error'd out");
            return;
          }
          console.log(data);
          commit("authUser", data);
          dispatch('alert/setAlert', {
            type: 'success',
            text: 'You have been logged in.'
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
        const { data } = await Api.get("/users/me", {
          headers: {
            Authorization: `Bearer: ${token}`
          }
        });
        data.token = token;
        commit("authUser", data);
        dispatch('alert/setAlert', {
          type: 'success',
          text: 'You have been automatically logged in. Make sure to Logout if this is a shared computer.'
        })
      },
      logout: ({ commit, dispatch }) => {
        localStorage.removeItem("bs-auth-token");
        localStorage.removeItem("bs-auth-time");
        commit("clearAuth");
        dispatch('alert/setAlert', {
          type: 'success',
          text: 'You have been logged out.'
        })
        router.replace("/login");
      },  
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}