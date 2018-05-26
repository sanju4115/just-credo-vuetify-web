import Util from "./Util";
import LocationUtil from "./LocationUtil";
import Geohash from "latlon-geohash";

export default {
  validateBoardAndClass: function(boards, classes) {
    if (boards.length <= 0) {
      return {
        valid: false,
        errorText: "Please select at least one board.",
        errorSnackbar: true
      };
    } else if (classes.length <= 0) {
      return {
        valid: false,
        errorText: "Please select at least one class.",
        errorSnackbar: true
      };
    } else {
      return {
        valid: true
      };
    }
  },
  validateFacilityAndExtraCurricullar: function(
    specialFacilities,
    facilities,
    extracurricular
  ) {
    if (specialFacilities.length <= 0) {
      return {
        valid: false,
        errorText: "Please select at least one special facility.",
        errorSnackbar: true
      };
    } else if (facilities.length <= 0) {
      return {
        valid: false,
        errorText: "Please select at least one facility.",
        errorSnackbar: true
      };
    } else if (extracurricular.length <= 0) {
      return {
        valid: false,
        errorText: "Please select at least one extracurricular activity.",
        errorSnackbar: true
      };
    } else {
      return {
        valid: true
      };
    }
  },
  validateDescription: function(
    schoolName,
    email,
    mobile,
    website,
    description,
    location
  ) {
    if (schoolName.trim() === "") {
      return {
        valid: false,
        errorText: "Please enter valid educational place name.",
        errorSnackbar: true
      };
    } else if (email.trim() === "" || !Util.validateEmail(email)) {
      return {
        valid: false,
        errorText: "Please enter valid email.",
        errorSnackbar: true
      };
    } else if (mobile.trim() === "" || !Util.validatePhoneNumber(mobile)) {
      return {
        valid: false,
        errorText: "Please enter valid mobile or phone number.",
        errorSnackbar: true
      };
    } else if (website.trim() !== "" && !Util.isUrl(website)) {
      return {
        valid: false,
        errorText: "Please enter valid website.",
        errorSnackbar: true
      };
    } else if (description.trim() === "" || description.trim().length < 100) {
      return {
        valid: false,
        errorText:
          "Description should be more than 100 characters. It helps in better user experience.",
        errorSnackbar: true
      };
    } else if (location === null || location.formatted_address.trim() === "") {
      return {
        valid: false,
        errorText:
          "Please select address for this place either " +
          "by searching the address or by using current location",
        errorSnackbar: true
      };
    } else {
      return {
        valid: true
      };
    }
  },
  validateTypeAndGender: function(schoolType, genderList) {
    if (schoolType.length <= 0) {
      return {
        valid: false,
        errorText: "Please select at least one type.",
        errorSnackbar: true
      };
    } else if (genderList.length <= 0) {
      return {
        valid: false,
        errorText: "Please select at least one from gender list.",
        errorSnackbar: true
      };
    } else {
      return {
        valid: true
      };
    }
  },
  validateCoverPicAndSubmit: function(coverPic) {
    if (
      coverPic.getChosenFile() === null ||
      coverPic.getChosenFile() === undefined
    ) {
      return {
        valid: false,
        errorText: "Please select cover pic for the educational place.",
        errorSnackbar: true
      };
    } else {
      return {
        valid: true
      };
    }
  },

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
    return location;
  },

  extractGeoHasH: function (geocoder, latlng, position, geohash150, geohash50, geohash5, geohash1) {
    return new Promise((resolve, reject) => {
      geocoder.geocode({location: latlng}, (results, status) => {
        if (status === "OK") {
          console.log("ok")
          if (results[0]) {
            let location = LocationUtil.deduceLocation(results[0]);
            console.log(location)
            location.latitude = position.coords.latitude;
            location.longitude = position.coords.longitude;
            location.geohash150 = geohash150;
            location.geohash50 = geohash50;
            location.geohash5 = geohash5;
            location.geohash1 = geohash1;
            resolve({
              success: true,
              location: location
            });
          } else {
            reject({
              success: false,
              locationErrorText: "No results found"
            });
          }
        } else {
          reject({
            success: false,
            locationErrorText: "Geocoder failed due to: " + status
          });
        }
      });
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
    console.log(position)
    return this.extractGeoHasH(geocoder, latlng, position, geohash150, geohash50, geohash5, geohash1);
  },
};
