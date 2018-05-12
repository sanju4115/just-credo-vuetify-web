<template>
  <v-card flat class="elevation-24" height="600">
    <v-container>
      <v-flex xs12>
        <v-layout row wrap v-if="reviews" v-for="review in reviews" mb-3>
          <v-card style="width: 100%">
            <v-flex>
              <FeedSchoolHeader :schoolID="review.schoolID"></FeedSchoolHeader>
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
              <span slot="no-results">
                <v-layout row wrap class="align-center">
                  <v-flex xs12>
                    <Message message="You have not reviewed any place yet."></Message>
                  </v-flex>
                </v-layout>
              </span>
              <span slot="no-more">
                <v-alert type="info" :value="true">
                      No more feeds !
                </v-alert>
              </span>
            </infinite-loading>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-container>
  </v-card>
</template>

<script>
import InfiniteLoading from "vue-infinite-loading";
import db from "../../components/firebaseInit";
import FeedSchoolHeader from "../dashboard/FeedSchoolHeader";
import ReviewBody from "../dashboard/ReviewBody";
import Message from "../utils/Message";

export default {
  name: "SharedReview",
  components: {
    Message,
    ReviewBody,
    FeedSchoolHeader,
    InfiniteLoading
  },
  data: () => ({
    reviews: [],
    nextQuery: null,
    LIMIT: 10,
    areaSelected: null,
    firstTime: true,
    reviewSubscription:null
  }),
  created: function() {
    console.log("Created")
    this.areaSelected = this.$store.getters.areaSelected;
    this.nextQuery = db
      .collection("reviews")
      .where("userID","==",this.$store.getters.user.uid)
      .orderBy("timestamp", "desc")
      .limit(this.LIMIT);
  },
  methods: {
    infiniteHandler($state) {
      this.nextQuery
        .get()
        .then(querySnapshot => {
          const temp = [];
          querySnapshot.forEach(doc => {
            $state.loaded();
            temp.push(doc.data());
          });
          this.reviews = this.reviews.concat(temp);
          if (this.firstTime) {
            this.buildEvenListener();
            this.firstTime = false;
          }
          if (temp.length < this.LIMIT) {
            $state.complete();
          }
          const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
          this.nextQuery = db
            .collection("reviews")
            .orderBy("timestamp", "desc")
            .startAfter(lastVisible)
            .limit(this.LIMIT);
        })
        .catch(function(error) {
          console.log("Error getting documents: ", error);
        });
    },
    buildEvenListener() {
      this.reviewSubscription = db.collection("reviews")
        .where("userID","==",this.$store.getters.user.uid)
        .orderBy("timestamp", "desc")
        .limit(this.LIMIT)
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
  },

  /**
   * Called before destroying this component
   *
   * un-subscribing from database listeners
   */
  beforeDestroy() {
    if (this.reviewSubscription !== null) {
      this.reviewSubscription();
    }
  },
  mounted() {
  },
  computed: {
  }
};
</script>

<style scoped>
</style>
