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
        <v-progress-circular
          class="ml-3"
          indeterminate color="accent"
          :size="20" :width="2">
        </v-progress-circular>
      </v-flex>
      <v-flex xs12 sm6 class="py-2" v-else>
        <p>Likes &amp; Comments</p>
        <v-chip label color="background" :text-color="textColorLike" @click="likeOrUnlike">
          <span class="mr-2">{{likesNum}} </span>
          <v-icon :color="likeIconColor" center small style="cursor : pointer">thumb_up</v-icon>
        </v-chip>
        <v-chip label color="background" :text-color="textColorComment">
          <span class="mr-2">{{commentsNum}}</span>
          <v-icon :color="commentIconColor" center small style="cursor : pointer">comment</v-icon>
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
  components: { ImageListView },
  props: ["review"],
  data: () => ({
    icon: "justify",
    likesNum: 0,
    commentsNum: 0,
    loadingComment: true,
    loadingLikes: true,
    likeSubscription: null,
    commentSubscription: null,
    isUserLiked: false,
    isUserCommented: false,
    currentUser: null,
    textColorLike: "colorSecondaryText", // default values
    likeIconColor: "secondaryIcon",
    textColorComment: "colorSecondaryText",
    commentIconColor: "secondaryIcon",
    userLikeId: null
  }),
  created: function() {
    /**
     * Getting the user from the store
     */
    this.currentUser = this.$store.getters.user;

    /**
     * Queries on the collection reviewLike of the db
     * to find out the number of likes of the
     * review
     *
     * Tags a listener that will invoked if any change
     * occurs in the db for the query
     *
     * Finds if the current user liked the review or not
     * If current user liked the review change the color
     *
     */
    this.likeSubscription = db
      .collection("reviewLike")
      .where("reviewId", "==", this.review.id)
      .onSnapshot(querySnapshot => {
        this.likesNum = querySnapshot.docs.length;
        querySnapshot.forEach(doc => {
          if (doc.data().userUid === this.currentUser.uid) {
            this.isUserLiked = true;
            this.userLikeId = doc.id;
            this.textColorLike = "accent";
            this.likeIconColor = "accent";
          }
        });
        this.loadingLikes = false;
      });

    /**
     * Queries on the collection reviewComments of the db
     * to find out the number of comments of the
     * review
     *
     * Tags a listener that will invoked if any change
     * occurs in the db for the query
     *
     * Finds if the current user commented the review or not
     * If current user commented the review change the color
     *
     */
    this.commentSubscription = db
      .collection("reviewComments")
      .where("reviewId", "==", this.review.id)
      .onSnapshot(querySnapshot => {
        this.commentsNum = querySnapshot.docs.length;
        querySnapshot.forEach(doc => {
          if (doc.data().uid === this.currentUser.uid) {
            this.isUserCommented = true;
            this.textColorComment = "accent";
            this.commentIconColor = "accent";
          }
        });
        this.loadingComment = false;
      });
  },
  methods: {
    /**
     * Method will run when user clicks on the like button
     * 1. If user is already liked it then then it will delete
     *    that like document form the reviewLike collection
     * 2. If user is liking the review then it will create a
     *    new document in the reviewLike collection
     *
     * Also changes the color of the icons accordingly
     *
     */
    likeOrUnlike: function() {
      if (!this.isUserLiked) {
        const batch = db.batch();
        const reviewLikeRef = db.collection("reviewLike").doc();
        batch.set(reviewLikeRef, {
          userUid: this.currentUser.uid,
          reviewId: this.review.id
        });
        batch
          .commit()
          .then(() => {
            this.isUserLiked = true;
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        this.textColorLike = "colorSecondaryText";
        this.likeIconColor = "secondaryIcon";
        const batch = db.batch();
        const reviewLikeRef = db.collection("reviewLike").doc(this.userLikeId);
        batch.delete(reviewLikeRef);
        batch
          .commit()
          .then(() => {
            this.isUserLiked = false;
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    }
  },
  computed: {
    timeOfReview() {
      return TImeUtil.timeDifference(this.review.timestamp, this.review.time);
    }
  },
  /**
   * Called before destroying this component
   *
   * un-subscribing from database listeners
   */
  beforeDestroy() {
    this.likeSubscription();
    this.commentSubscription();
  }
};
</script>

<style scoped>
</style>
