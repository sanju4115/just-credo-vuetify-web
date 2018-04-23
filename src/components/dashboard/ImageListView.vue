<template>
  <v-container fluid grid-list-sm>
    <v-layout row wrap>
      <v-flex xs4 v-for="i in size" :key="i" :class="{container:i===6}" @click.stop="openCarousel(i-1)">
        <img class="image" :src="images[i-1]" width="100%" height="100%">
        <div class="content justify-center" v-if="i===6 && images.length > 6">
          <p>{{images.length - 6}} more images</p>
        </div>
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
  name: "ImageListView",
  components: {ImageCarousel },
  props: ["images"],
  data: () => ({
    size: 0,
    imageIndex:0,
    carouselDialogue:false
  }),
  created: function() {
    if (this.images != null) {
      if (this.images.length > 6) {
        this.size = 6;
      }else {
        this.size = this.images.length;
      }
    }
  },
  methods: {
    openCarousel(index){
      this.imageIndex = index;
      this.carouselDialogue = true;
    }
  },
  computed: {
  }
};
</script>

<style scoped>
  .container {
    position: relative;
    max-width: 800px;
    margin: 0 auto;

  }

  .container img {vertical-align: middle;}

  .container .content {
    position: absolute;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8); /* Black background with transparency */
    color: #f1f1f1;
    width: 94%;
    text-align: center;
    padding: 5px;
    margin-bottom: 5px;
    margin-right: 5px;
  }
</style>
