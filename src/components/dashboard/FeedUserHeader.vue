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
            <img :src="user.profilePic" alt="user.name">
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
        <v-tooltip top>
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
    followingColor:null,
    isFollowing:null,
    unFollowDialogue:false,
    unFollowProcessing:false,
    currentUser:null,
    followingNum:0,
    followerNum:0,
    loadingFollowing:true,
    loadingFollower:true,
    loadingUser : true
  }),
  created: function() {
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


    db.collection("following").doc(this.uid)
      .onSnapshot({}, doc => {
        if (doc.exists) {
          const map = Object.keys(doc.data());
          this.followingNum = map.length;
        } else {
          this.followingNum = 0;
        }
        this.loadingFollowing = false;
      });


    db.collection("follower").doc(this.uid)
      .onSnapshot({}, doc => {
        if (doc.exists) {
          const map = Object.keys(doc.data());
          this.followerNum = map.length;
        } else {
          this.followerNum = 0;
        }
        this.loadingFollower = false;
      });

    this.currentUser = this.$store.getters.user;
    if (this.uid !== this.currentUser.uid) {
      db.collection("following").doc(this.currentUser.uid)
        .onSnapshot({}, doc => {
          if (doc.exists && doc.get(this.uid)) {
            this.followingColor = "green";
            this.isFollowing = true;
          } else {
            this.followingColor = "grey";
            this.isFollowing = false;
          }
        });
    }
  },
  methods:{
    followOrUnfollow:function () {
      if (!this.isFollowing){
        this.followingColor = false;
        const batch = db.batch();
        const followingRef = db.collection("following").doc(this.currentUser.uid);
        batch.update(followingRef,{[this.uid]: true});
        const followerRef = db.collection("follower").doc(this.uid);
        batch.update(followerRef, {[this.currentUser.uid]: true});
        batch.commit().then(() => {
          this.followingColor = 'green';
          this.isFollowing = true;
        }).catch(function(error) {
          console.log(error)
        });
      }else {
        this.unFollowDialogue = true;
      }

    },
    unFollowing:function () {
      this.unFollowProcessing = true;
      const batch = db.batch();
      const followingRef = db.collection("following").doc(this.currentUser.uid);
      batch.update(followingRef,{[this.uid]: firebase.firestore.FieldValue.delete()});
      const followerRef = db.collection("follower").doc(this.uid);
      batch.update(followerRef, {[this.currentUser.uid]: firebase.firestore.FieldValue.delete()});
      batch.commit().then(() => {
        this.unFollowProcessing = false;
        this.unFollowDialogue = false;
        this.followingColor = 'grey';
        this.isFollowing = false;
      });
    }
  }
};
</script>

<style scoped>
</style>
