<template>
  <v-card class="grey lighten-3 elevation-0">
    <v-container v-if="loading || loadingFormData">
      <v-layout style="width: 100%">
        <v-flex xs12 class="text-xs-center">
          <v-progress-circular
            indeterminate
            class="accent--text"
            :width="3"
            :size="30"
          ></v-progress-circular>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container v-else pa-0 ma-0 fluid>
      <v-jumbotron color="blue lighten-2" height="100">
      <div class="ml-5">
        <h3 class="welcome mt-3 pa-1 mb-1">Admin Dashboard</h3>
        <h3 class="welcome pa-1">{{model.name}}</h3>
      </div>
      </v-jumbotron>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12 sm8>
            <v-card>
              <ChangeCoverPic
                :model="model"
                @picUploaded="coverPicUploaded"></ChangeCoverPic>
              <v-container>
                <CategoriesAndGender
                  :categories="formData.categories"
                  :school-type="schoolType"
                  :genders="formData.gender"
                  :gender-list="genderList"
                  @change-schoolType="schoolType = $event"
                  @change-genderList="genderList = $event"></CategoriesAndGender>
                <Description
                  :school-name="schoolName" @change-schoolName="schoolName = $event"
                  :mobile="mobile" @change-mobile="mobile = $event"
                  :email="email" @change-email="email = $event"
                  :website="website" @change-website="website = $event"
                  :description="description" @change-description="description = $event"></Description>
                <AddressWithFetch
                  :location="location"
                  @change-location="location = $event"></AddressWithFetch>
              </v-container>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
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
import db from "../firebaseInit";
import ChangeCoverPic from "../utils/ChangeCoverPic";
import CategoriesAndGender from "../formUtil/CategoriesAndGender";
import Description from "../formUtil/Description";
import AddressWithFetch from "../formUtil/AddressWithFetch";


export default {
  name: "Approval",
  components: {AddressWithFetch, Description, CategoriesAndGender, ChangeCoverPic},
  data() {
    return {
      loading: true,
      model: null,
      errorSnackbar: false,
      errorText: "",
      successSnackBar:false,
      successText:null,
      formData: null,
      schoolType: [],
      genderList: [],
      schoolName: "",
      email: "",
      website: "",
      mobile: "",
      location: null,
      description: "",
      boards: [],
      classes: [],
      facilities: [],
      specialFacilities: [],
      extracurricular: [],
      imageUrl: "",
      coverPic: {},
      savingDialogue: false,
      loadingFormData: true,
    };
  },
  created() {
    const id = this.$route.params.id;
    const docRef = db.collection("draft_schools").doc(id);
    docRef
      .get()
      .then(doc => {
        if (doc.exists) {
          this.loading = false;
          this.model = doc.data();
          console.log("Document data:", doc.data());
          this.coverPic = this.model.coverPic;
          this.schoolType = Object.keys(this.model.categories);
          this.genderList = Object.keys(this.model.gender);
          this.schoolName = this.model.name;
          this.email = this.model.mail;
          this.website = this.model.website;
          this.mobile = this.model.mobileNumber;
          this.location = this.model.location;
          this.description = this.model.description;
          this.boards = Object.keys(this.model.boards);
          this.classes = Object.keys(this.model.classes);
          this.facilities = Object.keys(this.model.facilities);
          this.specialFacilities = Object.keys(this.model.specialFacilities);
          this.extracurricular = Object.keys(this.model.extracurricular);
        } else {
          this.loading = false;
          this.errorText = "No such approval!";
          this.errorSnackbar = true;
        }
      })
      .catch(error => {
        this.loading = false;
        this.errorText = error.message;
        this.errorSnackbar = true;
      });

    /**
     * Queries on thd db to fetch school form data
     */
    db
      .collection("filter")
      .doc("schoolFilters")
      .get()
      .then(doc => {
        if (doc.exists) {
          this.loadingFormData = false;
          this.formData = doc.data();
          console.log(this.formData);
        } else {
          this.loadingFormData = false;
          this.$router.push(`/error?error=${"No such document!"}`);
        }
      })
      .catch(error => {
        this.loadingFormData = false;
        this.$router.push(`/error?error=${error}`);
      });
  },
  methods: {
    coverPicUploaded(url){
      this.model.coverPic = url;
    }
  }
};
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
