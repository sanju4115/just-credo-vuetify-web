<template>
  <v-card class="justify-center grey lighten-3">
    <v-container class="black lighten-1 colorPrimaryText--text" fluid>
      <div class="ml-5">
        <h3 class="welcome mt-3 pa-1 mb-1">{{currentUser.name}}</h3>
        <h3 class="welcome pa-1">Edit Your Profile Here !</h3>
      </div>
    </v-container>
    <v-container >
      <v-layout row wrap>
        <v-flex xs12 md4 sm12 pa-1>
          <v-card>
            <v-layout style="height: 10px" class="background">
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
            color="background"
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
    line-height: 3vh;
    font-size: 3vh;
    color: white;
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
