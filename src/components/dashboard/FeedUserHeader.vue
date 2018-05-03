<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap v-if="loadingUser || loadingFollowing || loadingFollower">
      <v-flex d-flex xs6 sm9 md9 class="py-2">
        <v-progress-circular
          class="ml-3"
          indeterminate
          color="accent"
          :size="20"
          :width=2></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-else>
      <v-flex d-flex xs3 sm2 md2 >
          <v-avatar v-if="user.profilePic" size="50">
            <img :src="user.profilePic" :alt="user.name">
          </v-avatar>
      </v-flex>
      <v-flex d-flex xs6 sm9 md9>
        <v-layout row wrap>
          <v-flex d-flex>
            <div>
              <h4 class="mb-0">{{user.name}}</h4>
              <div style="font-size: 12px">Following  {{followingNum}}, Follower {{followerNum}}</div>
            </div>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex class="justify-end" xs2 sm1 md1 v-if="followingColor">
        <v-tooltip bottom>
          <v-btn flat icon :color="followingColor" @click.stop="followOrUnfollow" slot="activator">
            <v-icon>person</v-icon>
          </v-btn>
          <span v-if="isFollowing">Unfollow</span>
          <span v-else>Follow</span>
        </v-tooltip>
        <v-progress-circular
          v-if="!followingColor"
          indeterminate
          class="accent--text"
          :width="3"
          :size="15"
        ></v-progress-circular>
      </v-flex>
      <v-dialog persistent v-model="unFollowDialogue" max-width="300" class="text-xs-center">
        <v-container class="background">
          <v-layout row wrap>
            <v-flex>
              <v-card>
                <v-card-text>Do you want to unfollow?</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" flat="flat" @click.native="unFollowDialogue = false">Cancel</v-btn>
                  <v-btn color="green darken-1" flat="flat" @click.native="unFollowing">Yes</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
            <v-flex v-if="unFollowProcessing" xs12 sm12 class="text-xs-center">
              <v-progress-circular
                indeterminate
                class="accent--text"
                :width="7"
                :size="30"></v-progress-circular>
              <p>Processing</p>
            </v-flex>
          </v-layout>
        </v-container>
      </v-dialog>
    </v-layout>
  </v-container>
</template>
<script>
import db from "../../components/firebaseInit";
import firebase from "firebase";
export default {
  name: "FeedUserHeader",
  props: ["uid"],
  data: () => ({
    user: null,
    followingColor: null,
    isFollowing: null,
    unFollowDialogue: false,
    unFollowProcessing: false,
    currentUser: null,
    followingNum: 0,
    followerNum: 0,
    loadingFollowing: true,
    loadingFollower: true,
    loadingUser: true,
    followingSubscription: null,
    followerSubscription: null,
    followRelSubscription: null,
    followId: null
  }),
  created: function() {
    /**
     * Fetch the user information of the review
     */
    db.collection("users")
      .doc(this.uid)
      .get()
      .then(doc => {
        this.loadingUser = false;
        if (doc.exists) {
          this.user = doc.data();
        } else {
          console.log("No such document!");
        }
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });

    /**
     * Fetches the current user from the store
     *
     * Queries on the collection follow of the db
     * to find out the number of following of the
     * review user
     *
     * Tags a listener that will invoked if any change
     * occurs in the db for the query
     *
     */
    this.currentUser = this.$store.getters.user;
    this.followingSubscription = db
      .collection("follow")
      .where("followingUid", "==", this.uid)
      .onSnapshot(querySnapshot => {
        this.followingNum = querySnapshot.docs.length;
        this.loadingFollowing = false;
      });

    /**
     * Queries on the collection follow of the db
     * to find out the number of follower of the
     * review user
     *
     * Tags a listener that will invoked if any change
     * occurs in the db for the query
     *
     */
    this.followerSubscription = db
      .collection("follow")
      .where("followerUid", "==", this.uid)
      .onSnapshot(querySnapshot => {
        this.followerNum = querySnapshot.docs.length;
        this.loadingFollower = false;
      });

    /**
     * Queries on the collection follow of the db
     * to find out if the current user follows the
     * review user
     *
     * Tags a listener that will invoked if any change
     * occurs in the db for the query
     *
     */
    if (this.uid !== this.currentUser.uid) {
      this.followRelSubscription = db
        .collection("follow")
        .where("followingUid", "==", this.uid)
        .where("followerUid", "==", this.currentUser.uid)
        .onSnapshot(querySnapshot => {
          if (querySnapshot.docs.length > 0) {
            this.followingColor = "green";
            this.isFollowing = true;
            this.followId = querySnapshot.docs[0].id;
          } else {
            this.followingColor = "grey";
            this.isFollowing = false;
          }
        });
    }
  },
  methods: {
    /**
     * called when user clicks on the follow icon
     * Two cases:
     * 1. if the current user is following the review
     * user then it will open the confirmation dialogue box
     * 2. if the user is not following then user will start
     * following the review user
     *
     * creates a doc in the follow collection of the db
     */
    followOrUnfollow: function() {
      if (!this.isFollowing) {
        this.followingColor = false;
        const batch = db.batch();
        const followingRef = db.collection("follow").doc();
        batch.set(followingRef, {
          followingUid: this.uid,
          followerUid: this.currentUser.uid
        });
        batch
          .commit()
          .then(() => {
            this.followingColor = "green";
            this.isFollowing = true;
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        this.unFollowDialogue = true;
      }
    },

    /**
     * called when user un-follow any person
     * who has written the review
     *
     * Deletes that doc from the follow collection
     */
    unFollowing: function() {
      this.unFollowProcessing = true;
      const batch = db.batch();
      const followingRef = db.collection("follow").doc(this.followId);
      batch.delete(followingRef);
      batch.commit().then(() => {
        this.unFollowProcessing = false;
        this.unFollowDialogue = false;
        this.followingColor = "grey";
        this.isFollowing = false;
      });
    }
  },

  /**
   * called before destroying this component
   *
   * un-subscribing from database listeners
   */
  beforeDestroy() {
    this.followingSubscription();
    this.followerSubscription();
    if (this.followRelSubscription !== null) {
      this.followRelSubscription();
    }
  }
};
</script>

<style scoped>
</style>
