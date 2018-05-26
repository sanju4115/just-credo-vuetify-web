<template>
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
            :loading=loading
            :disabled=loading>
            Login
            <span slot="loader" class="custom-loader">
                                  <v-icon dark>cached</v-icon>
                                  </span>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-form>
  </v-container>
</template>

<script>
import firebaseui from "firebaseui";
import firebase from "firebase";

export default {
  name: "Login",
  data: () => ({
    loginEmail: "",
    loginPassword: ""
  }),
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
    loading() {
      return this.$store.getters.loading;
    }
  },
  methods: {
    onSignin() {
      this.$store.dispatch("signUserIn", {
        email: this.loginEmail,
        password: this.loginPassword
      });
    }
  }
};
</script>

<style scoped>
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
