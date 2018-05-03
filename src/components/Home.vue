<template>
  <v-card class="justify-center grey lighten-3">
    <v-parallax src="/static/images/banners/statonary_banner.jpeg" height="300">
      <v-layout row wrap justify-end>
        <v-flex md7 sm12 class="tilled" style="margin-right: -30px">
          <v-layout align-center fill-height row wrap style="margin-left: 150px;">
            <h3 class="welcome">Welcome to JustCredo</h3>
            <span class="overview-content"><p>We are transforming the way end users and educational institute used to interact with each other by creating a
              digital ecosystem where they can interact with each other directly.</p></span>
            <div class="overview-content" style="margin-right: 30%"><h2>Next Generation Educational Networking</h2></div><br/>
            <a href="#Content" style="text-decoration:none"><v-btn large color="accent" class="mx-0">Start Experience</v-btn></a>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-parallax>
    <v-alert color="background"
             icon="new_releases"
             :value="true" class="mb-0 mt-0 colorPrimaryText--text"
             style="font-weight: bold">
      Browse educational places category wise here. Click on tiles to see more.
    </v-alert>
    <v-layout style="width: 100%" v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular
          indeterminate
          class="accent--text"
          :width="7"
          :size="70"
        ></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout id="Content" row wrap class="justify-center text-xs-center grey lighten-2">
      <v-flex sm3 md2 class="ma-3 mb-5" v-for="category in categories" :key="category.key" >
        <v-card color=""
                class="text-xs-center"
                style="height: 200px;width: 200px;">
          <img :src="category.image" style="height: 100px;width: 100px; margin-top: 20px">
          <v-card-title class="justify-center">
            <div>
              <span class="truncate">{{category.name}}</span><br>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
    <v-container v-for="category in categories" :key="category.key">
      <app-category-link :category=category></app-category-link>
    </v-container>
    <v-dialog persistent v-model="locationView" width="500px">
      <app-location-link
        @closeLocationPopup="locationView = !locationView"
        @locationSaved="buildContent">
      </app-location-link>
    </v-dialog>
  </v-card>
</template>

<script>
import db from "./firebaseInit";
import TopCategoryWise from "./TopCategoryWise";
import PlaceLocation from "./PlaceLocation";
export default {
  name: "home",
  components: {
    "app-category-link": TopCategoryWise,
    "app-location-link": PlaceLocation
  },
  data: function() {
    return {
      loading: true,
      categories: [],
      locationView: true
    };
  },
  methods: {
    buildContent() {
      if (this.categories.length === 0) {
        console.log("categories size " + this.categories.length);
        db
          .collection("categories")
          .get()
          .then(querySnapshot => {
            this.loading = false;
            querySnapshot.forEach(doc => {
              const data = {
                image: doc.data().image,
                key: doc.data().key,
                name: doc.data().name
              };
              this.categories.push(data);
              this.locationView = false;
            });
          })
          .catch(error => {
            this.loading = false;
            console.log("Error getting documents: ", error);
          });
      }
    }
  },
  created: function() {
    const location = this.$store.getters.location;
    if (location) {
      console.log("location called");
      this.buildContent();
      this.locationView = false;
    }
  }
};
</script>

<style scoped>
@import url(http://fonts.googleapis.com/css?family=Roboto:100,300,400,500,600,700);

.welcome {
  font-family: "Roboto", sans-serif;
  font-weight: 100;
  line-height: 48px;
  margin-bottom: 2%;
  font-size: 43px;
}

.overview-content h4 {
  text-transform: uppercase;
  letter-spacing: 1px;
}
.overview-content p {
  font-family: "Roboto", sans-serif;
  font-size: 15px;
  font-weight: 300;
  line-height: 21px;
  letter-spacing: 1px;
}

.truncate {
  white-space: nowrap;
  width: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
  font-weight: bold;
}


.tilled div {
  font-family: "Gudea", sans-serif;
}

.tilled p {
  font-family: "Magra", sans-serif;
}

.tilled {
  position: relative;
  display: inline-block;
  padding: 1em 5em 1em 1em;
  overflow: hidden;
  color: #fff;
}

.tilled:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  -webkit-transform-origin: 100% 0;
  -ms-transform-origin: 100% 0;
  transform-origin: 100% 0;
  -webkit-transform: skew(15deg);
  -ms-transform: skew(15deg);
  transform: skew(15deg);
  z-index: -1;
}
</style>
