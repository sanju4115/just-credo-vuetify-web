<template>
  <v-card hover color="background white--text" class="ma-1">
    <v-card-media
      style="height: 150px;"
      :src="school.coverPic"></v-card-media>
    <v-card-title primary-title>
      <div class="truncate colorPrimaryText--text">
        <span>{{school.name}}</span><br>
        <span class="colorSecondaryText--text" style="color: black">{{school.location.formatted_address}}</span>
      </div>
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  name: "School",
  props: ["school"]
};
</script>

<style scoped>
  .truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 12px;
    font-weight: bold;
  }
</style>
