<template>
    <v-card class="grey lighten-3">
      <div class="secondary">
        <v-parallax src="static/images/banners/rsz_1_xvjg3i1j5fhpdx961bbsvq.jpg"
                    height="650" style="margin-top: -64px;" class="secondary">
          <div class="homebanner">
            <v-layout row wrap class="pa-5 text-xs-center justify-center">
              <v-flex xs12>
                <v-layout align-center fill-height row wrap class="pa-5 mt-5 justify-center">
                  <v-flex xs12>
                    <div>
                      <h3 class="welcome">Create Your Advertising Profile !</h3>
                    </div>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs6 class="transparent text-xs-center justify-center">
                <v-select
                  class="mt-2 mb-2"
                  solo inverted
                  :items="placeTypes"
                  label="Choose the type of educational place"
                  single-line
                  @change="placeTypeSelected"></v-select>
                  <v-btn color="success" class="mt-3"
                         @click="checkType">Start Profile Creation</v-btn>

              </v-flex>
            </v-layout>
          </div>
        </v-parallax>
      </div>
      <v-layout row wrap id="addForm">
        <v-flex md12 class="secondary slanted background--text pa-5">
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
      </v-layout>
      <!--<v-btn color="primary" @click.stop="location">Submit</v-btn>-->
      <v-container>
        <SchoolForm v-if="selectedType==='School'"></SchoolForm>
        <MusicClassForm v-else-if="selectedType==='Music School'"></MusicClassForm>
      </v-container>
      <v-snackbar
        color="error"
        bottom
        v-model="errorSnackbar">
        {{ errorText }}
        <v-btn dark flat @click.native="errorSnackbar = false">Close</v-btn>
      </v-snackbar>
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
      selectedType:null,
      errorSnackbar:false,
      errorText:""
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
    checkType(){
      this.errorSnackbar = false;
      if (this.selectedType === null) {
        this.errorText="Select type of educational place!";
        this.errorSnackbar = true;
      }else {
        this.$SmoothScroll(document.getElementById('addForm'));
      }
    },
    location(){
      let batch = db.batch();
      db.collection("schools").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          batch.update(doc.ref,{published:true});
          console.log(doc.id, " => ", doc.data());
        });

        batch.commit().then(function () {
          console.log("all schools published");
        });
      });


      /*db.collection("schools").doc("-L78UkWyK3E_RcWA20sK")
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
      });*/
    }
  }
};
</script>

<style scoped>

  .homebanner{
    overflow: hidden;
    position: relative;
    width:110%;
    margin-right:-30px;
    margin-left:-30px;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }

  .welcome {
    font-family: "Roboto", sans-serif;
    font-weight: 800;
    line-height: 48px;
    margin-bottom: 2%;
    font-size: 43px;
  }

  .homebanner span {
    letter-spacing: 1px;
    font-size: 15px;
    font-weight: 400;
  }
  .homebanner h2 {
    font-family: "Roboto", sans-serif;
    line-height: 45px;
    letter-spacing: 1px;
    font-size: 25px;
    font-weight: bold;
  }

  .slanted {
    clip-path: polygon(0 0, 1600px 0, 1600px 75%, 0 100%);
  }


</style>
