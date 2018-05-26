<template>
  <v-toolbar
    color="secondary"
    dark
    app
    :clipped-left="$vuetify.breakpoint.lgAndUp"
    fixed
    extense>
    <img style="cursor : pointer"
         @click.stop="onLogoClicked"
         src="/static/logo_web.png"
         width="250px" class="text-xs-center"/>
    <v-text-field v-if="userIsAuthenticated"
                  flat
                  solo-inverted
                  prepend-icon="search"
                  label="Search"
                  class="hidden-sm-and-down ml-5"></v-text-field>
    <v-spacer></v-spacer>
    <v-toolbar-items
      v-if="!userIsAuthenticated"
      class="hidden-sm-and-down">
      <v-btn flat @click="scrollToServices()">Services</v-btn>
      <v-btn flat @click="scrollToFeatures()">Features</v-btn>
      <v-btn flat @click="scrollToContents()">Contents</v-btn>
      <v-btn flat @click="scrollToPartners()">Partners</v-btn>
      <v-btn flat @click="scrollToMission()">Mission</v-btn>
    </v-toolbar-items>
    <v-btn
      v-if="!userIsAuthenticated"
      type="submit"
      color="red"
      @click.stop="onLoginBtnClick">
      Login
    </v-btn>
    <app-profile-menu v-if="userIsAuthenticated"></app-profile-menu>
  </v-toolbar>
</template>

<script>
import ProfileMenu from "../components/profile/ProfileMenu.vue";

export default {
  name: "Toolbar",
  components: {
    "app-profile-menu": ProfileMenu
  },
  methods: {
    scrollToFeatures :function(){
      this.$SmoothScroll(document.getElementById('features'));
    },
    scrollToServices :function(){
      this.$SmoothScroll(document.getElementById('services'));
    },
    scrollToContents :function(){
      this.$SmoothScroll(document.getElementById('contents'));
    },
    scrollToPartners :function(){
      this.$SmoothScroll(document.getElementById('partners'));
    },
    scrollToMission :function(){
      this.$SmoothScroll(document.getElementById('mission'));
    },
    onLogoClicked: function(){
      this.$emit("onLogoClicked");
    },
    onLoginBtnClick: function () {
      this.$emit("onLoginBtnClick");
    }
  },
  computed: {
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    }
  }
};
</script>

<style scoped>
</style>
