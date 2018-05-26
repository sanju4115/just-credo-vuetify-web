<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 v-if="model.facilities !== null && model.facilities !== undefined">
        <div class="heading" style="font-weight: bold">Facilities</div>
        <v-container fluid v-bind="{ [`grid-list-xs`]: true }">
          <v-layout row wrap>
            <v-flex
              sm3 xs6
              v-for="(item,i) in Object.keys(model.facilities)" :key="i">
              <TextWithStar icon="star" :text="item"></TextWithStar>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
      <v-flex xs12 mt-5 v-if="model.extracurricular !== null && model.extracurricular !== undefined">
        <div class="heading" style="font-weight: bold">Extracurricular Activities</div>
        <v-container fluid v-bind="{ [`grid-list-xs`]: true }">
          <v-layout row wrap>
            <v-flex
              sm3 xs6
              v-for="(item,i) in Object.keys(model.extracurricular)" :key="i">
              <TextWithStar icon="star" :text="item"></TextWithStar>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import TextWithStar from "../utils/TextWithStar";
  export default {
    name: "FacilityAndExtra",
    components: {TextWithStar},
    data: () => ({
      model: null
    }),
    created(){
      this.model = this.$store.getters.school(this.$route.params.id);
    }
  };
</script>

<style scoped>
  .review div{
    font-family: 'Gudea', sans-serif;
  }

  .review p{
    font-family: 'Magra', sans-serif;
  }
</style>
