<template>
  <div>
      <p v-for="review in reviews">review.review</p>
  </div>
</template>

<script>
  export default {
    name: "Feed",
    methods:{
      loadReview(){
        this.$store.dispatch("storeReviews", { data: null });
      }
    },
    computed:{
      reviews(){
        return this.$store.getters.loadedReview;
      }
    }
  }
</script>

<style scoped>

</style>
