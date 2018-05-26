<template>

    <v-container fluid grid-list-sm>
      <v-layout row wrap>
        <v-flex xs4 v-for="(image,index) in Object.values(model.images)" :key="index" @click.stop="openCarousel(index)">
          <v-card flat tile>
            <v-card-media
              :src="image"
              height="150px">
            </v-card-media>
          </v-card>
        </v-flex>
      </v-layout>
      <v-dialog v-model="carouselDialogue" max-width="800px">
        <v-card>
          <v-card-title>
            Browse images here !
          </v-card-title>
          <ImageCarousel :images="images" :value="imageIndex"></ImageCarousel>
          <v-card-actions>
            <v-btn color="accent" flat @click.stop="carouselDialogue=false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>

</template>

<script>
import ImageCarousel from "../utils/ImageCarousel";

export default {
  name: "Gallery",
  components: { ImageCarousel },
  data: () => ({
    show: false,
    imageIndex: 0,
    carouselDialogue: false,
    model: null
  }),
  created(){
    this.model = this.$store.getters.school(this.$route.params.id);;
  },
  methods: {
    openCarousel(index) {
      this.imageIndex = index;
      this.carouselDialogue = true;
    }
  }
};
</script>

<style scoped>
.review div {
  font-family: "Gudea", sans-serif;
}

.review p {
  font-family: "Magra", sans-serif;
}
</style>
