<template>
  <v-card color="blue" hover class="white--text">
    <v-card-title primary-title>
      <v-layout row wrap>
        <v-flex xs12>
          <span class="pa-2">
            <v-icon x-large dark>insert_chart</v-icon>
            <span style="font-weight: 500;font-size: 2.4vh;padding-top: 15px">1,256,134</span>
          </span>
        </v-flex>
        <v-flex xs12>
          <div class="subheading pl-2">Registered Education Place</div>
        </v-flex>
      </v-layout>
    </v-card-title>
  </v-card>
</template>

<script>
  import db from "../firebaseInit";
  export default {
  name: "PlaceStat",
  data: function() {
    return {
      totalCount: 0,
    };
  },
  created(){
    db.collection("schools")
      .onSnapshot(function(querySnapshot) {
        this.totalCount = querySnapshot.size;
      });
  }
};
</script>

<style scoped>
</style>
