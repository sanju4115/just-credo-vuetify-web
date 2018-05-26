<template>
  <v-container class="justify-center pa-0">
    <v-layout row wrap class="justify-center text-xs-center mb-2">
      <v-flex xs12 v-if="!changedPicCheck">
        <img :src="model.coverPic" style="height: 300px;width: 600px"/>
      </v-flex>
      <v-flex xs12 v-if="changedPicCheck">
        <croppa v-model="coverPic"
                :width="600"
                :height="300"
                class="grey lighten-3"
                placeholder="Choose Cover Pic"
                accept="image/*"
                :zoom-speed="5"
                initial-position="center"
                prevent-white-space></croppa>
      </v-flex>
      <v-flex xs12 v-if="changedPicCheck">
        <v-chip label class="justify-center white--text blue" style="width: 95%">
          Drag/Zoom Picture To Crop
        </v-chip>
      </v-flex>
      <v-flex xs6 v-if="changedPicCheck">
        <v-chip label class="justify-center white--text primary"
                style="width: 95%"
                @click="cancelPicChange">
          Cancel
        </v-chip>
      </v-flex>
      <v-flex xs6 v-if="!changedPicCheck" class="mb-2">
        <v-chip label class="justify-center white--text primary"
                style="width: 95%"
                @click="choosePic">
          Change Cover Picture
        </v-chip>
      </v-flex>
      <v-flex xs6 v-if="changedPicCheck" class="mb-2">
        <v-btn
          :loading=uploading
          @click="uploadPic"
          style="width: 95%"
          dark
          color="secondary">
          Upload
        </v-btn>
      </v-flex>
    </v-layout>
    <v-snackbar
      color="error"
      bottom
      v-model="errorSnackbar">
      {{ errorText }}
      <v-btn dark flat @click.native="errorSnackbar = false">Close</v-btn>
    </v-snackbar>
    <v-snackbar
      color="success"
      bottom
      v-model="successSnackBar">
      {{successText}}
      <v-btn dark flat @click.native="successSnackBar = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import firebase from "firebase";
import db from "../firebaseInit";

export default {
  name: "ChangeCoverPic",
  props: {
    model: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      coverPic: {},
      changedPicCheck: false,
      uploading: false,
      errorSnackbar: false,
      errorText: "",
      successSnackBar: false,
      successText: null
    };
  },
  methods: {
    /**
     * Call when user clicks on choose profile pic button
     */
    choosePic: function() {
      this.changedPicCheck = true;
    },
    cancelPicChange: function() {
      this.changedPicCheck = false;
    },
    /**
     * Call when user clicks on upload profile pic button
     * Uploads the photo to "user_photos" folder on firebase storage
     * After completion calls update() to update user data
     */
    uploadPic: function() {
      if (
        this.coverPic !== null &&
        this.coverPic.getChosenFile() !== null &&
        this.coverPic.getChosenFile() !== undefined
      ) {
        this.uploading = true;
        this.coverPic.generateBlob(
          blob => {
            let storageRef = firebase.storage().ref();
            storageRef
              .child("school_photos/" + this.model.id)
              .child(
                this.coverPic.getChosenFile().name +
                  "_" +
                  new Date().getTime()
              )
              .put(blob)
              .then(snapshot => {
                this.updateData(snapshot);
              })
              .catch(error => {
                this.uploading = false;
                switch (error.code) {
                  case "storage/unauthorized":
                    this.errorText = "You doesn't have permission.";
                    this.errorSnackbar = true;
                    break;
                  case "storage/unknown":
                    this.errorText = "Unknown error occurred";
                    this.errorSnackbar = true;
                    break;
                }
              });
          },
          "image/jpeg",
          1
        );
      } else {
        this.errorText = "Please change profile pic first.";
        this.errorSnackbar = true;
      }
    },

    /**
     * Call to update drafted school data with cover pic
     * After completion shows success snackbar
     * If error show error snackbar
     */
    updateData: function(snapshot) {
      db
        .collection("draft_schools")
        .doc(this.model.id)
        .update({ coverPic: snapshot.downloadURL })
        .then(() => {
          this.successText = "Cover pic updated";
          this.successSnackBar = true;
          this.uploading = false;
          this.model.coverPic = snapshot.downloadURL;
          this.changedPicCheck = false;
          this.$emit('picUploaded', snapshot.downloadURL)
        })
        .catch(() => {
          this.uploading = false;
          this.errorText = "Unknown error occurred";
          this.errorSnackbar = true;
        });
    }
  }
};
</script>

<style scoped>
</style>
