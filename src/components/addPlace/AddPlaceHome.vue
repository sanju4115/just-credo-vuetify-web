<template>
    <v-card class="grey lighten-3">
      <v-parallax src="/static/images/banners/edu.jpg" height="400">
        <v-layout row wrap justify-end>
          <v-flex md6 sm12 class="tilled justify-center">
            <v-layout align-center fill-height>
              <div style="margin-left: 150px;">
                <h2>Create your advertising profile
                  <span>here</span></h2>
                <a href="#addForm" style="text-decoration:none">
                  <v-btn color="success" class="mt-3">Start Profile Creation</v-btn>
                </a>
              </div>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-parallax>
      <v-layout row wrap>
        <v-flex md12 class="primary background--text pa-5">
          <div>
            <p style="font-weight: bold">Owners of schools, coaching, music classes, sports classes, art classes and
              private/home tutors can create their advertising profile very easily.
              They just need to fill up a form after selecting a
              appropriate option and their profile will be visible to the end users as soon as they save and submit it.</p>
            <span><i class="fa fa-check"></i>
            Profile contents can be updated at any time in future by themselves
          </span>
            <br/>
            <span>
            <i class="fa fa-check"></i>
            Mention about the facilities and key features
          </span>
            <br/>
            <span>
            <i class="fa fa-check"></i>
            Blogs can be shared, people can like and comment on it
          </span>
            <br/>
            <span>
            <i class="fa fa-check"></i>
            Pictures can be uploaded and will be visible in gallery section
          </span>
            <br/>
            <span>
            <i class="fa fa-check"></i>
            Get notified when people bookmark your advertising profile.
          </span>
          </div>
        </v-flex>
        <v-flex xs12>
          <v-alert color="primary" icon="info" :value="true" class="mt-0" style="font-weight: bold">
            Start the form submission by selecting the type of educational place.
          </v-alert>
        </v-flex>
        <v-flex xs12 md4 sm6 class="background pl-5" id="addForm">
          <v-subheader class="title mt-2 mb-3 colorPrimaryText--text">Choose the type of Educational Place</v-subheader>
        </v-flex>
        <v-flex xs12 md8 sm6 class="background pr-5 pl-5 text-xs-center">
          <v-select
            class="mt-2 mb-2"
            solo inverted
            :items="placeTypes"
            label="Select"
            single-line
            @change="placeTypeSelected"
          ></v-select>
        </v-flex>
      </v-layout>

      <!--<v-btn color="primary" @click.stop="location">Submit</v-btn>-->
      <v-container>
        <SchoolForm v-if="selectedType==='School'"></SchoolForm>
        <MusicClassForm v-else-if="selectedType==='Music School'"></MusicClassForm>
      </v-container>
    </v-card>
</template>

<script>
  import SchoolForm from "./SchoolForm";
  import db from "../../components/firebaseInit";
  import LocationUtil from "../../utils/LocationUtil";
  import MusicClassForm from "./MusicClassForm";

  export default {
  name: "AddPlaceHome",
    components: {MusicClassForm, SchoolForm},
    data() {
    return {
      placeTypes:["School","Coaching","Music School","Sports School", "Art School","Private/Home Tutors"],
      selectedType:null
    };
  },
  methods:{
    /**
     *
     * @param value gives the value of selected place type
     *
     */
    placeTypeSelected(value){
      this.selectedType=value;
    },
    location(){
      db.collection("schools").doc("-L78UkWyK3E_RcWA20sK")
        .get().then(doc => {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          LocationUtil.fromLatLongToAddress(doc.data().latitude,doc.data().longitude).then(response => {
            doc.ref.update({"location": response.data})
              .then(function() {
                console.log("Document successfully updated!");
              })
              .catch(function(error) {
                console.error("Error updating document: ", error);
              });
          }, error => {
            console.error(error)
          });

        } else {
          console.log("No such document!");
        }
      }).catch(function(error) {
        console.log("Error getting document:", error);
      });
    }
  }
};
</script>

<style scoped>

.tilled div {
  font-family: "Gudea", sans-serif;
}

.tilled p {
  font-family: "Magra", sans-serif;
}

.tilled {
  position: relative;
  display: inline-block;
  padding: 1em 5em 1em 1em;
  overflow: hidden;
  color: #fff;
  margin-right: -30px;
}

.tilled:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  -webkit-transform-origin: 100% 0;
  -ms-transform-origin: 100% 0;
  transform-origin: 100% 0;
  -webkit-transform: skew(15deg);
  -ms-transform: skew(15deg);
  transform: skew(15deg);
  z-index: -1;
}
</style>
