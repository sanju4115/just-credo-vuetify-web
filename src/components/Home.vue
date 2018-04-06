<template>
  <v-container>
      <v-layout row>
          <v-flex xs12 sm6 offset-sm3>
              <v-card>
              <v-card-text>
                  <v-container>
                      <v-form @submit.prevent="onRegister">
                          <v-layout row>
                              <v-flex xs12>
                                  <v-text-field
                                    name="email"
                                    label="Email"
                                    id="email"
                                    v-model="email"
                                    type="email"
                                    required></v-text-field>
                                    <v-text-field
                                    name="password"
                                    label="Password"
                                    id="password"
                                    v-model="password"
                                    type="password"
                                    required></v-text-field>
                                    <v-text-field
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    id="confirmPassword"
                                    v-model="confirmPassword"
                                    type="password"
                                    :rules="[comparePasswords]"></v-text-field>
                                    <v-btn
                                        type="submit"
                                        color="accent"
                                        :loading="loading"
                                        :disabled="loading">Register</v-btn>
                              </v-flex>
                          </v-layout>
                      </v-form>
                  </v-container>
              </v-card-text>
              </v-card>
          </v-flex>
      </v-layout>
 </v-container>  
</template>

<script>
import db from './firebaseInit';
import firebase from 'firebase';
export default {
  data(){
    return {
        loader: null,
        loading: false,
        email:"",
        password:"",
        confirmPassword:""
    }
  },
    watch: {
      loader () {
        const l = this.loader
        this[l] = !this[l]
      }
    },
  computed: {
      comparePasswords(){
          return this.password !== this.confirmPassword ? "Passwords do not match" : true
      },
      user(){
          return this.$store.getters.user;
      }
  },
  watch:{
      user(value){
          if(value!==null && value!==undefined){
              this.$router.push('/');
          }
      }
  },
  methods: {
      onRegister(e){
        this.$store.dispatch('registerUser', {email: this.email, password: this.password, loading: this.loading});
    },
    login:function(e){
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .then(user =>{
        this.$router.push('/newsfeed');
      },
      err =>{
        alert(err.message);
      })
    }
  }
}
</script>

<style>
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

