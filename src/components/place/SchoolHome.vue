<template>
  <v-card class="grey lighten-3">
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 md8 sm12 class="text-sm-left">
          <v-layout row wrap>
            <v-flex xs12 md12 sm12>
              <v-carousel hide-delimiters dark style="height: 400px">
                <v-carousel-item
                  v-for="(item,i) in Object.values(school.images)"
                  :src="item" :key="i"></v-carousel-item>
              </v-carousel>
            </v-flex>
            <v-flex xs12 md12 sm12 class="mb-3">
              <v-tabs
                light
                color="grey lighten-2"
                show-arrows>
                <v-tabs-slider color="accent"></v-tabs-slider>
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
        </v-flex>
        <v-flex xs12 md4 sm12 id="sponsored" v-scroll="onScroll" class="pl-3">
          <Sponsored :category="category"></Sponsored>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import SchoolDetail from "./SchoolDetail";
import Sponsored from "../place/Sponsored";
export default {
  name: "SchoolHome",
  props: ["id"],
  components: {
    Sponsored,
    "app-school-detail-link": SchoolDetail
  },
  data() {
    return {
      category:{
        key:"primarySchool",
        name:"Popular And Sponsored"
      },
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
  object-fit: cover;
}
</style>
