import * as firebase from "firebase";
import db from "../../components/firebaseInit";
import Router from '../../router'

export default {
  state: {
    user: null,
    loading: false,
    error: null,
    areaSelected:"geohash50"
  },
  mutations: {
    setUser(state, payload) {
      if (payload === null || payload === undefined) {
        state.user = null;
      } else {
        const docRef = db.collection("users").doc(payload.uid);
        docRef.get().then(doc => {
          if (doc.exists) {
            console.log("User exist in db");
            console.log(doc.data());
            state.user = doc.data();
          }else {
            console.log("User does not exist in db");
            //handleLocationError(false);
          }
        }).catch(function(error) {
          console.log("Error getting document:", error);
        });
      }
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    clearError(state) {
      state.error = null;
    },
    setAreaSelected(state, payload) {
      state.areaSelected = payload.area;
    }
  },
  actions: {
    clearError({ commit }) {
      commit("clearError");
    },
    logout({ commit }) {
      firebase.auth().signOut();
      commit("setUser", null);
    },
    areaChange({ commit, getters }, payload) {
      commit("setAreaSelected", payload);
    }
  },
  getters: {
    user(state) {
      return state.user;
    },
    error(state) {
      return state.error;
    },
    loading(state) {
      return state.loading;
    },
    areaSelected(state){
      return state.areaSelected;
    }
  }
};

const handleLocationError = (browserHasGeolocation) => {
  const error = browserHasGeolocation
    ? `The Geolocation service failed.
     It's possible that you blocked this site for tracking your location,
     please try clearing your settings and try again.`
    : `Your browser doesn't support geolocation.`
  Router.push(`/error?error=${error}`)
};

