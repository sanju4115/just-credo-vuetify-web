<template>
  <v-card class="justify-center grey lighten-3">
    <v-container class="black lighten-1 colorPrimaryText--text" fluid>
      <div class="ml-5">
        <h3 class="welcome mt-3 pa-1 mb-1">{{currentUser.name}}</h3>
        <h3 class="welcome pa-1">Edit Your Profile Here !</h3>
      </div>
    </v-container>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 md4 sm12 pa-1>
          <v-card>
            <v-layout style="height: 10px" class="background">
              <div><br/></div>
            </v-layout>
            <v-container class="justify-center pa-0">
              <v-layout row wrap class="justify-center text-xs-center mb-2">
                <v-flex xs12 v-if="!changedPicCheck">
                  <img :src="profilePic" style="height: 400px;width: 360px"/>
                </v-flex>
                <v-flex xs12 v-if="changedPicCheck">
                  <croppa v-model="changedPic"
                          :width="360"
                          :height="400"
                          :show-remove-button="false"
                          class="grey lighten-3"
                          :disable-drag-and-drop="true"
                          placeholder="Choose Profile Pic"
                          accept="image/*"
                          :zoom-speed="5"
                          initial-position="center"
                          prevent-white-space></croppa>
                </v-flex>
                <v-flex xs12>
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
                          @click="chooseProfilePic">
                    Change Profile Picture
                  </v-chip>
                </v-flex>
                <v-flex xs6 v-if="changedPicCheck" class="mb-2">
                  <v-progress-circular
                    indeterminate color="green"
                    v-if="uploading"></v-progress-circular>
                  <v-chip v-else label class="justify-center white--text primary"
                          style="width: 95%"
                          @click="uploadProfilePic">
                    Upload
                  </v-chip>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
        <v-flex xs12 md8 sm12 pa-1>
          <v-card class="pa-2">
            <v-form ref="form" v-model="valid" lazy-validation>
            <v-layout row>
              <v-flex xs4>
                <v-subheader>Email</v-subheader>
              </v-flex>
              <v-flex xs8>
                <v-text-field
                  v-model="currentUser.email"
                  label="Email"
                  disabled
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs4>
                <v-subheader>Name</v-subheader>
              </v-flex>
              <v-flex xs8>
                <v-text-field
                  v-model="name"
                  :rules="nameRules"
                  :counter="30"
                  required
                  name="Name"
                  label="Name"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs4>
                <v-subheader>Mobile</v-subheader>
              </v-flex>
              <v-flex xs8>
                <v-text-field
                  v-model="mobile"
                  :rules="mobileRules"
                  name="Mobile Number"
                  label="Mobile Number"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs4>
                <v-subheader>Description</v-subheader>
              </v-flex>
              <v-flex xs8>
                <v-text-field
                  v-model="description"
                  :counter="500"
                  name="Description"
                  label="Description"
                  textarea
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex xs12 class="text-xs-right">
                <v-btn
                  :loading=updatingUserData
                  @click="submit"
                  dark
                  color="secondary">
                  submit
                </v-btn>
              </v-flex>
            </v-layout>
            </v-form>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
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
  </v-card>
</template>

<script>
  import firebase from "firebase";
  import db from "../../components/firebaseInit";

  export default {
    name: "profileHome",
    components: {
    },
    data: function () {
      return {
        currentUser: this.$store.getters.user,
        profilePic:null,
        changedPic:null,
        changedPicCheck:false,
        errorText: null,
        errorSnackbar: false,
        successSnackBar:false,
        successText:null,
        uploading:false,
        valid: true,
        name: '',
        nameRules: [
          v => !!v || 'Name is required',
          v => (v && v.trim().length > 0) || 'Invalid name',
          v => (v && v.trim().length <= 30) || 'Name must be less than 30 characters'
        ],
        description: '',
        descriptionRules: [
          v => !!v || 'Description is required',
          v => (v && v.length > 20) || 'Name must be greater than 20 characters'
        ],
        mobile:'',
        mobileRules: [
        ],
        updatingUserData:false
      };
    },
    methods:{
      /**
       * Call when user clicks on choose profile pic button
       */
      chooseProfilePic: function () {
        this.changedPicCheck = true;
        // this.$refs.changedPic.chooseFile();
      },
      /**
       * Call when user clicks on upload profile pic button
       * Uploads the photo to "user_photos" folder on firebase storage
       * After completion calls update() to update user data
       */
      uploadProfilePic: function () {
        if (this.changedPic !== null && this.changedPic.getChosenFile() !== null &&
          this.changedPic.getChosenFile() !== undefined) {
          this.uploading = true;
          this.changedPic.generateBlob(
            blob => {
              let storageRef = firebase.storage().ref();
              storageRef
                .child("user_photos/" + this.currentUser.uid)
                .child(
                  this.changedPic.getChosenFile().name + "_" + new Date().getTime()
                )
                .put(blob)
                .then(snapshot => {
                  this.updateUserData(snapshot);
                })
                .catch(error => {
                  this.uploading = false;
                  switch (error.code) {
                    case 'storage/unauthorized':
                      this.errorText = "You doesn't have permission.";
                      this.errorSnackbar = true;
                      break;
                    case 'storage/unknown':
                      this.errorText = "Unknown error occurred";
                      this.errorSnackbar = true;
                      break;
                  }
              });
            }, "image/jpeg", 1);
        }else {
          this.errorText = "Please change profile pic first.";
          this.errorSnackbar = true;
        }
      },
      /**
       * Call to update user data with profile pic
       * After completion shows success snackbar
       * If error show error snackbar
       */
      updateUserData: function (snapshot){
        db.collection("users")
          .doc(this.currentUser.uid)
          .update({"profilePic": snapshot.downloadURL})
          .then(() => {
            this.successText = "Profile pic updated";
            this.successSnackBar = true;
            this.uploading = false;
            this.profilePic = snapshot.downloadURL;
            this.currentUser["profilePic"] = snapshot.downloadURL;
            this.updateUserDataInStore();
            this.changedPicCheck = false;
          })
          .catch(() => {
            this.uploading = false;
            this.errorText = "Unknown error occurred";
            this.errorSnackbar = true;
          });
      },
      updateUserDataInStore: function(){
        this.$store.dispatch("setUser", {data : this.currentUser});
      },
      cancelPicChange : function () {
        this.changedPicCheck = false;
      },
      submit () {
        if (this.$refs.form.validate()) {
          this.updatingUserData = true;
          if (this.description !== null && this.description !== undefined){
            this.currentUser["description"] = this.description;
          }
          if (this.mobile !== null && this.mobile !== undefined){
            this.currentUser["mobile"] = this.mobile;
          }
          this.currentUser["name"] = this.name;
          db.collection("users")
            .doc(this.currentUser.uid)
            .set(this.currentUser)
            .then(() => {
              this.successText = "Profile updated successfully";
              this.successSnackBar = true;
              this.updatingUserData = false;
              this.updateUserDataInStore();
            })
            .catch(() => {
              this.updatingUserData = false;
              this.errorText = "Unknown error occurred";
              this.errorSnackbar = true;
            });
        }else {
          this.errorText = "Invalid data";
          this.errorSnackbar = true;
        }
      }
    },
    created() {
      if(this.currentUser.profilePic === null || this.currentUser.profilePic === undefined){
        this.profilePic = "static/images/util/profile_picture_blank_portrait.png";
      }else {
        this.profilePic = this.currentUser.profilePic;
      }
      this.name = this.currentUser.name;
      this.description = this.currentUser.description;
      this.mobile = this.currentUser.mobile;
    },
    mounted(){

    }
  }
</script>

<style scoped>
  .welcome {
    font-family: "Roboto", sans-serif;
    font-weight: 800;
    line-height: 3vh;
    font-size: 3vh;
    color: white;
  }
</style>
