<template>
  <v-card class="grey lighten-3">
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 md8 sm12 class="text-sm-left">
          <v-layout row wrap>
            <v-flex xs12 md12 sm12 class="mb-3">
              <v-tabs
                dark
                color="indicatorColor"
                show-arrows>
                <v-tabs-slider color="white"></v-tabs-slider>
                <v-tab
                  v-for="item in tabItems" :to="{name:item.link}">
                  {{ item.text }}
                </v-tab>
              </v-tabs>
              <router-view :key="$route.fullPath" class="nestedScroll white"></router-view>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12 md4 sm12 id="sponsored" class="pl-3">
          <Sponsored :category="category"></Sponsored>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import SchoolDetail from "./SchoolDetail";
import Sponsored from "../place/Sponsored";
import SchoolClasses from "./SchoolClasses";
import FacilityAndExtra from "./FacilityAndExtra";
import Gallery from "./Gallery";
export default {
  name: "SchoolHome",
  props: ["id"],
  components: {
    Gallery,
    FacilityAndExtra,
    SchoolClasses,
    Sponsored,
    "app-school-detail-link": SchoolDetail
  },
  data() {
    return {
      category:{
        key:"primarySchool",
        name:"Popular And Sponsored"
      },
      tabItems:[{text: "Details", link:"SchoolDetail"},
        {text: "Classes", link:"SchoolClasses"},
        {text: "Facilities", link:"FacilityAndExtra"},
        {text: "Gallery", link:"SchoolGallery"},
        {text: "Blogs", link:"SchoolGallery"},
        {text: "Reviews", link:"SchoolGallery"},
        {text: "Contact", link:"SchoolGallery"}],
    };
  },
  created() {

  },
  computed: {
  }
};
</script>

<style scoped>
.content {
  width: 100%;
  text-align: center;
  overflow: hidden;
}

img {
  position: relative;
  left: 100%;
  margin-left: -200%;
  object-fit: cover;
}

.nestedScroll {
  overflow: auto;
  height: 1000px;
  display: block;
}
</style>
