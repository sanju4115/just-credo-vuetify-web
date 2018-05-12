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
      <v-layout row wrap v-if="!loading && !messageDisplay">
        <v-flex style="cursor: pointer;" xs6 sm3 v-for="bookmark in bookmarks" :key="bookmark.placeId" @click="onClickSchool(bookmark.placeId)">
          <SchoolDynamic :schoolId="bookmark.placeId"></SchoolDynamic>
        </v-flex>
      </v-layout>
      <v-layout row wrap v-if="messageDisplay" class="align-center">
        <v-flex xs12>
          <Message message="You have not bookmarked any place yet."></Message>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import db from "../firebaseInit";
import SchoolDynamic from "../place/SchoolDynamic";
import Message from "../utils/Message";

export default {
  name: "Bookmarks",
  components: {Message, SchoolDynamic },
  props: ["currentUser"],
  data: function() {
    return {
      loading: true,
      bookmarks: [],
      schoolsForStoring: [],
      messageDisplay:false
    };
  },
  created() {
    db
      .collection("bookmark")
      .where("userUid", "==", this.currentUser.uid)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.size === 0){
          this.messageDisplay = true;
        }
        querySnapshot.forEach(doc => {
          this.bookmarks.push(doc.data());
        });
        this.loading = false;
      })
      .catch(error => {
        this.loading = false;
        console.log("Error getting documents: ", error);
        this.$router.push(`/error?error=${error}`);
      });
  },
  methods: {
    onClickSchool(id) {
      this.$router.push("/place/schoolHome/" + id);
    }
  }
};
</script>

<style scoped>
</style>
