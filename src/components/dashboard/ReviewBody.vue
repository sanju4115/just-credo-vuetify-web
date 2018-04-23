<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex d-flex xs1 sm1 md1>
        <v-chip label color="accent" text-color="white" disabled>
          <span class="mr-2">Rated</span>{{review.rating}} <v-icon center small>star</v-icon>
        </v-chip>
      </v-flex>
      <v-flex d-flex xs10 sm10 md10 class="justify-end">
        {{timeOfReview}} ago
      </v-flex>
      <v-flex xs12 sm12 md12>
        <p>{{review.review}}</p>
      </v-flex>
      <v-flex xs12 sm12 md12>
        <ImageListView :images="review.imagesList"></ImageListView>
      </v-flex>
      <v-flex xs12 sm6 class="py-2" v-if="loadingComment || loadingComment">
        <v-progress-circular class="ml-3" indeterminate color="accent" :size="20" :width="2"></v-progress-circular>
      </v-flex>
      <v-flex xs12 sm6 class="py-2" v-else>
        <p>Likes &amp; Comments</p>
        <v-chip label color="grey lighten-3" text-color="colorSecondaryText" disabled>
          <span class="mr-2">{{likesNum}} </span><v-icon center small>thumb_up</v-icon>
        </v-chip>
        <v-chip label color="grey lighten-3" text-color="colorSecondaryText" disabled>
          <span class="mr-2">{{commentsNum}}</span> <v-icon center small>comment</v-icon>
        </v-chip>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import TImeUtil from "../../utils/TImeUtil";
import ImageListView from "./ImageListView";
import db from "../../components/firebaseInit";
export default {
  name: "ReviewBody",
  components: {ImageListView},
  props: ["review"],
  data: () => ({
    icon: 'justify',
    likesNum:0,
    commentsNum:0,
    loadingComment:true,
    loadingLikes:true
  }),
  created: function() {
    db.collection("reviewLikes")
      .doc(this.review.id)
      .onSnapshot({}, doc => {
        if (doc.exists) {
          const map = Object.keys(doc.data());
          this.likesNum = map.length;
        } else {
          this.likesNum = 0;
        }
        this.loadingLikes = false;
      });

    db.collection("reviewComments")
      .where("reviewId","==",this.review.id)
      .onSnapshot(querySnapshot => {
        this.commentsNum = querySnapshot.docs.length;
        this.loadingComment = false;
      });
  },
  methods: {
  },
  computed: {
    timeOfReview(){
      return TImeUtil.timeDifference(this.review.timestamp,this.review.time)
    }
  }
};
</script>

<style scoped>
</style>
