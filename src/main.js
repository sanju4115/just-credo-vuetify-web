import Vue from "vue";
import App from "./App";
import router from "./router";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import firebase from "firebase";
import "./components/firebaseInit";
import { store } from "./store/store";
import ErrorAlert from "./components/alerts/ErrorAlert";
import VueCarousel from "vue-carousel";
import * as VueGoogleMaps from "vue2-google-maps";
import VuetifyGoogleAutocomplete from "vuetify-google-autocomplete";
import db from "./components/firebaseInit";

Vue.use(VuetifyGoogleAutocomplete, {});
Vue.use(VueCarousel);

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyCg9KqjmKWZOFws3MUGPdx4uPJgjlndwds",
    libraries: "places,geocoder" // This is required if you use the Autocomplete plugin
  }
});

Vue.use(Vuetify, {
  theme: {
    primary: "#000000",
    secondary: "#212121",
    accent: "#8BC34A",
    error: "#FF5252",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FFC107",
    background: "#455A64",
    primaryLight: "#B2DFDB",
    colorPrimaryText: "#FFFFFF",
    colorSecondaryText: "#757575"
  }
});

Vue.config.productionTip = false;
Vue.component("app-alert-error", ErrorAlert);

export const eventBus = new Vue();

let app;
firebase.auth().onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      el: "#app",
      router,
      store,
      render: h => h(App),
      created() {
        if (user) {
          const docRef = db.collection("users").doc(user.uid);
          docRef.get().then(function(doc) {
            if (doc.exists) {
              console.log("User already exist:", doc.data());
            } else {
              const newUser = {
                name : user.displayName,
                email : user.email,
                emailVerified : user.emailVerified,
                profilePic : user.photoURL,
                uid : user.uid,
                providerData : user.providerData
              };
              console.log(newUser);
              docRef.set(newUser)
                .then(function() {
                  console.log("Document successfully written!");
                })
                .catch(function(error) {
                    console.error("Error writing document: ", error);
                });
            }
          }).catch(function(error) {
            console.log("Error getting document:", error);
          });

          this.$store.dispatch("autoSignIn", user);
        }
      }
    });
  }
});
