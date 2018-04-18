<template>
  <v-app id="inspire">
    <v-navigation-drawer v-bind:class="{navigationBar:$vuetify.breakpoint.lgAndUp}" class="blue-grey darken-2" dark v-if="userIsAuthenticated" fixed :clipped="$vuetify.breakpoint.lgAndUp" app v-model="drawer">
      <v-list>
        <template v-for="item in items">
          <v-layout row v-if="item.heading" align-center :key="item.heading">
              <v-flex xs6>
                <v-subheader v-if="item.heading">
                  {{ item.heading }}
                </v-subheader>
              </v-flex>
              <v-flex xs6 class="text-xs-center">
                <a href="#!" class="body-2 black--text">EDIT</a>
              </v-flex>
            </v-layout>
            <v-list-group
              v-else-if="item.children"
              v-model="item.model"
              :key="item.text"
              :prepend-icon="item.model ? item.icon : item['icon-alt']"
              append-icon="">
              <v-list-tile slot="activator" router :to="item.link">
                <v-list-tile-content>
                  <v-list-tile-title>
                    {{ item.text }}
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile
                v-for="child in item.children"
                :key="child.text" router :to="child.link">
                <v-list-tile-action v-if="child.icon">
                  <v-icon>{{ child.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>
                    {{ child.text }}
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list-group>
            <v-list-tile v-else :key="item.text" router :to="item.link">
              <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
      </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      color="primary"
      dark
      app
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      fixed
      extense :style="{'height':height + '%'}">

      <img style="cursor : pointer" @click.stop="drawer = !drawer" src="/static/logo_web.png" width="300px" class="text-xs-center"/>

      <v-text-field v-if="userIsAuthenticated"
        flat
        solo-inverted
        prepend-icon="search"
        label="Search"
        class="hidden-sm-and-down ml-5"></v-text-field>
      <v-spacer></v-spacer>
      <v-btn
        v-if="!userIsAuthenticated"
        type="submit"
        color="secondary"
        @click.stop="dialog = !dialog">
        Login
      </v-btn>
      <app-profile-menu v-if="userIsAuthenticated"></app-profile-menu>
    </v-toolbar>
    <v-content class="primary">
      <router-view></router-view>
    </v-content>
    <v-dialog v-model="dialog" width="500px">
      <v-tabs
        dark
        color="background"
        show-arrows>
        <v-tabs-slider color="white"></v-tabs-slider>
        <v-tab>Login</v-tab>
        <v-tab>Register</v-tab>
        <v-tabs-items>
          <v-tab-item>
            <v-card class="background">
              <v-container>
                <v-layout row v-if="loginError">
                  <v-flex>
                    <app-alert-error @dismissed="onDismissedLoginError" :text="loginError.message"></app-alert-error>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex>
                    <v-card class="background white--text elevation-24 ma-2">
                      <v-card-title primary-title>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-form @submit.prevent="onSignin">
                            <v-layout row wrap>
                              <v-flex sm12 md12>
                                <div id="firebaseui-auth-container">
                                </div>
                              </v-flex>
                              <v-flex>
                                <v-text-field
                                  dark
                                  flat
                                  class="ma-1"
                                  solo-inverted
                                  name="loginEmail"
                                  label="Email"
                                  id="loginEmail"
                                  v-model="loginEmail"
                                  type="email"
                                  required></v-text-field>
                                <v-text-field
                                  class="ma-1"
                                  dark
                                  flat
                                  solo-inverted
                                  name="loginPassword"
                                  label="Password"
                                  id="loginPassword"
                                  v-model="loginPassword"
                                  type="password"
                                  required></v-text-field>
                                <v-flex d-flex>
                                  <p>Forgot Password?</p>
                                </v-flex>
                                <v-btn
                                  dark
                                  type="submit"
                                  color="secondary"
                                  :loading="loading"
                                  :disabled="loading">
                                  Login
                                  <span slot="loader" class="custom-loader">
                                  <v-icon dark>cached</v-icon>
                                  </span>
                                </v-btn>
                              </v-flex>
                            </v-layout>
                          </v-form>
                        </v-container>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-container>
              <v-card-actions>
                <v-btn color="colorPrimaryText" flat @click.stop="dialog=false">Close</v-btn>
              </v-card-actions>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card class="background">
              <v-container>
                <v-layout row v-if="error">
                  <v-flex>
                    <app-alert-error @dismissed="onDismissed" :text="error.message"></app-alert-error>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex>
                    <v-card class="background white--text elevation-24 ma-2">
                      <v-card-title primary-title>
                        <div class="title">Register Now</div>
                        <div>Educational Networking - Find And Advertise Educational Places Here Location Wise</div>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-form @submit.prevent="onRegister">
                            <v-layout row>
                              <v-flex>
                                <v-text-field
                                  dark
                                  flat
                                  class="ma-1"
                                  solo-inverted
                                  name="email"
                                  label="Email"
                                  id="email"
                                  v-model="email"
                                  type="email"
                                  required></v-text-field>
                                <v-text-field
                                  class="ma-1"
                                  dark
                                  flat
                                  solo-inverted
                                  name="password"
                                  label="Password"
                                  id="password"
                                  v-model="password"
                                  type="password"
                                  required></v-text-field>
                                <v-text-field
                                  class="ma-1"
                                  dark
                                  flat
                                  solo-inverted
                                  name="confirmPassword"
                                  label="Confirm Password"
                                  id="confirmPassword"
                                  v-model="confirmPassword"
                                  type="password"
                                  :rules="[comparePasswords]"></v-text-field>
                                <v-btn
                                  color="secondary"
                                  type="submit"
                                  :loading="loading"
                                  :disabled="loading">
                                  Register
                                  <span slot="loader" class="custom-loader">
                                  <v-icon light>cached</v-icon>
                                  </span>
                                </v-btn>
                              </v-flex>
                            </v-layout>
                          </v-form>
                        </v-container>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-container>
              <v-card-actions>
                <v-btn color="colorPrimaryText" flat @click.stop="dialog=false">Close</v-btn>
              </v-card-actions>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-tabs>
    </v-dialog>
   <call-footer-link/>
  </v-app>
</template>

<script>
import Footer from "./components/Footer.vue";
import ProfileMenu from "./components/profile/ProfileMenu.vue";
import firebaseui from "firebaseui";
import firebase from "firebase";

export default {
  mounted() {
    const uiConfig = {
      signInSuccessUrl: "/home",
      credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM,
      signInFlow: "popup",
      signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
    };
    const ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start("#firebaseui-auth-container", uiConfig);
  },
  computed: {
    items() {
      let items = [
        {
          icon: "account_box",
          text: "Login",
          link: "/login"
        },
        {
          icon: "help",
          text: "Help",
          link: "/profile"
        },
        {
          icon: "phonelink",
          text: "App downloads",
          link: "/profile"
        }
      ];
      if (this.userIsAuthenticated) {
        items = [
          {
            icon: "home",
            text: "Home",
            link: "/home"
          },
          {
            icon: "pages",
            text: "Feeds",
            link: "/feeds"
          },
          {
            icon: "burst_mode",
            text: "Blogs",
            link: "/blogs"
          },
          {
            icon: "person",
            text: "Profile",
            link: "/profile"
          },
          {
            icon: "keyboard_arrow_up",
            "icon-alt": "keyboard_arrow_down",
            text: "Add Place",
            model: false,
            children: [
              {
                text: "School",
                link: "/profile"
              },
              {
                text: "Coaching",
                link: "/profile"
              },
              {
                text: "Music School",
                link: "/profile"
              },
              {
                text: "Sports School",
                link: "/profile"
              },
              {
                text: "Art School",
                link: "/profile"
              },
              {
                text: "Private/Home Tutors",
                link: "/profile"
              }
            ]
          },
          {
            icon: "settings",
            text: "Settings",
            link: "/profile"
          },
          {
            icon: "chat_bubble",
            text: "Send feedback",
            link: "/profile"
          },
          {
            icon: "help",
            text: "Help",
            link: "/profile"
          },
          {
            icon: "phonelink",
            text: "App downloads",
            link: "/profile"
          }
        ];
      }
      return items;
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
    height() {
      if (this.userIsAuthenticated) {
        return 8;
      } else {
        return 8;
      }
    },
    comparePasswords() {
      return this.password !== this.confirmPassword
        ? "Passwords do not match"
        : true;
    },
    error() {
      return this.$store.getters.error;
    },
    user() {
      return this.$store.getters.user;
    },
    loginError() {
      return this.$store.getters.loginError;
    },
    loading() {
      return this.$store.getters.loading;
    }
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.push("/home");
        this.dialog = false;
      } else {
        this.$router.push("/");
      }
    }
  },
  components: {
    "call-footer-link": Footer,
    "app-profile-menu": ProfileMenu
  },
  data: () => ({
    email: "",
    password: "",
    loginEmail: "",
    loginPassword: "",
    confirmPassword: "",
    dialog: false,
    drawer: true,
    snackbar: false,
    snackbarText: null
  }),
  methods: {
    onRegister: function() {
      this.$store.dispatch("registerUser", {
        email: this.email,
        password: this.password
      });
    },
    onDismissed: function() {
      this.$store.dispatch("clearError");
    },
    onSignin() {
      this.$store.dispatch("signUserIn", {
        email: this.loginEmail,
        password: this.loginPassword
      });
    },
    onDismissedLoginError() {
      this.$store.dispatch("clearLoginError");
    }
  },
  props: {
    source: String
  }
};
</script>

<style>
.navigationBar {
  height: 100%;
  z-index: auto;
}

.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}

@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
