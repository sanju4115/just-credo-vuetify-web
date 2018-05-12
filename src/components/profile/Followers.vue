<template>
  <v-card flat class="elevation-24" height="600">
    <v-container>
      <v-layout style="width: 100%" v-if="loading">
        <v-flex xs12 class="text-xs-center">
          <v-progress-circular
            indeterminate
            class="accent--text"
            :width="3"
            :size="30"
          ></v-progress-circular>
        </v-flex>
      </v-layout>
      <v-layout row wrap v-else>
        <v-flex xs12 pa-2 v-for="follower in followers" :key="follower.followerUid">
          <v-card hover width="100%">
            <FeedUserHeader :uid="follower.followerUid"></FeedUserHeader>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import db from "../firebaseInit";
import FeedUserHeader from "../dashboard/FeedUserHeader";
export default {
  name: "Followers",
  components: { FeedUserHeader },
  data: function() {
    return {
      loading: true,
      followers: []
    };
  },
  created() {
    db
      .collection("follow")
      .where("followingUid", "==", this.$store.getters.user.uid)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(doc.data());
          this.followers.push(doc.data());
          this.loading = false;
        });
      })
      .catch(error => {
        this.loading = false;
        console.log("Error getting documents: ", error);
        this.$router.push(`/error?error=${error}`);
      });
  },
  methods: {}
};
</script>

<style scoped>
</style>
