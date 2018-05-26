<template>
  <v-card class="ma-2 elevation-0">
    <v-card-text>
      <v-text-field
        label="Legal Educational Place Name"
        v-model="var_schoolName"
        :rules="[() => var_schoolName.length > 0 || 'This field is required']"
        required></v-text-field>
      <v-text-field
        label="Legal Email"
        v-model="var_email"
        required
        :rules="[() => var_email.trim().length > 0 || 'This field is required']"></v-text-field>
      <v-text-field
        label="Legal Website"
        persistent-hint
        v-model="var_website"></v-text-field>
      <v-text-field
        label="Legal Mobile/Phone*"
        persistent-hint
        v-model="var_mobile"
        required
        :rules="[() => var_mobile.trim().length > 0 || 'This field is required']"></v-text-field>
      <v-layout row>
        <v-flex xs12>
          <v-text-field
            name="input-1"
            v-model="var_description"
            label="Description"
            textarea
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "Description",
  props: {
    schoolName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    mobile: {
      type: String,
      required: true
    },
    website: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      var_schoolName: this.schoolName,
      var_email: this.email,
      var_mobile: this.mobile,
      var_website: this.website,
      var_description: this.description
    };
  },
  watch: {
    var_schoolName(val) {
      this.$emit("change-schoolName", val);
    },
    var_email(val) {
      this.$emit("change-email", val);
    },
    var_mobile(val) {
      this.$emit("change-mobile", val);
    },
    var_website(val) {
      this.$emit("change-website", val);
    },
    var_description(val) {
      this.$emit("change-description", val);
    }
  }
};
</script>

<style scoped>
</style>
