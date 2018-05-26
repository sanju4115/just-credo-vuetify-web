<template>
  <v-container>
      <v-layout row wrap>
        <v-flex mb-5 xs12 v-if="model.classes !== null && model.classes !== undefined">
          <div class="heading" style="font-weight: bold">Classes</div>
          <v-container fluid v-bind="{ [`grid-list-xs`]: true }">
            <v-layout row wrap>
              <v-flex
                sm3 xs6
                v-for="(item,i) in Object.keys(model.classes)" :key="i">
                <TextWithStar icon="star" :text="item"></TextWithStar>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
        <v-flex xs12 mb-5 v-if="model.classesType !== null && model.classesType !== undefined">
          <div class="heading" style="font-weight: bold">Classes</div>
          <v-container fluid v-bind="{ [`grid-list-xs`]: true }">
            <v-layout row wrap>
              <v-flex
                sm3 xs6
                v-for="(item,i) in Object.keys(model.classesType)" :key="i">
                <TextWithStar icon="star" :text="item"></TextWithStar>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
        <v-flex xs12 mb-5 v-if="model.singing !== null && model.singing !== undefined">
          <div class="heading" style="font-weight: bold">Singing</div>
          <v-container fluid v-bind="{ [`grid-list-xs`]: true }">
            <v-layout row wrap>
              <v-flex
                sm3 xs6
                v-for="(item,i) in Object.keys(model.singing)" :key="i">
                <TextWithStar icon="star" :text="item"></TextWithStar>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
        <v-flex xs12  mb-5 v-if="model.dancing !== null && model.dancing !== undefined">
          <div class="heading" style="font-weight: bold">Dancing</div>
          <v-container fluid v-bind="{ [`grid-list-xs`]: true }">
            <v-layout row wrap>
              <v-flex
                sm3 xs6
                v-for="(item,i) in Object.keys(model.dancing)" :key="i">
                <TextWithStar icon="star" :text="item"></TextWithStar>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
        <v-flex xs12 mb-5 v-if="model.instruments !== null && model.instruments !== undefined">
          <div class="heading" style="font-weight: bold">Instruments</div>
          <v-container fluid v-bind="{ [`grid-list-xs`]: true }">
            <v-layout row wrap>
              <v-flex
                sm3 xs6
                v-for="(item,i) in Object.keys(model.instruments)" :key="i">
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
  name: "SchoolClasses",
  components: { TextWithStar },
  data: () => ({
    show: false,
    model: null
  }),
  created() {
    this.model = this.$store.getters.school(this.$route.params.id);
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
