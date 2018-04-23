<template>
  <v-card class="justify-center" color="">
    <v-jumbotron color="secondary darken-4">
      <v-container fill-height>
        <v-layout align-center>
          <v-flex white--text>
            <h3 class="display-3 welcome">Welcome to JustCredo</h3>
            <span class="overview-content"><p>It is transforming the way end users and educational institute used to interact with each other by creating a
              digital ecosystem where they can interact with each other directly.</p></span>
            <v-divider class="my-3"></v-divider>
            <div class="overview-content"><h2>Next Generation Educational Networking</h2></div>
            <a href="#Content"><v-btn large color="primary" class="mx-0">Start Experience</v-btn></a>
          </v-flex>
        </v-layout>
      </v-container>
    </v-jumbotron>

    <v-alert color="success" icon="new_releases" :value="true" >
      Browse education places category wise here. Click on tiles to see more.
    </v-alert>

    <v-container fill-height class="justify-center">
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
      <v-layout id="Content" row wrap class="justify-center text-xs-center">
        <v-flex sm3 md2 class="ma-3" v-for="category in categories" :key="category.key" >
          <v-card color="primary white--text elevation-10" class="text-xs-center" style="height: 200px;width: 200px;">
            <img :src="category.image" style="height: 100px;width: 100px; margin-top: 20px">
            <v-card-title class="justify-center">
              <div>
                <span class="truncate">{{category.name}}</span><br>
              </div>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
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
      locationView:true
    };
  },
  methods: {
    buildContent() {
      if (this.categories.length ===0) {
        console.log("categories size "+this.categories.length)
        db.collection("categories")
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
              this.locationView=false;
            });
          })
          .catch(error => {
            this.loading = false;
            console.log("Error getting documents: ", error);
          });
      }
    }
  },
  created: function () {
    const location = this.$store.getters.location;
    if (location) {
      console.log("location called")
      this.buildContent();
      this.locationView=false;
    }
  }
};
</script>

<style scoped>
  @import url(http://fonts.googleapis.com/css?family=Roboto:100,300,400,500,600,700);

  .welcome{
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
    padding-right: 12%;
  }

  .truncate {
  white-space: nowrap;
  width: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
  font-weight: bold;
}
</style>
