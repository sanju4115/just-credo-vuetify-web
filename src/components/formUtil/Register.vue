<template>
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
            :loading=loading
            :disabled=loading>
            Register
            <span slot="loader" class="custom-loader">
                                  <v-icon light>cached</v-icon>
                                  </span>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: "Register",
  methods: {
    onRegister: function() {
      this.$store.dispatch("registerUser", {
        email: this.email,
        password: this.password
      });
    }
  },
  data: () => ({
    email: "",
    password: "",
    confirmPassword: "",
  }),
  computed: {
    comparePasswords() {
      return this.password !== this.confirmPassword
        ? "Passwords do not match"
        : true;
    },
    loading() {
      return this.$store.getters.loading;
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
