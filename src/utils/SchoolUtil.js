export default {
  getPlaceType: function(schoolType) {
    const PRIMARY_SCHOOL = "Primary School"; // 1
    const SECONDARY_SCHOOL = "Secondary School"; // 2
    const PRE_SCHOOL = "Pre School"; // 3
    const SPECIAL_SCHOOL = "Special School"; // 4
    const INTERNATIONAL_SCHOOL = "International School"; // 5
    const MUSIC_SCHOOL = "Music Class"; // 6
    const ART_SCHOOL = "Art Class"; // 7
    const SPORTS_SCHOOL = "Sports Class"; // 8
    const PRIVATE_TUTOR_SCHOOL = "Private Tutor"; // 9
    const COACHING_CLASS_SCHOOL = "Coaching Class"; // 10

    let placeType = {};

    schoolType.forEach(value => {
      if (value === PRIMARY_SCHOOL) {
        placeType["primarySchool"] = true;
      } else if (value === SECONDARY_SCHOOL) {
        placeType["secondarySchool"] = true;
      } else if (value === PRE_SCHOOL) {
        placeType["preSchool"] = true;
      } else if (value === SPECIAL_SCHOOL) {
        placeType["specialSchool"] = true;
      } else if (value === INTERNATIONAL_SCHOOL) {
        placeType["internationalSchool"] = true;
      } else if (value === MUSIC_SCHOOL) {
        placeType["musicClass"] = true;
      } else if (value === ART_SCHOOL) {
        placeType["artClass"] = true;
      } else if (value === SPORTS_SCHOOL) {
        placeType["sportsClass"] = true;
      } else if (value === PRIVATE_TUTOR_SCHOOL) {
        placeType["privateTutor"] = true;
      } else if (value === COACHING_CLASS_SCHOOL) {
        placeType["coachingClass"] = true;
      }
    });
    return placeType;
  }
};
