<template>
  <v-navigation-drawer
    v-bind:class="{navigationBar:$vuetify.breakpoint.lgAndUp}"
    class="indicatorColor"
    dark v-if="userIsAuthenticated"
    fixed
    :clipped="$vuetify.breakpoint.lgAndUp"
    app
    :value="drawerStateChanged">
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
</template>

<script>
export default {
  name: "NavigationDrawer",
  props:["drawerState"],
  computed: {
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },

    drawerStateChanged(){
      return this.drawerState;
    }
  },
  watch: {
    drawerStateChanged() {
      this.$emit("toggleDrawerState");
    }
  },
  data: () => ({
    drawer:true,
    items : [
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
        icon: "border_color",
        text: "Edit Profile",
        link: "/editProfile"
      },
      {
        icon: "dashboard",
        text: "Admin",
        link: "/adminDashboard"
      },
      {
        icon: "keyboard_arrow_up",
        "icon-alt": "keyboard_arrow_down",
        text: "Add Place",
        model: false,
        children: [
          {
            text: "School",
            link: "/addPlace"
          },
          {
            text: "Coaching",
            link: "/addPlace"
          },
          {
            text: "Music School",
            link: "/addPlace"
          },
          {
            text: "Sports School",
            link: "/addPlace"
          },
          {
            text: "Art School",
            link: "/addPlace"
          },
          {
            text: "Private/Home Tutors",
            link: "/addPlace"
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
    ]
  }),
};
</script>

<style scoped>
  .navigationBar {
    height: 100%;
    z-index: auto;
  }

</style>
