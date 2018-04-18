<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 md12 sm12 class="text-xs-center text-sm-right content">
        <v-carousel>
          <v-carousel-item style="" v-for="(item,i) in Object.values(school.images)" :src="item" :key="i"></v-carousel-item>
        </v-carousel>
      </v-flex>
      <v-flex xs12 md12 sm12>
        <v-tabs
          dark
          color="primary"
          show-arrows>
          <v-tabs-slider color="white"></v-tabs-slider>
          <v-tab
            v-for="item in tabItems">
            {{ item.text }}
          </v-tab>
          <v-tabs-items>
            <v-tab-item>
              <app-school-detail-link :model="school"></app-school-detail-link>
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import SchoolDetail from "./SchoolDetail";
export default {
  name: "SchoolHome",
  props: ["id"],
  components: {
    "app-school-detail-link": SchoolDetail
  },
  data() {
    return {
      tabItems:[
        {
          text: "Details"
        },
        {
          text: "Classes"
        },
        {
          text: "Facilities"
        },
        {
          text: "Gallery"
        },
        {
          text: "Blogs"
        },
        {
          text: "Reviews"
        },
        {
          text: "Contact"
        }
      ]
    };
  },
  created() {
    const school = this.$store.getters.school(this.id);
    if (school === undefined || school === null) {
      // noinspection JSIgnoredPromiseFromCall
      this.$store.dispatch("findSchool", { id: this.id }); //find and storing school to the store
    }
  },
  computed: {
    school() {
      return this.$store.getters.school(this.id);
    }
  }
};
</script>

<style scoped>
.content {
  width: 100%; /* or whatever is required */
  text-align: center; /* ensures the image is always in the h-middle */
  overflow: hidden; /* hide the cropped portion */
}

img {
  position: relative; /* allows repositioning */
  left: 100%; /* move the whole width of the image to the right */
  margin-left: -200%; /* magic! */
}
</style>
