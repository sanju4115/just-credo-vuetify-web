import * as firebase from "firebase";
import db from "../../components/firebaseInit";

export default {
  state: {
    loginError: null,
    serviceWorkerRegistered:false
  },
  mutations: {
    setLoginError(state, payload) {
      state.loginError = payload;
    },
    clearLoginError(state) {
      state.loginError = null;
    },
    setServiceWorkerRegistered(state,payload){
      state.serviceWorkerRegistered = payload;
    }
  },
  actions: {
    signUserIn({ commit, state }, payload) {
      commit("setLoading", true);
      commit("clearLoginError");
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit("setLoading", false);
          const newUser = {
            uid: user.uid
          };
          commit("setUser", newUser);
          afterSignInUserSpecificTask(commit, state, newUser);
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setLoginError", error);
        });
    },
    clearLoginError({ commit }) {
      commit("clearLoginError");
    },
    autoSignIn({ commit, state }, payload) {
      commit("setLoading", false);
      commit("setUser", { uid: payload.uid });
      afterSignInUserSpecificTask(commit, state, payload)
    },
    setServiceWorkerRegistered({ commit},payload){
      commit("setServiceWorkerRegistered",payload);
    }
  },
  getters: {
    loginError(state) {
      return state.loginError;
    }
  }
};

function afterSignInUserSpecificTask(commit, state, user) {
  /**
   * Build notification service
   * 1. Request Permission
   * 2. Save token in db
   * @type {firebase.messaging.Messaging | *}
   */
  const FIREBASE_MESSAGING = firebase.messaging();
  console.log("service worker registered","==>",state.serviceWorkerRegistered);
  if (!state.serviceWorkerRegistered){
    navigator.serviceWorker.register('/static/js/firebase-messaging-sw.js')
      .then((registration) => {
        FIREBASE_MESSAGING.useServiceWorker(registration);
        commit("setServiceWorkerRegistered", true);
        FIREBASE_MESSAGING.requestPermission()
          .then(() => {
            FIREBASE_MESSAGING.getToken().then(token => {
              db.collection("notification_tokens").doc(user.uid).set({
                token: token,
                uid: user.uid
              }).then(()=>{

              }).catch(err=>{
                console.log("Shared/index.js error in registering service worker",err);
              });
              console.log(`The token is ${token}`)
            });
          });
      })
      .catch(err => {
        console.log(err)
      });
  }else {
    FIREBASE_MESSAGING.getToken().then(token => {
      db.collection("notification_tokens").doc(user.uid).set({
        token: token,
        uid: user.uid
      }).then(()=>{

      }).catch(err=>{
        console.log("Shared/index.js error in registering service worker",err);
      });
      console.log(`The token is ${token}`)
    });
  }

  /**
   * Check user is admin or not
   * 1. if admin set in store admin field true
   * 2. otherwise false
   *
   */
  commit("setIsUserAdmin", user);
}
