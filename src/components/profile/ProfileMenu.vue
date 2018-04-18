<template>
  <div class="text-xs-center">
    <v-menu
      offset-x
      :close-on-content-click="false"
      :nudge-width="200"
      v-model="menu">
      <v-chip slot="activator" color="green" text-color="white" v-model="location">
        <v-avatar class="green"><img :src="user.profilePic" :alt="user.name"></v-avatar>
        {{location.locality}}
      </v-chip>
      <v-card>
        <v-list>
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img :src="user.profilePic" :alt="user.name">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{user.name}}</v-list-tile-title>
              <v-list-tile-sub-title>Software Developer</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn
                icon
                :class="fav ? 'red--text' : ''"
                @click="fav = !fav">
                <v-icon>favorite</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
        <v-divider></v-divider>
        <v-list>
          <v-list-tile>
            <v-list-tile-action>
              <v-switch v-model="message" color="purple"></v-switch>
            </v-list-tile-action>
            <v-list-tile-title>Enable messages</v-list-tile-title>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-action>
              <v-switch v-model="hints" color="purple"></v-switch>
            </v-list-tile-action>
            <v-list-tile-title>Enable hints</v-list-tile-title>
          </v-list-tile>
        </v-list>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click="menu = false">Cancel</v-btn>
          <v-btn color="primary" flat @click="onLogout">Logout</v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: "ProfileMenu",
  data: () => ({
    fav: true,
    menu: false,
    message: false,
    hints: true
  }),
  methods: {
    onLogout() {
      this.$store.dispatch("logout");
    }
  },
  computed: {
    location() {
      return this.$store.getters.location;
    },
    user() {
      return this.$store.getters.user;
    }
  }
};
</script>

<style scoped>
</style>
