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
          }
        });
      });
      return address;
    }
  }
};
