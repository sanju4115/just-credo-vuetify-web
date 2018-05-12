<template>
  <v-card class="justify-center grey lighten-3">
    <v-parallax src="static/images/banners/child_school_banner.jpg"
                height="550" style="margin-top: -64px" class=" secondary">
      <div class="homebanner">
        <v-layout row wrap fill-height align-center class="pa-5 text-xs-center text-md-left text-sm-left">
          <v-flex xs12>
            <v-layout align-center fill-height row wrap class="pa-5">
              <v-flex xs12 md10 sm10><h3 class="welcome">Explore Educational Place Here !</h3></v-flex>
              <v-flex xs12 md8 sm8>
                <span><p>We are transforming the way end users and educational institute used
                   <br/>to interact with each other by creating a
              digital ecosystem where they can interact with each other directly.</p></span>
              </v-flex>
              <v-flex xs12>
                <div><h2>Next Generation Educational Networking</h2></div><br/>
                  <v-btn
                    @click="scrollFunc()"
                    large
                    color="accent"
                    class="mx-0">Start Experience</v-btn>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </div>
    </v-parallax>
    <v-card id="Content" class="secondary">
      <v-card-title primary-title class="text-xs-center background--text">
        <v-container justify-center>
          <v-layout row wrap>
            <v-flex xs12>
              <h3 class="headline mb-0" style="font-weight: bold">Browse Educational Places Category Wise</h3>
            </v-flex>
            <v-flex xs12>
              <div>Click on tiles to see more</div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-title>
    </v-card>
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
    <v-layout row wrap class="justify-center text-xs-center background">
      <v-flex sm3 md2 class="ma-3 mb-5 mt-5" v-for="category in categories" :key="category.key" >
        <v-card color="secondary" hover
                class="text-xs-center background--text"
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
@import url(https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,600,700);

.homebanner{
  overflow: hidden;
  position: relative;
  width:120%;
  margin-right:-60px;
  margin-left:-30px;
  height: 120%;
  background: rgba(0, 0, 0, 0.4);
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

</style>
