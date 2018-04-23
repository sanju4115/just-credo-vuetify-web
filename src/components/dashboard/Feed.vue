<template>
  <v-card class="grey lighten-3">
    <v-jumbotron color="">
      <v-container fluid grid-list-md>
        <v-layout row wrap>
          <v-flex d-flex xs12 sm6 md4>
            <v-card color="purple" dark>
              <v-card-title primary class="title">Lorem</v-card-title>
              <v-card-text
                v-text="lorem">
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex d-flex xs12 sm6 md3>
            <v-layout row wrap>
              <v-flex d-flex>
                <v-card color="indigo" dark>
                  <v-card-text
                    v-text="lorem.slice(0, 70)">
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex d-flex>
                <v-layout row wrap>
                  <v-flex
                    d-flex
                    v-for="n in 2"
                    :key="n"
                    xs12
                  >
                    <v-card
                      color="red lighten-2"
                      dark
                    >
                      <v-card-text
                        v-text="lorem.slice(0, 40)">
                      </v-card-text>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex d-flex xs12 sm6 md2 child-flex>
            <v-card color="green lighten-2" dark>
              <v-card-text
                v-text="lorem.slice(0, 90)">
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex d-flex xs12 sm6 md3>
            <v-card color="blue lighten-2" dark>
              <v-card-text
                v-text="lorem.slice(0, 100)">
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-jumbotron>
    <v-container>
     <v-layout row wrap>
      <v-flex xs12 md8 sm12>
        <v-layout row wrap v-if="reviews" v-for="review in reviews" mb-3>
          <v-card style="width: 100%">
            <v-flex>
              <FeedSchoolHeader :schoolID="review.schoolID"></FeedSchoolHeader>
              <v-divider></v-divider>
            </v-flex>
            <v-flex>
              <app-user-header-link :uid="review.userID"></app-user-header-link>
              <v-divider></v-divider>
            </v-flex>
            <v-flex>
              <ReviewBody :review="review"></ReviewBody>
            </v-flex>
          </v-card>
        </v-layout>
        <v-layout>
          <v-flex>
            <infinite-loading @infinite="infiniteHandler" spinner="spiral">
              <span slot="no-more">
                <v-alert type="info" :value="true">
                      No more feeds !
                </v-alert>
              </span>
            </infinite-loading>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12 md4 sm12>
      </v-flex>
    </v-layout>
    </v-container>
  </v-card>
</template>

<script>
  import InfiniteLoading from 'vue-infinite-loading';
  import AppUserHeaderLink from "./FeedUserHeader";
  import db from "../../components/firebaseInit";
  import FeedSchoolHeader from "./FeedSchoolHeader";
  import ReviewBody from "./ReviewBody";
  export default {
    name: "Feed",
    components: {
      ReviewBody,
      FeedSchoolHeader,
      AppUserHeaderLink,
      InfiniteLoading
    },
    data: () => ({
      reviews: [],
      nextQuery:null,
      LIMIT:10,
      areaSelected:null,
      firstTime:true,
      lorem: `Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.`
    }),
    created:function () {
      this.areaSelected = this.$store.getters.areaSelected;
      this.nextQuery=db.collection("reviews")
        .where("geoHash."+this.areaSelected, "==", this.$store.getters.location[this.areaSelected])
        .orderBy("timestamp", "desc").limit(this.LIMIT);
    },
    methods: {
      infiniteHandler($state) {
        this.nextQuery.get()
          .then(querySnapshot => {
            const temp = [];
            querySnapshot.forEach(doc => {
              temp.push(doc.data());
            });

            this.reviews = this.reviews.concat(temp);
            $state.loaded();

            if (this.firstTime) {
              this.buildEvenListener();
              this.firstTime = false;
            }

            console.log(temp.length)
            if (temp.length < this.LIMIT) {
              $state.complete();
            }

            const lastVisible = querySnapshot.docs[querySnapshot.docs.length-1];
            console.log("last", lastVisible);

            this.nextQuery = db.collection("reviews")
              .where("geoHash."+this.areaSelected, "==", this.$store.getters.location[this.areaSelected])
              .orderBy("timestamp", "desc")
              .startAfter(lastVisible)
              .limit(this.LIMIT);

          })
          .catch(function(error) {
            console.log("Error getting documents: ", error);
          });
      },
      buildEvenListener(){
        db.collection("reviews")
          .where("geoHash."+this.areaSelected, "==", this.$store.getters.location[this.areaSelected])
          .orderBy("timestamp", "desc").limit(this.LIMIT)
          .onSnapshot(snapshot => {
            snapshot.docChanges.forEach(change => {
              if (change.type === "added") {
                const reviewExist = this.reviews.find(review => {
                  return review.id === change.doc.data().id;
                });

                if (!reviewExist) {
                  console.log("New review: ", change.doc.data());
                  this.reviews.unshift(change.doc.data());
                }
              }
            });
          });
      }
    }
    ,
    computed:{
      currentUser(){
        return this.$store.getters.user;
      }
    }
  }
</script>

<style scoped>
  .container {
    position: relative;
    font-family: Arial;
  }

  .text-block {
    position: absolute;
    bottom: 20px;
    right: 20px;
    background-color: black;
    color: white;
    padding-left: 20px;
    padding-right: 20px;
    opacity: 0.5;
    filter: alpha(opacity=50); /* For IE8 and earlier */
  }
</style>
