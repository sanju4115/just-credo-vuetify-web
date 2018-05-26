<template>
  <v-card flat class="elevation-24" height="600">
    <v-container fluid grid-list-sm class="justify-center">
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
        <v-flex xs6 sm4 md3 v-for="school in schools" :key="school.id" @click="onClickSchool(school.id)">
          <School :school="school"></School>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import db from "../../components/firebaseInit";
import School from "../place/School";
export default {
  name: "Manage",
  components: { School },
  data: function() {
    return {
      heading: false,
      loading: true,
      schools: [],
      schoolsForStoring: []
    };
  },
  created() {
    db.collection("schools")
      .where("userID", "==", this.$store.getters.user.uid)
      .limit(30)
      .get()
      .then(querySnapshot => {
        this.loading = false;
        querySnapshot.forEach(doc => {
          this.heading = true;
          const school = doc.data();
          if (school.coverPic === undefined || school.coverPic === null) {
            if (school.images !== undefined && school.images !== null) {
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
      this.$router.push("/placeAdmin/" + id);
    }
  }
};
</script>

<style scoped>
</style>
