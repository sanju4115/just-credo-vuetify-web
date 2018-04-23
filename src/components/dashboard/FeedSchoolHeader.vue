<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap v-if="loadingSchool || loadingSchool">
      <v-flex d-flex xs6 sm9 md9 class="py-2">
        <v-progress-circular class="ml-3" indeterminate color="accent" :size="20" :width="2"></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-else>
      <v-flex d-flex xs3 sm2 md2>
        <v-avatar size="50">
          <img :src="schoolImage">
        </v-avatar>
      </v-flex>
      <v-flex d-flex xs6 sm9 md9>
        <v-layout row wrap>
          <v-flex d-flex>
            <div>
              <h4 class="mb-0">{{school.name}}</h4>
              <div style="font-size: 12px">{{Object.values(school.address).join()}}</div>
            </div>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex class="justify-end" xs2 sm1 md1 v-if="bookmarkColor">
        <v-tooltip bottom>
          <v-btn flat icon :color="bookmarkColor" @click.stop="bookmarkOrUnBookmark" slot="activator">
            <v-icon>bookmark</v-icon>
          </v-btn>
          <span v-if="isBookmarked">Remove Bookmark</span>
          <span v-else>Bookmark</span>
        </v-tooltip>
        <v-progress-circular
          v-if="!bookmarkColor"
          indeterminate
          class="accent--text"
          :width="3"
          :size="15"
        ></v-progress-circular>
      </v-flex>
      <v-dialog persistent v-model="unBookmarkDialogue" max-width="300" class="text-xs-center">
        <v-container class="background">
          <v-layout row wrap>
            <v-flex>
              <v-card>
                <v-card-text>Do you want to remove the bookmark?</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" flat="flat" @click.native="unBookmarkDialogue = false">Cancel</v-btn>
                  <v-btn color="green darken-1"
                         flat="flat"
                         v-if="!unBookmarkProcessing"
                         @click.native="unBookmarking">Yes</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
            <v-flex v-if="unBookmarkProcessing" xs12 sm12 class="text-xs-center">
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
export default {
  name: "FeedSchoolHeader",
  props: ["schoolID"],
  data: () => ({
    school: null,
    schoolImage: null,
    bookmarkColor: null,
    isBookmarked: null,
    unBookmarkDialogue: false,
    unBookmarkProcessing: false,
    currentUser: null,
    loadingSchool: true,
    loadingBookmark: true,
    bookmarkSubscription: null,
    bookmarkId: null
  }),
  created: function() {
    db
      .collection("schools")
      .doc(this.schoolID)
      .get()
      .then(doc => {
        if (doc.exists) {
          this.school = doc.data();
          this.currentUser = this.$store.getters.user;
          if (this.school.userID !== this.currentUser.uid) {
            this.bookmarkSubscription = db
              .collection("bookmark")
              .where("userUid", "==", this.currentUser.uid)
              .where("placeId", "==", this.schoolID)
              .onSnapshot(querySnapshot => {
                this.loadingBookmark = false;
                if (querySnapshot.docs.length > 0) {
                  this.bookmarkId = querySnapshot.docs[0].id;
                  this.bookmarkColor = "green";
                  this.isBookmarked = true;
                } else {
                  this.bookmarkColor = "grey";
                  this.isBookmarked = false;
                }
              });
          } else {
            this.loadingBookmark = false;
          }
          this.loadingSchool = false;
          let images = doc.data().images;
          if (images !== undefined && images != null) {
            this.schoolImage = Object.values(images)[0];
          } else {
            this.schoolImage = "/static/images/util/ic_nocover.png";
          }
        } else {
          console.log("No such document!");
        }
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });
  },
  methods: {
    bookmarkOrUnBookmark: function() {
      if (!this.isBookmarked) {
        this.bookmarkColor = false;
        if (this.school.bookmarks == null) {
          this.school["bookmarks"] = {
            [this.currentUser.uid]: this.currentUser.uid
          };
        } else {
          this.school.bookmarks[this.currentUser.uid] = this.currentUser.uid;
        }

        console.log(this.schoolID);
        const batch = db.batch();
        const bookmarkRef = db.collection("bookmark").doc(); // updating in bookmark db
        batch.set(bookmarkRef, {
          userUid: this.currentUser.uid,
          placeId: this.schoolID
        });
        const schoolRef = db.collection("schools").doc(this.schoolID);
        batch.update(schoolRef, { bookmarks: this.school.bookmarks }); // updating bookmarks in school db

        if (
          this.school.noOfBookmarks !== null || // updating no of bookmarks in school db
          this.school.noOfBookmarks !== undefined
        ) {
          const x = this.school.noOfBookmarks;
          batch.update(schoolRef, { noOfBookmarks: x + 1 });
          this.school.noOfBookmarks = x + 1;
        } else {
          batch.update(schoolRef, { noOfBookmarks: 1 });
          this.school.noOfBookmarks = 1;
        }
        batch
          .commit()
          .then(() => {
            this.bookmarkColor = "green";
            this.isBookmarked = true;
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        this.unBookmarkDialogue = true;
      }
    },
    unBookmarking: function() {
      this.unBookmarkProcessing = true;
      const batch = db.batch();
      const bookmarkRef = db.collection("bookmark").doc(this.bookmarkId);
      batch.delete(bookmarkRef);
      const schoolRef = db.collection("schools").doc(this.schoolID);
      delete this.school.bookmarks[this.currentUser.uid];
      batch.update(schoolRef, { ["bookmarks"]: this.school.bookmarks });
      if (
        this.school.noOfBookmarks !== null ||
        this.school.noOfBookmarks !== undefined
      ) {
        const x = this.school.noOfBookmarks;
        batch.update(schoolRef, { noOfBookmarks: x - 1 });
        this.school.noOfBookmarks = x - 1;
      } else {
        batch.update(schoolRef, { noOfBookmarks: 0 });
        this.school.noOfBookmarks = 0;
      }
      batch.commit().then(() => {
        this.unBookmarkProcessing = false;
        this.unBookmarkDialogue = false;
        this.bookmarkColor = "grey";
        this.isBookmarked = false;
      });
    },
    beforeDestroy() {
      this.bookmarkSubscription();
    }
  }
};
</script>

<style scoped>
</style>
