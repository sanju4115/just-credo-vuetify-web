import Geohash from "latlon-geohash";

export default {
  deduceLocation: function(place) {
    let address = {};
    const address_components = place.address_components;
    address.formatted_address = place.formatted_address;
    if (address_components !== null && address_components !== undefined) {
      address_components.forEach(mergeData => {
        mergeData.types.forEach(data => {
          if (data === "sublocality_level_2") {
            address.sublocality_level_2 = mergeData.long_name;
          } else if (data === "sublocality_level_1") {
            address.sublocality_level_1 = mergeData.long_name;
          } else if (data === "locality") {
            address.locality = mergeData.long_name;
          } else if (data === "administrative_area_level_1") {
            address.administrative_area_level_1 = mergeData.long_name;
          } else if (data === "country") {
            address.country = mergeData.long_name;
          } else if (data === "postal_code") {
            address.postal_code = mergeData.long_name;
          }
        });
      });
      return address;
    }
  },
  fromLatLongToAddress: function(latitude, longitude) {
    return new Promise((resolve, reject) => {
      const geohash150 = Geohash.encode(latitude, longitude, 3);
      const geohash50 = Geohash.encode(latitude, longitude, 4);
      const geohash5 = Geohash.encode(latitude, longitude, 5);
      const geohash1 = Geohash.encode(latitude, longitude, 6);
      const geocoder = new google.maps.Geocoder();
      const latlng = {
        lat: latitude,
        lng: longitude
      };
      geocoder.geocode({location: latlng}, (results, status)=> {
        if (status === "OK") {
          if (results[0]) {
            console.log(results[0].formatted_address);
            console.log(results[0]);
            let location = this.deduceLocation(results[0]);
            location.latitude = latitude;
            location.longitude = longitude;
            location.geohash150 = geohash150;
            location.geohash50 = geohash50;
            location.geohash5 = geohash5;
            location.geohash1 = geohash1;
            resolve({data: location});
          } else {
            reject({data: "No results found"});
          }
        } else {
          reject({data: "Geocoder failed due to: " + status});
        }
      });
    });
  }
};













// #   km
// 1   ±2500
// 2   ±630
// 3   ±78
// 4   ±20
// 5   ±2.4
// 6   ±0.61
// 7   ±0.076
// 8   ±0.019
// 9   ±0.0024
// 10  ±0.00060
// 11  ±0.000074
