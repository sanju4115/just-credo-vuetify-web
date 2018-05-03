<template>
    <v-layout row wrap v-if="location">
      <v-flex xs12>
        <v-text-field
          label="Formatted Address"
          light
          v-model="location.formatted_address"></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field
          label="Sub-Locality"
          disabled
          v-model="location.sublocality_level_2"></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field
          label="Locality"
          disabled
          v-model="location.sublocality_level_1"></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field
          label="City"
          disabled
          v-model="location.locality"></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field
          label="State"
          disabled
          v-model="location.administrative_area_level_1"></v-text-field>
      </v-flex>

      <v-flex xs6>
        <v-text-field
          label="Country"
          disabled
          v-model="location.country"></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field
          label="Postal Code"
          disabled
          v-model="location.postal_code"></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field
          label="Longitude"
          disabled
          v-model="location.longitude"></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field
          label="Latitude"
          disabled
          v-model="location.latitude"></v-text-field>
      </v-flex>
    </v-layout>
</template>

<script>
export default {
  name: "Address",
  props: ["location"]
};
</script>

<style scoped>
</style>
