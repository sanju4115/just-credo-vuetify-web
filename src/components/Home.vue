<template>
  <v-card class="justify-center grey lighten-3">
    <v-parallax src="static/images/banners/Newzeland-Students.jpg"
                height="400">
      <div class="homebanner">
        <v-layout row wrap fill-height align-center class="pa-5 text-xs-center text-md-left text-sm-left">
          <v-flex xs12>
            <v-layout align-center fill-height row wrap class="pa-5">
              <v-flex xs12 md10 sm10><h3 class="welcome">Explore Educational Place Here !</h3></v-flex>
              <v-flex xs12>
                <div><h2>Next Generation Educational Networking</h2></div><br/>
                  <v-btn
                    @click="scrollFunc()"
                    large
                    color="primary"
                    class="mx-0">Start Experience</v-btn>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </div>
    </v-parallax>
    <v-card id="Content" class="secondary">
      <v-card-title primary-title class="text-xs-center primary colorPrimaryText--text">
        <v-container justify-center>
          <v-layout row wrap>
            <v-flex xs12>
              <h3 class="headline mb-0" style="font-weight: bold">Browse Educational Places Category Wise</h3>
            </v-flex>
            <v-flex xs12>
              <div style="font-size: 2vh">Click on tiles to see more</div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-title>
    </v-card>
    <v-card class="grey lighten-3 pb-5">
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
      <v-layout row wrap class="justify-center text-xs-center">
        <v-flex xs6 sm4 md2 class="ma-3 mb-3 mt-3" v-for="category in categories" :key="category.key" >
          <v-card hover
                  class="text-xs-center background--text elevation-24"
                  style="height: 25vh;width: 25vh;">
            <img :src="category.image" style="height: 15vh;width: 15vh; margin-top: 2vh">
            <v-card-title class="justify-center">
              <div>
                <span class="truncate">{{category.name}}</span><br>
              </div>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
    </v-card>

    <v-card class="justify-center" fluid>
      <v-layout row wrap class="justify-center">
        <v-flex xs12 class="pa-5">
          <v-card dark class="transparent featureBox background--text elevation-24">
            <img
              src="/static/images/banners/collage1.jpg" style="width: 100%">
          </v-card>
        </v-flex>
        <v-flex xs12 mt-3>
          <v-card class="transparent elevation-24 mb-5">
            <v-card-title class="justify-center">
              <div align="center" class="mt-5">
                <h2 class="section-title">Showing Top <span>Educational Places</span> Below</h2>
                <p class="section-intro">
                  Based On Rating, Popularity And Search Location
                </p>
              </div>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
      <v-container v-for="category in categories" :key="category.key">
        <app-category-link :category=category></app-category-link>
      </v-container>
    </v-card>
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
    scrollFunc :function(){
      this.$SmoothScroll(document.getElementById('Content'));
    },
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
            console.log("Home.vue build content Error getting documents: ", error);
          });
      }
    }
  },
  mounted() {
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
@import url(https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,600,700);

.homebanner{
  overflow: hidden;
  position: relative;
  width:120%;
  margin-right:-60px;
  margin-left:-30px;
  height: 120%;
  background: rgba(0, 0, 0, 0.3);
}

.welcome {
  font-family: "Roboto", sans-serif;
  font-weight: 800;
  line-height: 48px;
  margin-bottom: 2%;
  font-size: 43px;
  /*position: relative;*/
  /*white-space: nowrap;*/
  /*animation: floatText 1s alternate ease-in-out;*/
}

.welcomeP{
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  line-height: 48px;
  margin-bottom: 2%;
  font-size: 35px;
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

@-webkit-keyframes floatText{
  from {
    left: -100%;
  }

  to {
    /* left: auto; */
    left: 00%;
  }
}

.slanted {
  clip-path: polygon(0 0, 1600px 0, 1600px 75%, 0 100%);
}

.truncate {
  white-space: nowrap;
  width: 5vh;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 2vh;
  font-weight: bold;
}


.tilled div {
  font-family: "Gudea", sans-serif;
}

.tilled p {
  font-family: "Magra", sans-serif;
}

.section-title {
  margin-top: 0;
  letter-spacing: 2px;
  font-weight: 100;
  font-size: 3vh;
}
.section-title span {
  font-weight: 400;
}
.section-intro {
  margin: 1vh 8vh 5vh 5vh;
  font-size: 3vh;
  line-height: 5vh;
  font-weight: 400;
  letter-spacing: 0.1vh;
  font-family: Agency FB, sans-serif;
  color: #6d6e71;
}

.hidden{
  opacity:0;
}
.visible{
  opacity:1;
}
</style>
