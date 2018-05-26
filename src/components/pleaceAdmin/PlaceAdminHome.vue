<template>
  <v-card class="grey lighten-3">
    <v-container class="white" fluid v-if="model">
      <div>
        <h3 class="welcome mt-3 pa-1 mb-1">Admin Dashboard</h3>
        <h3 class="welcome pa-1">{{model.name}}</h3>
      </div>
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
    </v-container>
    <v-container>
      <v-layout style="width: 100%" v-if="loading">
        <v-flex xs12 class="text-xs-center">
          <v-progress-circular
            indeterminate
            class="accent--text"
            :width="3"
            :size="30"
          ></v-progress-circular>
        </v-flex>
      </v-layout>
      <v-layout row wrap v-else>
        <v-flex xs12>
          <v-layout row wrap>
            <v-flex xs12>
              <v-parallax :src="model.coverPic" height="400">
                <v-container>
                  <v-layout row wrap>
                    <v-flex xs12 class="text-xs-right">
                      <v-btn round color="primary" dark>Change Cover</v-btn>
                      <v-btn round color="primary" dark>Deactivate</v-btn>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-parallax>
            </v-flex>
            <v-flex xs12 class="text-sm-left">
              <v-layout row wrap>
                <v-flex xs12 class="mb-3">
                  <v-tabs
                    dark
                    color="indicatorColor"
                    show-arrows>
                    <v-tabs-slider color="white"></v-tabs-slider>
                    <v-tab
                      v-for="item in tabItems" :to="{name:item.link}">
                      {{ item.text }}
                    </v-tab>
                  </v-tabs>
                  <router-view :key="$route.fullPath"></router-view>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import PlaceStat from "../admin/PlaceStat";
import db from "../firebaseInit";

export default {
  name: "PlaceAdminHome",
  components: {
    PlaceStat
  },
  data() {
    return {
      loading: true,
      model:null,
      tabItems: [
        { text: "Timeline", link: "SchoolAdminTimeline" },
        { text: "Classes", link: "SchoolClasses" },
        { text: "Facilities", link: "FacilityAndExtra" },
        { text: "Gallery", link: "SchoolGallery" },
        { text: "Blogs", link: "SchoolGallery" },
        { text: "Reviews", link: "SchoolGallery" },
        { text: "Contact", link: "SchoolGallery" }
      ]
    };
  },
  methods: {
    findSchool(id) {
      const school = this.$store.getters.school(id);
      if (school === undefined || school === null) {
        this.$store
          .dispatch("findSchool", { id: id }) //find and storing school to the store
          .then(
            response => {
              this.model = response.data;
              this.loading = false;
            },
            error => {
              this.loading = false;
              this.$router.push(`/error?error=${error}`);
            }
          );
      } else {
        this.model = school;
        this.loading = false;
      }
    }
  },
  created() {
    const id = this.$route.params.id;
    this.findSchool(id);
  }
};
</script>

<style scoped>
.nestedScroll {
  overflow: auto;
  height: 1000px;
  display: block;
}

.welcome {
  font-family: "Roboto", sans-serif;
  font-weight: 800;
  line-height: 3vh;
  font-size: 3vh;
  color: black;
}
</style>
