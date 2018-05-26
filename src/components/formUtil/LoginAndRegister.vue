<template>
  <v-tabs
    dark
    color="primary"
    show-arrows>
    <v-tabs-slider color="white"></v-tabs-slider>
    <v-tab>Login</v-tab>
    <v-tab>Register</v-tab>
    <v-tabs-items>
      <v-tab-item>
        <v-card class="primary">
          <v-container>
            <v-layout row v-if="loginError">
              <v-flex>
                <app-alert-error @dismissed="onDismissedLoginError" :text="loginError.message"></app-alert-error>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex>
                <v-card class="secondary white--text elevation-24 ma-2">
                  <v-card-title primary-title>
                  </v-card-title>
                  <v-card-text>
                    <Login></Login>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card class="primary">
          <v-container>
            <v-layout row v-if="error">
              <v-flex>
                <app-alert-error @dismissed="onDismissed" :text="error.message"></app-alert-error>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex>
                <v-card class="secondary white--text elevation-24 ma-2">
                  <v-card-title primary-title>
                    <div class="title">Register Now</div>
                    <div>Educational Networking - Find And Advertise Educational Places Here Location Wise</div>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <Register></Register>
                    </v-container>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
    <v-spacer></v-spacer>
    <v-btn class="background" flat @click.stop="dialog=false">Close</v-btn>
  </v-tabs>

</template>

<script>
import Login from "./Login";
import Register from "./Register";
export default {
  name: "LoginAndRegister",
  components: {Register, Login },
  computed: {
    error() {
      return this.$store.getters.error;
    },
    loginError() {
      return this.$store.getters.loginError;
    }
  },
  methods: {
    onDismissed: function() {
      this.$store.dispatch("clearError");
    },
    onDismissedLoginError() {
      this.$store.dispatch("clearLoginError");
    }
  }
};
</script>

<style scoped>
</style>
