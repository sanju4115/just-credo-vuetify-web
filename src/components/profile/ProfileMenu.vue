<template>
  <div class="text-xs-center" v-if="location">
    <v-menu
      offset-x
      :close-on-content-click="false"
      :nudge-width="200"
      v-model="menu">
      <v-chip slot="activator" color="secondary" text-color="white">
        <v-avatar>
          <v-icon>location_on</v-icon>
        </v-avatar>
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
        <v-layout ml-3>
          <v-radio-group v-model="areaSelected" @change="onAreaChange">
            <span>Select range in which you want to explore?</span>
            <v-radio
              v-for="(area,index) in areas"
              :key="index"
              :label="area.name"
              :value="area.value"
            ></v-radio>
          </v-radio-group>
        </v-layout>
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
    hints: true,
    areaSelected:"geohash50",
    areas:[
      {
        name:"Within 1 kms",
        value:"geohash1"
      },
      {
        name:"Within 5 kms",
        value:"geohash5"
      },
      {
        name:"Within 50 kms",
        value:"geohash50"
      },
      {
        name:"Within 150 kms",
        value:"geohash150"
      },
    ]
  }),
  methods: {
    onLogout() {
      this.$store.dispatch("logout");
    },
    onAreaChange(){
      console.log("changed "+  this.areaSelected);
      this.$store.dispatch("areaChange",{area : this.areaSelected});
    }
  },
  computed: {
    location() {
      return this.$store.getters.location;
    },
    user() {
      return this.$store.getters.user;
    }
  },
  created:function () {
    this.areaSelected = this.$store.getters.areaSelected;
    console.log(this.areaSelected)
  }
};
</script>

<style scoped>
</style>
