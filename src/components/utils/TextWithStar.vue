<template>
  <v-layout>
    <v-flex xs2>
      <v-icon color="cyan darken-3">{{icon}}</v-icon>
    </v-flex>
    <v-flex xs10>
      <span>{{text}}</span>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "TextWithStar",
  props: {
    icon: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
</style>
