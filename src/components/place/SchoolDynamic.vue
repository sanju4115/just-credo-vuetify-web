<template>
  <v-layout fill-height justify-center align-center>
    <v-card hover color="background white--text" class="ma-1" v-if="school">
      <v-card-media
      height="125px"
      :src="school.coverPic">
      </v-card-media>
      <v-card-title primary-title>
        <div class="truncate colorPrimaryText--text">
          <span>{{school.name}}</span><br>
          <span class="colorSecondaryText--text" style="color: black">{{school.location.formatted_address}}</span>
        </div>
      </v-card-title>
    </v-card>
    <v-card class="elevation-0" v-else-if="loading">
      <v-progress-circular indeterminate color="green"></v-progress-circular>
    </v-card>
  </v-layout>
</template>

<script>
  export default {
    name: "SchoolDynamic",
    props: ["schoolId"],
    data: function() {
      return {
        loading: true,
        school: null
      };
    },
    created(){
      const school = this.$store.getters.school(this.schoolId);
      if (school === undefined || school === null) {
        this.$store.dispatch("findSchool", { id: this.schoolId }) //find and storing school to the store
          .then(response => {
            if (response.data.coverPic === undefined || response.data.coverPic === null) {
              if (response.data.images !== undefined && response.data.images !== null){
                response.data.coverPic = Object.values(response.data.images)[0];
              }
            }
            this.school = response.data;
            this.loading = false;
          }, error => {
            this.loading = false;
            console.error(error);
            //this.$router.push(`/error?error=${error}`);
          });
      }else {
        if (school.coverPic === undefined || school.coverPic === null) {
          if (school.images !== undefined && school.images !== null){
            school.coverPic = Object.values(school.images)[0];
          }
        }
        this.school = school;

      }
    },
    computed: {
    }
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
