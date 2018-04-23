<template>
  <v-carousel :value="selectedIndex">
    <v-carousel-item v-for="(image,i) in images" :src="image" :key="i"></v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  name: "ImageCarousel",
  props: ["images","value"],
  computed:{
    selectedIndex(){
      return this.value;
    }
  }
};
</script>

<style scoped>
</style>
