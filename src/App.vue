<template>
  <v-app id="inspire">
    <NavigationDrawer
      :drawerState="drawer"></NavigationDrawer>
    <Toolbar
      @onLogoClicked="drawer = !drawer"
      @onLoginBtnClick="dialog = !dialog"></Toolbar>
    <v-content class="grey lighten-3">
      <router-view></router-view>
      <vue-snotify></vue-snotify>
      <p>{{drawer}}</p>
    </v-content>
    <v-dialog v-model="dialog" width="500px" color="primary">
     <LoginAndRegister></LoginAndRegister>
    </v-dialog>
   <call-footer-link/>
  </v-app>
</template>

<script>
import Footer from "./components/Footer.vue";
import firebase from "firebase";
import Toolbar from "./components/Toolbar";
import NavigationDrawer from "./components/NavigationDrawer";
import LoginAndRegister from "./components/formUtil/LoginAndRegister";

export default {
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
    LoginAndRegister,
    NavigationDrawer,
    Toolbar,
    "call-footer-link": Footer,
  },
  data: () => ({
    dialog: false,
    drawer: true,
  }),
  methods: {
  },
  created(){
    firebase.messaging().onMessage(payload => {
      console.log(payload);
      this.$snotify.info(payload.notification.body, payload.notification.title, {
        timeout: 2000,
        showProgressBar: true,
        closeOnClick: true,
        icon: payload.notification.icon
      });
    });
  }
};
</script>

<style>

</style>
