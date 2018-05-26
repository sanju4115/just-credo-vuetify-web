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
import colors from 'vuetify/es5/util/colors';
import VueSticky from 'vue-sticky';
import Croppa from 'vue-croppa';
import vueSmoothScroll from 'vue-smoothscroll';
import VueProgressiveImage from 'vue-progressive-image';
import VueAnimate from 'vue2-animate/dist/vue2-animate.min.css';
import Snotify, { SnotifyPosition } from 'vue-snotify';
import 'vue-snotify/styles/material.css';


const options = {
  toast: {
    position: SnotifyPosition.rightTop
  }
};

Vue.use(Snotify, options);
Vue.use(VueProgressiveImage, {
  placeholder: 'static/images/placeholder.png',
  fallback:"static/images/broken-image.jpg",
  blur:"30"
});

Vue.use(VueAnimate);
Vue.use(vueSmoothScroll);
Vue.use(Croppa);
Vue.use(VuetifyGoogleAutocomplete, {});
Vue.use(VueCarousel);
Vue.use(VueSticky);

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
    indicatorColor:colors.blueGrey.darken4,
    primaryLight: "#B2DFDB",
    colorPrimaryText: "#FFFFFF",
    colorSecondaryText: "#757575"
  }
});

// Vue.use(Vuetify, {
//   theme: {
//     primary: "#00796b",
//     secondary: "#009688",
//     accent: "#4CAF50",
//     error: "#FF5252",
//     info: "#2196F3",
//     success: "#4CAF50",
//     warning: "#FFC107",
//     background: "#FFFFFF",
//     primaryLight: "#B2DFDB",
//     colorPrimaryText: "#000000",
//     colorSecondaryText: "#757575",
//     secondaryIcon: colors.grey.darken1,
//     secondaryBackground:"grey lighten-3"
//   }
// });

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
        /**
         * Set service worker registered false as browser refresh
         */
        this.$store.dispatch("setServiceWorkerRegistered", false);

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
            console.log("Main.js onAuthStateChanged Error getting document:", error);
          });

          /**
           * Auto sign in
           */
          this.$store.dispatch("autoSignIn", user);

        }else {
          /**
           * User session ended
           * so clear user and location
           */
          this.$store.dispatch("clearLocation");
          this.$store.dispatch("clearUser");
        }
      }
    });
  }
});

