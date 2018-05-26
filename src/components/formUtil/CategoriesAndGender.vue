<template>
  <v-layout row wrap class="pa-4">
    <v-flex xs6 sm4 md4>
      <p>Select Type</p>
      <v-checkbox v-for="category in categories"
                  :label="category.name"
                  v-model="var_schoolType"
                  color="accent"
                  hide-details :value="category.name"
      ></v-checkbox>
    </v-flex>
    <v-flex xs6 sm4 md4 class="justify-center">
      <p >Select Gender</p>
      <v-checkbox v-for="gender in genders"
                  :label="gender.name"
                  v-model="var_genderList"
                  color="accent"
                  hide-details :value="gender.name"
      ></v-checkbox>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "CategoriesAndGender",
  props: {
    categories: {
      type: Array,
      required: true
    },
    genders: {
      type: Array,
      required: true
    },
    genderList: {
      type: Array,
      required: true
    },
    schoolType: {
      type: Array,
      required: true
    }
  },
  created() {
      this.var_categories = this.categories;
      this.var_genders = this.genders;
      this.var_genderList = this.genderList;
      this.var_schoolType = this.schoolType;
  },
  data() {
    return {
      var_categories: '',
      var_genders: '',
      var_genderList: '',
      var_schoolType: '',
    };
  },
  watch: {
    var_schoolType(val) {
      this.$emit("change-schoolType", val);
    },
    var_genderList(val) {
      this.$emit("change-genderList", val);
    }
  }
};
</script>

<style scoped>
</style>
