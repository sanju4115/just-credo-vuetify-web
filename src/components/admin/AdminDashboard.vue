<template>
  <v-card class="justify-center grey lighten-3">
    <v-container class="black lighten-1 colorPrimaryText--text" fluid>
      <div class="ml-5">
        <h3 class="welcome mt-3 pa-1 mb-1">{{currentUser.name}}</h3>
        <h3 class="welcome pa-1">Admin Dashboard</h3>
      </div>
    </v-container>
    <v-container >
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 pa-1>
          <v-subheader
            style="height: 5.7vh;"
            class="indicatorColor colorPrimaryText--text justify-center">
            Notifications
          </v-subheader>
          <v-layout class="nestedScroll">
            <v-card>
              <AdminNotification></AdminNotification>
            </v-card>
          </v-layout>
        </v-flex>
        <v-flex xs12 sm6 md8 pa-1>
          <v-layout row wrap>
            <v-flex xs4 pa-2>
              <PlaceStat></PlaceStat>
            </v-flex>
            <v-flex xs4 pa-2>
              <PlaceStat></PlaceStat>
            </v-flex>
            <v-flex xs4 pa-2>
              <PlaceStat></PlaceStat>
            </v-flex>
            <v-flex xs4 pa-2>
              <PlaceStat></PlaceStat>
            </v-flex>
            <v-flex xs4 pa-2>
              <PlaceStat></PlaceStat>
            </v-flex>
            <v-flex xs4 pa-2>
              <PlaceStat></PlaceStat>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12 sm6 md8 pa-1 mt-5>
          <v-tabs
            color="background"
            dark
            show-arrows>
            <v-tabs-slider color="background"></v-tabs-slider>
            <v-tab
              v-for="item in tabItems">
              {{ item.text }}
            </v-tab>
            <v-tabs-items class="nestedScroll">
              <v-tab-item>
              </v-tab-item>
              <v-tab-item lazy>
              </v-tab-item>
              <v-tab-item lazy>
              </v-tab-item>
              <v-tab-item lazy>
              </v-tab-item>
              <v-tab-item lazy>
              </v-tab-item>
            </v-tabs-items>
          </v-tabs>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>

import AdminNotification from "./AdminNotification";
import PlaceStat from "./PlaceStat";
export default {
  name: "AdminDashboard",
  components: {
    PlaceStat,
    AdminNotification

  },
  data: function() {
    return {
      currentUser: this.$store.getters.user,
      profilePic: null,
      tabItems: [
        {
          text: "Bookmarks"
        },
        {
          text: "Reviews Shared"
        },
        {
          text: "Followers"
        },
        {
          text: "Following"
        },
        {
          text: "Manage"
        }
      ]
    };
  },
  created() {
  },
  mounted() {}
};
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,600,700);

.welcome {
  font-family: "Roboto", sans-serif;
  font-weight: 800;
  line-height: 3vh;
  font-size: 3vh;
  color: white;
}

.homebanner span {
  letter-spacing: 1px;
  font-size: 15px;
  font-weight: 400;
}
.homebanner h2 {
  font-family: "Roboto", sans-serif;
  line-height: 45px;
  letter-spacing: 1px;
  font-weight: 400;
}

.nestedScroll {
  overflow: auto;
  height: 300px;
  display: block;
}
</style>
