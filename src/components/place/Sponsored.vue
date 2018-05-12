<template>
  <v-container fluid grid-list-sm class="justify-center">
    <v-subheader style="height: 40px"
                 class="light-green darken-1 background--text"
                 v-if="heading" >{{category.name}}</v-subheader>
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
    <v-layout row wrap>
      <v-flex style="cursor: pointer;" sm3 md6 v-for="school in schools" :key="school.key" @click="onClickSchool(school.key)">
        <School :school="school"></School>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12>
        <v-card>
          <v-list two-line>
            <template v-for="(item, index) in items">
              <v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>
              <v-divider v-else-if="item.divider" :inset="item.inset" :key="index"></v-divider>
              <v-list-tile avatar v-else :key="item.title" @click="">
                <v-list-tile-avatar>
                  <img :src="item.avatar">
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title v-html="item.title"></v-list-tile-title>
                  <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import db from "../firebaseInit";
import School from "./School";
export default {
  name: "Sponsored",
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
      schoolsForStoring: [],
      items: [
        { header: 'Nearby' },
        { avatar: '/static/doc-images/lists/1.jpg', title: 'Brunch this weekend?', subtitle: "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?" },
        { divider: true, inset: true },
        { avatar: '/static/doc-images/lists/2.jpg', title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>', subtitle: "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend." },
        { divider: true, inset: true },
        { avatar: '/static/doc-images/lists/3.jpg', title: 'Oui oui', subtitle: "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?" }
      ]
    };
  },
  created() {
    const placeType = "placeType" + "." + this.category.key;
    db
      .collection("schools")
      .where("published","==",true)
      .where(placeType, "==", true)
      .where("location.geohash50", "==", this.$store.getters.location.geohash50)
      .orderBy("rating", "desc")
      .limit(6)
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
