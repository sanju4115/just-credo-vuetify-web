<template>
  <v-card class="grey lighten-3">
    <v-parallax src="/static/images/banners/adding_place_banner.jpg" height="400">
      <v-layout row wrap justify-end>
        <v-flex md6 sm12 class="tilled justify-center">
          <v-layout align-center fill-height>
            <div style="margin-left: 150px;">
              <h2>Create your advertising profile
                <span>here</span></h2>
              <v-btn color="success" class="mt-3">Start Profile Creation</v-btn>
            </div>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-parallax>
    <v-container>
     <v-layout row wrap>
       <v-flex xs12>
         <v-expansion-panel popout row class="mt-1">
           <v-expansion-panel-content
             justify-center column
             hide-actions
             v-for="(message, i) in messages"
             :key="i" class="mb-3">
             <v-layout align-center row spacer slot="header">
               <v-flex xs4 sm2 md1>
                 <v-avatar
                   size="36px"
                   slot="activator">
                   <img
                     src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                     alt=""
                     v-if="message.avatar">
                   <v-icon :color="message.color" v-else>{{ message.icon }}</v-icon>
                 </v-avatar>
               </v-flex>
               <v-flex sm5 md3 hidden-xs-only>
                 <strong v-html="message.name"></strong>
                 <span class="grey--text" v-if="message.total">&nbsp;({{ message.total }})</span>
               </v-flex>
               <v-flex no-wrap xs5 sm3>
                 <v-chip
                   label
                   small
                   :color="`${message.color} lighten-4`"
                   class="ml-0"
                   v-if="message.new">{{ message.new }} new</v-chip>
                 <strong v-html="message.title"></strong>
               </v-flex>
               <v-flex
                 class="grey--text"
                 ellipsis
                 hidden-sm-and-down
                 v-if="message.excerpt">
                 &mdash;
                 {{ message.excerpt }}
               </v-flex>
             </v-layout>
             <v-card>
               <v-divider></v-divider>
               <v-card-text v-text="lorem"></v-card-text>
             </v-card>
           </v-expansion-panel-content>
         </v-expansion-panel>
       </v-flex>
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
      <v-flex xs12 md4 sm12 id="sponsored" class="pl-3">
        <Sponsored :category="category"></Sponsored>
      </v-flex>
    </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import InfiniteLoading from "vue-infinite-loading";
import AppUserHeaderLink from "./FeedUserHeader";
import db from "../../components/firebaseInit";
import FeedSchoolHeader from "./FeedSchoolHeader";
import ReviewBody from "./ReviewBody";
import Sponsored from "../place/Sponsored";
export default {
  name: "Feed",
  components: {
    Sponsored,
    ReviewBody,
    FeedSchoolHeader,
    AppUserHeaderLink,
    InfiniteLoading
  },
  data: () => ({
    reviews: [],
    nextQuery: null,
    LIMIT: 10,
    areaSelected: null,
    firstTime: true,
    sticky:null,
    sponsored:null,
    reviewSubscription:null,
    category:{
      key:"primarySchool",
      name:"Popular And Sponsored"
    },
    messages: [
      {
        avatar: "https://avatars0.githubusercontent.com/u/9064066?v=4&s=460",
        name: "John Leider",
        title: "Welcome to JustCredo!",
        excerpt: "Thank you for joining our community..."
      }
    ],
    lorem:
      "Lorem ipsum dolor sit amet, at aliquam vivendum vel, everti delicatissimi cu eos. Dico iuvaret debitis mel an, et cum zril menandri. Eum in consul legimus accusam. Ea dico abhorreant duo, quo illum minimum incorrupte no, nostro voluptaria sea eu. Suas eligendi ius at, at nemore equidem est. Sed in error hendrerit, in consul constituam cum."
  }),
  created: function() {
    this.areaSelected = this.$store.getters.areaSelected;
    this.nextQuery = db
      .collection("reviews")
      .where(
        "geoHash." + this.areaSelected,
        "==",
        this.$store.getters.location[this.areaSelected]
      )
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
            temp.push(doc.data());
          });
          this.reviews = this.reviews.concat(temp);
          $state.loaded();
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
            .where(
              "geoHash." + this.areaSelected,
              "==",
              this.$store.getters.location[this.areaSelected]
            )
            .orderBy("timestamp", "desc")
            .startAfter(lastVisible)
            .limit(this.LIMIT);
        })
        .catch(function(error) {
          console.log("Error getting documents: ", error);
        });
    },
    buildEvenListener() {
      this.reviewSubscription = db
        .collection("reviews")
        .where(
          "geoHash." + this.areaSelected,
          "==",
          this.$store.getters.location[this.areaSelected]
        )
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
    },
    onScroll (e) {
      this.offsetTop = window.pageYOffset || document.documentElement.scrollTop;
      if (this.offsetTop >= this.sticky) {
        this.sponsored.classList.add("sticky")
      } else {
        this.sponsored.classList.remove("sticky");
      }
    }
  },
  mounted() {
    this.sponsored = document.getElementById("sponsored");
    this.sticky = this.sponsored.offsetTop;
  },
  computed: {
    currentUser() {
      return this.$store.getters.user;
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
  }
};
</script>

<style scoped>
  .sticky {
    //position: fixed;
    justify-content: end;
    right: 0;
    top: 0;
  }

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
    content: '';
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
