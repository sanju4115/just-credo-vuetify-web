import * as firebase from "firebase";
import db from "../../components/firebaseInit";
import Router from '../../router'

export default {
  state: {
    user: null,
    loading: false,
    error: null,
    areaSelected:"geohash50",
    isUserAdmin:false,
    drawerState:true
  },
  mutations: {
    setUser(state, payload) {
      if (payload === null || payload === undefined) {
        state.user = null;
      } else {
        const docRef = db.collection("users").doc(payload.uid);
        docRef.get().then(doc => {
          if (doc.exists) {
            state.user = doc.data();
          }else {
            //handleLocationError(false);
          }
        }).catch(function(error) {
          console.log("Shared index.js setUser error getting document:", error);
        });
      }
    },
    setUpdatedUser(state, payload){
      state.user = payload.data;
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
    },
    clearUser(state){
      state.user = null;
    },
    setIsUserAdmin(state,payload){
      const docRef = db.collection("roles").doc(payload.uid);
      docRef.get().then(doc => {
        console.log("roles");
        state.isUserAdmin = doc.exists;
        console.log(state.isUserAdmin);
      }).catch((err) => {
        console.log('Share/index.js setIsUserAdmin error getting documents', err);
        handleLocationError(false);
      });
    },
    setDrawerState(state){
      state.drawerState = !state.drawerState;
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
    },
    clearUser({ commit }){
      commit("clearUser");
    },
    setUser({ commit}, payload){
      commit("setUpdatedUser",payload);
    },
    setIsUserAdmin({ commit},payload){
      commit("setIsUserAdmin",payload);
    },
    toggleDrawerState({commit}){
      commit("setDrawerState");
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
    },
    isUserAdmin(state){
      return state.isUserAdmin;
    },
    drawerState(state){
      return state.drawerState;
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

