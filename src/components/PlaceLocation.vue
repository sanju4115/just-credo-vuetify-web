<template>
  <v-card class="grey darken-4" dark>
    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0">Enter Location Where You Want To Explore</h3>
        <div>This help us in showing you contents <br>in near by your location.</div>
      </div>
    </v-card-title>
    <vuetify-google-autocomplete
      id="map"
      append-icon="search"
      solo inverted light
      types='(cities)'
      placeholder="Search Address"
      v-on:placechanged="getAddressData"
      country="in">
    </vuetify-google-autocomplete>
    <v-layout align-center text-xs-center row wrap>
      <v-flex xs12 sm12 text-xs-center>
        <div>
          <v-btn class="justify-center" color="success" @click.stop="fetchUserLocation">Enable Location & Start</v-btn>
        </div>
      </v-flex>
      <v-flex v-if="loading" xs12 sm12 class="text-xs-center">
        <v-progress-circular
          indeterminate
          class="background--text"
          :width="7"
          :size="30"
        ></v-progress-circular>
        <p>Fetching Location</p>
      </v-flex>
    </v-layout>
    <v-container>
      <v-layout row v-if="locationError">
        <v-flex>
          <app-alert-error @dismissed="onDismissedLocationError" :text="locationError.message"></app-alert-error>
        </v-flex>
      </v-layout>
    </v-container>
    <v-card-actions class="align-content-end justify-end">
      <v-btn v-if="!loading && location"
        color="accent"
        @click.stop="onClose">
        Close
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import VuetifyGoogleAutocomplete from "vuetify-google-autocomplete";
export default {
  name: "PlaceLocation",
  components: { VuetifyGoogleAutocomplete },
  methods: {
    /**
     * Fetches location by using google's place api
     * After fetching the location it store location in the store
     */
    getAddressData: function(addressData, placeResultData) {
      this.$store.dispatch("saveLocation", {
        addressData: addressData,
        placeResultData: placeResultData
      }).then(response => {
        this.$emit("locationSaved");
      }, error => {
        console.error(error)
      })
    },
    onClose() {
      this.$emit("closeLocationPopup");
    },
    /**
     * Fetches user current location
     * if user allows browser to fetch location,
     * if user do not allow browser to fetch location
     * then it will show error message
     *
     * After fetching the location it store location in the store
     */
    fetchUserLocation() {
      this.$store.dispatch("fetchUserLocation").then(response => {
        this.$emit("locationSaved");
      }, error => {
        console.error(error)
      });
    },
    onDismissedLocationError() {
      this.$store.dispatch("clearLocationError");
    }
  },
  computed: {
    locationError() {
      return this.$store.getters.locationError;
    },
    loading() {
      return this.$store.getters.loading;
    },
    location() {
      return this.$store.getters.location;
    }
  }
};
</script>

<style scoped>
</style>
