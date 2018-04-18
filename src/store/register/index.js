import * as firebase from "firebase";

export default {
  actions: {
    registerUser({ commit }, payload) {
      commit("setLoading", true);
      commit("clearError");
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit("setLoading", false);
            const newUser = {
              id: user.uid
            };
            commit("setUser", newUser);
          },
          err => {
            commit("setLoading", false);
            commit("setError", err);
          }
        );
    }
  }
};
