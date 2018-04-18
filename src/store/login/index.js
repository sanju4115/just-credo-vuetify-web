import * as firebase from "firebase";

export default {
  state: {
    loginError: null
  },
  mutations: {
    setLoginError(state, payload) {
      state.loginError = payload;
    },
    clearLoginError(state) {
      state.loginError = null;
    }
  },
  actions: {
    signUserIn({ commit }, payload) {
      commit("setLoading", true);
      commit("clearLoginError");
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          console.log("loading false");
          commit("setLoading", false);
          const newUser = {
            uid: user.uid
          };
          commit("setUser", newUser);
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setLoginError", error);
        });
    },
    clearLoginError({ commit }) {
      commit("clearLoginError");
    },
    autoSignIn({ commit }, payload) {
      commit("setUser", { uid: payload.uid });
    }
  },
  getters: {
    loginError(state) {
      return state.loginError;
    }
  }
};
