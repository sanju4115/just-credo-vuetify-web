import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import Register from "./register";
import Login from "./login";
import Shared from "./shared";
import School from "./school";
import Location from "./location";

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    Register: Register,
    Login: Login,
    Shared: Shared,
    School: School,
    Location: Location
  },
  plugins: [createPersistedState()]
});

/*
import Cookies from "js-cookie";
plugins: [createPersistedState({
  storage: {
    getItem: key => Cookies.get(key),
    setItem: (key, value) => Cookies.set(key, value, { expires: 3, secure: true }),
    removeItem: key => Cookies.remove(key)
  }
})]*/
