<template>
    <v-layout row wrap pa-2>
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
      <Address :location="var_location"></Address>
      <small>*indicates required field</small>
    </v-layout>
</template>

<script>
import VuetifyGoogleAutocomplete from "vuetify-google-autocomplete";
import Address from "../addPlace/Address";
import SchoolFormValidation from "../../utils/SchoolFormValidation";

export default {
  name: "AddressWithFetch",
  props: ["location"],
  components: { Address, VuetifyGoogleAutocomplete },
  data() {
    return {
      loadingLocation: false,
      locationError: false,
      locationErrorText: "",
      var_location: this.location
    };
  },
  methods:{
    /**
     * Fetches location by using google's place api
     * After fetching the location it store location in the location variable
     */
    getAddressData: function(addressData, placeResultData) {
      this.location = SchoolFormValidation.getAddressData(addressData, placeResultData);
      this.loadingLocation = false;
      this.locationError = false;
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
            SchoolFormValidation.summarizeLocation(position)
              .then(result=>{
                this.loadingLocation = false;
                this.var_location = result.location;
              }).catch(result=>{
              this.loadingLocation = false;
              this.locationErrorText = result.locationErrorText;
              this.locationError = true;
            });
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
    }
  },
  watch: {
    var_location(val) {
      this.$emit("change-location", val);
    }
  }
};
</script>

<style scoped>
</style>
