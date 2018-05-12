<template>
  <v-container fluid grid-list-sm class="justify-center">
    <v-subheader
      class="background--text subheading accent mb-5" style="width: fit-content"
      v-if="heading" >Top {{category.name}} <v-icon dark class="ml-2">keyboard_arrow_right</v-icon></v-subheader>
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
      <v-flex style="cursor: pointer;" xs6 sm4 md3 v-for="school in schools" :key="school.key" @click="onClickSchool(school.key)">
        <School :school="school"></School>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import db from "./firebaseInit";
import School from "./place/School";
export default {
  name: "TopCategoryWise",
  components: {School},
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
    db.collection("schools")
      .where("published","==",true)
      .where(placeType, "==", true)
      .where("location.geohash50", "==", this.$store.getters.location.geohash50)
      .orderBy("rating", "desc")
      .limit(10)
      .get()
      .then(querySnapshot => {
        this.loading = false;
        querySnapshot.forEach(doc => {
          this.heading = true;
          const school = doc.data();
          if (school.coverPic === undefined || school.coverPic === null) {
            if (school.images !== undefined && school.images !== null){
              school["coverPic"] = Object.values(school.images)[0];
            }
          }
          this.schools.push(school);
          this.schoolsForStoring.push(doc.data());
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

</style>
