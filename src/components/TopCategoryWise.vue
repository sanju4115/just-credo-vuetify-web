<template>
  <v-container fluid grid-list-sm class="justify-center">
    <v-subheader class="colorPrimaryText--text subheading" v-if="heading" >Top {{category.name}}</v-subheader>
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
    <v-layout row wrap>
      <v-flex style="cursor: pointer;" sm4 md3 v-for="school in schools" :key="school.key" @click="onClickSchool(school.key)">
        <v-card color="background white--text elevation-24" class="ma-1">
          <v-card-media
            height="125px"
            :src="school.image">
          </v-card-media>
          <v-card-title primary-title>
            <div class="truncate colorPrimaryText--text">
              <span>{{school.name}}</span><br>
              <span class="colorSecondaryText--text" style="color: black">{{school.address}}</span>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import db from "./firebaseInit";
export default {
  name: "TopCategoryWise",
  props: {
    category: {
      type: Object,
      required: true
    }
  },
  data: function() {
    return {
      heading: false,
      loading: true,
      schools: [],
      schoolsForStoring: []
    };
  },
  created() {
    const placeType = "placeType" + "." + this.category.key;
    db
      .collection("schools")
      .where(placeType, "==", true)
      .where("geoHash.geohash50", "==", this.$store.getters.location.geohash50)
      .orderBy("rating", "desc")
      .limit(10)
      .get()
      .then(querySnapshot => {
        this.loading = false;
        querySnapshot.forEach(doc => {
          this.heading = true;
          let images = doc.data().images;
          if (images !== undefined && images != null) {
            images = Object.values(images)[0];
          }
          const data = {
            image: images,
            key: doc.data().id,
            name: doc.data().name,
            address: Object.values(doc.data().address).join()
          };
          this.schoolsForStoring.push(doc.data());
          this.schools.push(data);
        });
        this.$store.dispatch("storeSchools", { data: this.schoolsForStoring }); //storing to the store to use in future
      })
      .catch(error => {
        this.loading = false;
        console.log("Error getting documents: ", error);
      });
  },
  methods: {
    onClickSchool(id) {
      this.$router.push("/place/schoolHome/" + id);
    }
  }
};
</script>

<style scoped>
.truncate {
  white-space: nowrap;
  width: 175px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
  font-weight: bold;
}
</style>
