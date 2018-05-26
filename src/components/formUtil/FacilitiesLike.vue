<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12>
        <v-select
          v-model="var_specialFacilitiesSelected"
          label="Select special facilities or create a new ones"
          chips
          tags
          :items="specialFacilities.map(value => value.name)"
        ></v-select>
      </v-flex>
      <v-flex xs12>
        <v-select
          v-model="var_facilitiesSelected"
          label="Select general facilities or create a new ones"
          chips
          tags
          :items="facilities.map(value => value.name)"
        ></v-select>
      </v-flex>
      <v-flex xs12>
        <v-select
          v-model="var_extracurricularSelected"
          label="Select extracurricular activities or create a new ones"
          chips
          tags
          :items="extracurricular.map(value => value.name)"
        ></v-select>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "FacilitiesLike",
  props: {
    specialFacilitiesSelected: {
      type: Array,
      required: true
    },
    facilitiesSelected: {
      type: Array,
      required: true
    },
    extracurricularSelected: {
      type: Array,
      required: true
    },
    specialFacilities: {
      type: Array,
      required: true
    },
    facilities: {
      type: Array,
      required: true
    },
    extracurricular: {
      type: Array,
      required: true
    },
  },
  data() {
    return {
      var_specialFacilitiesSelected: this.specialFacilitiesSelected,
      var_facilitiesSelected: this.facilitiesSelected,
      var_extracurricularSelected: this.extracurricularSelected
    };
  },
  watch: {
    var_specialFacilitiesSelected(val) {
      this.$emit("change-specialFacilitiesSelected", val);
    },
    var_facilitiesSelected(val) {
      this.$emit("change-facilitiesSelected", val);
    },
    var_extracurricularSelected(val) {
      this.$emit("change-extracurricularSelected", val);
    }
  }
};
</script>

<style scoped>
</style>
