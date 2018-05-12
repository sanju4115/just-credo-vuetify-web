<template>
  <v-layout row wrap>
    <v-flex xs12 class="text-xs-center" v-if="loading">
      <v-progress-circular
        indeterminate
        class="accent--text"
        :width="7"
        :size="70"
      ></v-progress-circular>
    </v-flex>
    <v-flex xs12 v-else>
      <v-stepper v-model="schoolForm" vertical>
        <v-stepper-step step="1" :complete="schoolForm > 1">
          Choose Category
          <small>You can select multiple</small>
        </v-stepper-step>
        <v-stepper-content step="1">
          <v-card class="ma-2">
            <v-container fluid>
              <v-layout row wrap>
                <v-flex xs6 sm4 md4>
                  <p>Select Type</p>
                  <v-checkbox v-for="category in formData.categories"
                              :label="category.name"
                              v-model="schoolType"
                              color="accent"
                              hide-details :value="category.name"
                  ></v-checkbox>
                </v-flex>
                <v-flex xs6 sm4 md4 class="justify-center">
                  <p >Select Gender</p>
                  <v-checkbox v-for="gender in formData.gender"
                              :label="gender.name"
                              v-model="genderList"
                              color="accent"
                              hide-details :value="gender.name"
                  ></v-checkbox>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
          <v-btn color="primary" @click="validation">Continue</v-btn>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>
        <v-stepper-step step="2" :complete="schoolForm > 2">Description</v-stepper-step>
        <v-stepper-content step="2">
          <v-card class="ma-2">
            <v-card-text>
              <v-text-field
                label="Legal Educational Place Name"
                v-model="schoolName"
                :rules="[() => schoolName.length > 0 || 'This field is required']"
                required></v-text-field>
              <v-text-field
                label="Legal Email"
                v-model="email"
                required
                :rules="[() => email.trim().length > 0 || 'This field is required']"></v-text-field>
              <v-text-field
                label="Legal Website"
                persistent-hint
                v-model="website"></v-text-field>
              <v-text-field
                label="Legal Mobile/Phone*"
                persistent-hint
                v-model="mobile"
                required
                :rules="[() => email.trim().length > 0 || 'This field is required']"></v-text-field>
              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    name="input-1"
                    v-model="description"
                    label="Description"
                    textarea
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex md12 xs12>
                  <span class="subheader">Select address of the place*</span>
                </v-flex>
                <v-flex md6>
                  <vuetify-google-autocomplete
                    id="map"
                    append-icon="search"
                    solo inverted light
                    types='establishment'
                    placeholder="Search Address"
                    v-on:placechanged="getAddressData"
                    country="in">
                  </vuetify-google-autocomplete>
                </v-flex>
                <v-flex md6 v-if="!loadingLocation">
                  <v-btn class="justify-center" color="success" @click.stop="fetchUserLocation">Enable Location & Start</v-btn>
                </v-flex>
                <v-flex v-if="loadingLocation" xs6 sm6 class="text-xs-center mt-1">
                  <v-progress-circular
                    indeterminate
                    class="accent--text"
                    :width="3"
                    :size="30"
                  ></v-progress-circular>
                  <p>Fetching Location</p>
                </v-flex>
                <v-flex xs12 >
                  <v-alert type="error" :value="locationError">
                    {{locationErrorText}}
                  </v-alert>
                </v-flex>
              </v-layout>
              <Address :location="location"></Address>
              <small>*indicates required field</small>
            </v-card-text>
          </v-card>
          <v-btn color="primary" @click="validation">Continue</v-btn>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>
        <v-stepper-step step="3" :complete="schoolForm > 3">Select genres and classes</v-stepper-step>
        <v-stepper-content step="3">
          <v-card class="ma-2">
            <v-container fluid>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-select
                    v-model="danceClass"
                    label="Select dance genres or create a new ones"
                    chips
                    tags
                    :items="formData.dancing.map(value => value.name)"
                  ></v-select>
                </v-flex>
                <v-flex xs12>
                  <v-select
                    v-model="singingClass"
                    label="Select singing genres or create a new ones"
                    chips
                    tags
                    :items="formData.singing.map(value => value.name)"
                  ></v-select>
                </v-flex>
                <v-flex xs12>
                  <v-select
                    v-model="instrumentsClass"
                    label="Select instruments or create new one"
                    chips
                    tags
                    :items="formData.instruments.map(value => value.name)"
                  ></v-select>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
          <v-btn color="primary" @click.native="validation">Continue</v-btn>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>
        <v-stepper-step step="4" :complete="schoolForm > 4">Select facilities provided </v-stepper-step>
        <v-stepper-content step="4">
          <v-card class="ma-2">
            <v-container fluid>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-select
                    v-model="facilities"
                    label="Select general facilities or create a new ones"
                    chips
                    tags
                    :items="formData.facilities.map(value => value.name)"
                  ></v-select>
                </v-flex>
                <v-flex xs12>
                  <v-select
                    v-model="extracurricular"
                    label="Select extracurricular activities or create a new ones"
                    chips
                    tags
                    :items="formData.extracurricular.map(value => value.name)"
                  ></v-select>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
          <v-btn color="primary" @click.native="validation">Continue</v-btn>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>
        <v-stepper-step step="5">Upload Photos </v-stepper-step>
        <v-stepper-content step="5">
          <v-card class="ma-2">
            <v-container>
              <p style="font-weight: bold;">Choose cover pic(image can be zoomed
                and cropped by dragging image in any direction)</p>
            </v-container>
            <v-container class="justify-center">
              <v-layout row class="justify-center">
                <croppa v-model="coverPic"
                        :width="600"
                        :height="300"
                        class="grey lighten-3"
                        placeholder="Choose Cover Pic"
                        accept="image/*"
                        :zoom-speed="5"
                        initial-position="center"
                        prevent-white-space></croppa>
              </v-layout>
            </v-container>
          </v-card>
          <v-btn color="primary" @click.stop="validation">Submit</v-btn>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>
      </v-stepper>
    </v-flex>
    <v-snackbar
      color="error"
      bottom
      v-model="errorSnackbar">
      {{ errorText }}
      <v-btn dark flat @click.native="errorSnackbar = false">Close</v-btn>
    </v-snackbar>
    <v-dialog v-model="savingDialogue" persistent max-width="500px">
      <v-card>
        <v-card-title  class="justify-center">
          Saving your educational place!
        </v-card-title>
        <v-layout class="justify-center">
          <v-progress-circular class="mb-3" indeterminate :width="3" color="green"></v-progress-circular>
        </v-layout>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  import db from "../../components/firebaseInit";
  import VuetifyGoogleAutocomplete from "vuetify-google-autocomplete";
  import Geohash from "latlon-geohash";
  import LocationUtil from "../../utils/LocationUtil";
  import Address from "./Address";
  import firebase from "firebase";
  import SchoolUtil from "../../utils/SchoolUtil";
  import Util from "../../utils/Util";

  export default {
    name: "MusicClassForm",
    components: { Address, VuetifyGoogleAutocomplete },
    data() {
      return {
        schoolForm: 1,
        loading: true,
        formData: null,
        schoolType: [],
        genderList: [],
        schoolName: "",
        email: "",
        website: "",
        mobile: "",
        location: null,
        loadingLocation: false,
        locationError: false,
        locationErrorText: "",
        description: "",
        danceClass:[],
        instrumentsClass:[],
        singingClass:[],
        facilities: [],
        extracurricular: [],
        imageUrl: "",
        coverPic: {},
        errorText: null,
        errorSnackbar: false,
        savingDialogue:false
      };
    },
    created() {
      /**
       * Queries on thd db to fetch school form data
       */
      db.collection("filter")
        .doc("musicFilters")
        .get()
        .then(doc => {
          if (doc.exists) {
            this.formData = doc.data();
            console.log(this.formData);
          } else {
            this.$router.push(`/error?error=${"No such document!"}`);
          }
          this.loading = false;
        })
        .catch(error => {
          this.$router.push(`/error?error=${error}`);
        });
    },
    methods: {
      /**
       * Fetches location by using google's place api
       * After fetching the location it store location in the location variable
       */
      getAddressData: function(addressData, placeResultData) {
        const location = LocationUtil.deduceLocation(placeResultData);
        location.latitude = addressData.latitude;
        location.longitude = addressData.longitude;
        location.geohash150 = Geohash.encode(
          addressData.latitude,
          addressData.longitude,
          3
        );
        location.geohash50 = Geohash.encode(
          addressData.latitude,
          addressData.longitude,
          4
        );
        location.geohash5 = Geohash.encode(
          addressData.latitude,
          addressData.longitude,
          5
        );
        location.geohash1 = Geohash.encode(
          addressData.latitude,
          addressData.longitude,
          6
        );
        this.location = location;
        this.loadingLocation = false;
        this.locationError = false;
      },
      extractGeoHasH: function (geocoder, latlng, position, geohash150, geohash50, geohash5, geohash1) {
        geocoder.geocode({location: latlng}, (results, status) => {
          if (status === "OK") {
            if (results[0]) {
              let location = LocationUtil.deduceLocation(results[0]);
              location.latitude = position.coords.latitude;
              location.longitude = position.coords.longitude;
              location.geohash150 = geohash150;
              location.geohash50 = geohash50;
              location.geohash5 = geohash5;
              location.geohash1 = geohash1;
              this.location = location;
            } else {
              this.loadingLocation = false;
              this.locationErrorText = "No results found";
              this.locationError = true;
            }
          } else {
            this.locationErrorText = "Geocoder failed due to: " + status;
            this.locationError = true;
          }
        });
      },
      summarizeLocation: function (position) {
        const geohash150 = Geohash.encode(
          position.coords.latitude,
          position.coords.longitude,
          3
        );
        const geohash50 = Geohash.encode(
          position.coords.latitude,
          position.coords.longitude,
          4
        );
        const geohash5 = Geohash.encode(
          position.coords.latitude,
          position.coords.longitude,
          5
        );
        const geohash1 = Geohash.encode(
          position.coords.latitude,
          position.coords.longitude,
          6
        );
        const geocoder = new google.maps.Geocoder();
        const latlng = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        this.extractGeoHasH(geocoder, latlng, position, geohash150, geohash50, geohash5, geohash1);
      },
      /**
       * Fetches user current location
       * if user allows browser to fetch location,
       * if user do not allow browser to fetch location
       * then it will show error message
       *
       * After fetching the location it store location in the location variable
       */
      fetchUserLocation() {
        this.loadingLocation = true;
        this.locationError = null;
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            position => {
              this.summarizeLocation(position);
              this.loadingLocation = false;
            },
            err => {
              this.loadingLocation = false;
              this.locationErrorText = err.message;
              this.locationError = true;
            }
          );
        } else {
          this.loadingLocation = false;
          this.locationErrorText = "Cannot access location.";
          this.locationError = true;
        }
      },
      saveSchool: function(snapshot, newSchoolRef, placeType) {
        const school = {
          coverPic: snapshot.downloadURL,
          images:[snapshot.downloadURL],
          location: this.location,
          categories: Util.listToObject(this.schoolType),
          description: this.description,
          extracurricular: Util.listToObject(this.extracurricular),
          facilities: Util.listToObject(this.facilities),
          gender: Util.listToObject(this.genderList),
          singing:Util.listToObject(this.singingClass),
          dancing:Util.listToObject(this.danceClass),
          instruments:Util.listToObject(this.instrumentsClass),
          id: newSchoolRef.id,
          mail: this.email,
          mobileNumber: this.mobile,
          website: this.website,
          name: this.schoolName,
          noOfBookmarks: 0,
          noOfRating: 0,
          placeType: placeType,
          rating: 0,
          time: new Date(),
          type: "Schools",
          userId: this.$store.getters.user.uid
        };
        newSchoolRef
          .set(school)
          .then(() => {
            this.savingDialogue = false;
            console.log(newSchoolRef.id);
            console.log(snapshot.downloadURL);
            console.log("Document successfully written!");
          })
          .catch(error => {
            this.errorText = "Something went wrong. Please try again";
            console.log("Error in writing doc : "+error);
            this.errorSnackbar = true;
          });
      },
      /**
       * Call when user clicks on the submit form
       * It collects data from different sections of the form(Steppers)
       * and save it to the collection schools
       * (code to upload the cropped image file (a file is a blob))
       * 80% compressed jpeg file
       *
       * After saving the data it takes the user to the school detail page
       */
      submitForm() {
        this.savingDialogue = true;
        const newSchoolRef = db.collection("schools").doc();
        this.coverPic.generateBlob(
          blob => {
            console.log(blob);
            let storageRef = firebase.storage().ref();
            storageRef
              .child("school_photos/" + newSchoolRef.id)
              .child(
                this.coverPic.getChosenFile().name + "_" + new Date().getTime()
              )
              .put(blob)
              .then(snapshot => {
                this.saveSchool(snapshot, newSchoolRef, {musicClass:true});
              });
          }, "image/jpeg", 0.8);
      },
      validateGenres: function() {
        let selectType = this.schoolType.join(".");
        if (selectType.includes("Singing") && this.singingClass.length <= 0) {
          this.errorText = "Please select at least one singing list.";
          this.errorSnackbar = true;
        } else if (selectType.includes("Dance") && this.danceClass.length <= 0) {
          this.errorText = "Please select at least one dance list.";
          this.errorSnackbar = true;
        }else if (selectType.includes("Instruments") && this.instrumentsClass.length <= 0) {
          this.errorText = "Please select at least one instruments list.";
          this.errorSnackbar = true;
        } else {
          this.schoolForm = 4;
        }
      },
      validateFacilityAndExtraCurricullar: function() {
       if (this.facilities.length <= 0) {
          this.errorText = "Please select at least one facility.";
          this.errorSnackbar = true;
        } else if (this.extracurricular.length <= 0) {
          this.errorText = "Please select at least one extracurricular activity.";
          this.errorSnackbar = true;
        } else {
          this.schoolForm = 5;
        }
      },
      validateDescription: function() {
        if (this.schoolName.trim() === "") {
          this.errorText = "Please enter valid educational place name.";
          this.errorSnackbar = true;
        } else if (this.email.trim() === "" || !Util.validateEmail(this.email)) {
          this.errorText = "Please enter valid email.";
          this.errorSnackbar = true;
        } else if (
          this.mobile.trim() === "" ||
          !Util.validatePhoneNumber(this.mobile)
        ) {
          this.errorText = "Please enter valid mobile or phone number.";
          this.errorSnackbar = true;
        } else if (this.website.trim() !== "" && !Util.isUrl(this.website)) {
          this.errorText = "Please enter valid website.";
          this.errorSnackbar = true;
        } else if (
          this.description.trim() === "" ||
          this.description.trim().length < 100
        ) {
          this.errorText =
            "Description should be more than 100 characters. It helps in better user experience.";
          this.errorSnackbar = true;
        } else if (
          this.location === null ||
          this.location.formatted_address.trim() === ""
        ) {
          this.errorText =
            "Please select address for this place either " +
            "by searching the address or by using current location";
          this.errorSnackbar = true;
        } else {
          this.schoolForm = 3;
        }
      },
      validateTypeAndGender: function() {
        if (this.schoolType.length <= 0) {
          this.errorText = "Please select at least one type.";
          this.errorSnackbar = true;
        } else if (this.genderList.length <= 0) {
          this.errorText = "Please select at least one from gender list.";
          this.errorSnackbar = true;
        } else {
          this.schoolForm = 2;
        }
      },
      validateCoverPicAndSubmit: function() {
        if (
          this.coverPic.getChosenFile() === null ||
          this.coverPic.getChosenFile() === undefined
        ) {
          this.errorText = "Please select cover pic for the educational place.";
          this.errorSnackbar = true;
        } else {
          this.submitForm();
        }
      },
      validation() {
        this.errorText = null;
        this.errorSnackbar = false;
        if (this.schoolForm === 1) {
          this.validateTypeAndGender();
        } else if (this.schoolForm === 2) {
          this.validateDescription();
        } else if (this.schoolForm === 3) {
          this.validateGenres();
        } else if (this.schoolForm === 4) {
          this.validateFacilityAndExtraCurricullar();
        } else if (this.schoolForm === 5) {
          this.validateCoverPicAndSubmit();
        }
      }
    }
  };
</script>

