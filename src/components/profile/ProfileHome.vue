<template>
  <v-card class="justify-center grey lighten-3">
    <v-parallax src="static/images/banners/female_student_studying_in_library.jpg"
                height="550" style="margin-top: -64px" class=" secondary">
      <div class="homebanner">
        <v-layout row wrap fill-height align-center class="pa-5 text-xs-center text-md-left text-sm-left">
          <v-flex xs12>
            <v-layout align-center fill-height row wrap class="pa-5">
              <v-flex xs12 md10 sm10><h3 class="welcome">Manage Your Profile Here !</h3></v-flex>
              <v-flex xs12 md8 sm8>
                <span><p>We are transforming the way end users and educational institute used
                   <br/>to interact with each other by creating a
              digital ecosystem where they can interact with each other directly.</p></span>
              </v-flex>
              <v-flex xs12>
                <!--<div><h2>Next Generation Educational Networking</h2></div><br/>-->
                <!--<v-btn-->
                  <!--@click="scrollFunc()"-->
                  <!--large-->
                  <!--color="accent"-->
                  <!--class="mx-0">Start Experience</v-btn>-->
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </div>
    </v-parallax>
    <v-container style="margin-top: -10%">
      <v-layout row wrap>
        <v-flex xs12 md4 sm12 pa-1>
          <v-card>
            <v-layout style="height: 10px" class="accent">
              <div><br/></div>
            </v-layout>
            <v-card-media :src="profilePic" height="400px" >
            </v-card-media>
            <v-card-title primary-title class="justify-center text-xs-center">
              <div>
                <h3 class="headline mb-0">{{currentUser.name}}</h3>
                <div v-if="currentUser.description">{{currentUser.description}}</div>
              </div>
              <v-chip label class="justify-center white--text green" style="width: 100%">
                1
                Followers, 3 Following
              </v-chip>

              <v-chip label class="justify-center white--text green" style="width: 100%">
                1
                Reviews, 1 Bookmarks
              </v-chip>
            </v-card-title>
          </v-card>
        </v-flex>
        <v-flex xs12 md8 sm12 pa-1>
          <v-tabs
            color="accent"
            dark
            show-arrows>
            <v-tabs-slider color="background"></v-tabs-slider>
            <v-tab
              v-for="item in tabItems">
              {{ item.text }}
            </v-tab>
            <v-tabs-items class="nestedScroll">
              <v-tab-item>
                <Bookmarks :currentUser="currentUser"></Bookmarks>
              </v-tab-item>
              <v-tab-item lazy>
                <SharedReview></SharedReview>
              </v-tab-item>
              <v-tab-item lazy>
                <Followers></Followers>
              </v-tab-item>
              <v-tab-item lazy>
                <Followings></Followings>
              </v-tab-item>
              <v-tab-item lazy>
                <Manage></Manage>
              </v-tab-item>
            </v-tabs-items>
          </v-tabs>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
  import Bookmarks from "./Bookmarks";
  import SharedReview from "./SharedReview";
  import Followers from "./Followers";
  import Followings from "./Followings";
  import Manage from "./Manage";
  export default {
    name: "profileHome",
    components: {
      Manage,
      Followings,
      Followers,
      SharedReview,
      Bookmarks
    },
    data: function () {
      return {
        currentUser: this.$store.getters.user,
        profilePic:null,
        tabItems:[
          {
            text: "Bookmarks"
          },
          {
            text: "Reviews Shared"
          },
          {
            text: "Followers"
          },
          {
            text: "Following"
          },
          {
            text: "Manage"
          }
        ]
      };
    },
    created() {
      if(this.currentUser.profilePic === null || this.currentUser.profilePic === undefined){
        this.profilePic = "static/images/util/profile_picture_blank_portrait.png";
      }else {
        this.profilePic = this.currentUser.profilePic;
      }
    },
    mounted(){

    }
  }
</script>

<style scoped>
  @import url(https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,600,700);

  .homebanner{
    overflow: hidden;
    position: relative;
    width:120%;
    margin-right:-60px;
    margin-left:-30px;
    height: 120%;
    background: rgba(0, 0, 0, 0.6);
  }

  .welcome {
    font-family: "Roboto", sans-serif;
    font-weight: 800;
    line-height: 48px;
    margin-bottom: 2%;
    font-size: 43px;
    /*position: relative;*/
    /*white-space: nowrap;*/
    /*animation: floatText 1s alternate ease-in-out;*/
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
    font-weight: 400;
  }

  .nestedScroll {
    overflow: auto;
    height: 600px;
    display:block;
  }
</style>
