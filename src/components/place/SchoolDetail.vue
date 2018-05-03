<template>
  <v-card flat class="elevation-24">
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card class="elevation-0">
            <v-card-title primary-title>
              <div class="review">
                <div class="headline">{{model.name}}</div>
                <span class="grey--text">{{model.location.formatted_address}}</span>
              </div>
              <v-spacer></v-spacer>
              <v-chip disabled color="green" text-color="white">
                <v-avatar>
                  <v-icon>check_circle</v-icon>
                </v-avatar>
                Verified
              </v-chip>
            </v-card-title>
            <v-card-actions>
              <v-btn flat color="colorPrimaryText">Share</v-btn>
              <v-btn flat color="purple">Explore</v-btn>
              <v-spacer></v-spacer>
              <v-btn icon @click.native="show = !show" color="accent">
                <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
              </v-btn>
            </v-card-actions>
            <v-slide-y-transition>
              <v-card-text v-show="show">
                {{model.description}}
              </v-card-text>
            </v-slide-y-transition>
          </v-card>
        </v-flex>
        <v-flex>
          <v-divider></v-divider>
          <v-card class="elevation-0">
            <v-container v-if="model.noOfRating !== 0 && model.noOfRating !== null && model.noOfRating !== undefined">
              <v-layout row>
                <v-flex sm2 class="mr-2">
                  <v-chip disabled color="accent" text-color="white" >
                    {{model.rating}}
                    <v-icon right small>star</v-icon>
                  </v-chip>
                </v-flex>
                <v-flex sm8>
                  <div>Based on {{model.noOfRating}} ratings</div>
                  <div>Weighted average based on user's credibility on JustCredo.</div>
                </v-flex>
              </v-layout>
            </v-container>
            <v-divider light></v-divider>
            <v-container>
              <v-layout class="align-center">
                <v-flex sm1 xs1>
                  <v-avatar
                    class="grey lighten-4">
                    <img src="/static/apple-touch-icon-180x180.png" alt="avatar">
                  </v-avatar>
                </v-flex>
                <v-flex sm11 xs8>
                  <v-container>
                    <v-flex class="review">
                      <div>Sanjay Kumar reviewed it.</div>
                      <div style="font-weight: bold">Read all reviews.</div>
                    </v-flex>
                  </v-container>
                </v-flex>
              </v-layout>
            </v-container>
            <v-divider></v-divider>
            <v-container>
              <v-layout class="align-center text-xs-center">
                <v-flex sm8 xs8 md6 class="review">
                  <div class="headline">How was your experience?</div>
                  <div>Tell everyone about it.</div>
                </v-flex>
                <v-flex sm4 xs4>
                  <v-btn color="success">Write Review</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
            <v-divider></v-divider>
            <v-container>
              <v-layout row wrap>
                <v-flex sm6 v-if="model.categories !== null && model.categories !== undefined">
                  <v-list dense>
                    <div class="heading ml-3" style="font-weight: bold">Categories</div>
                    <v-list-tile v-for="(item,i) in Object.keys(model.categories)" :key="i">
                      <v-list-tile-action>
                        <v-icon color="blue">star</v-icon>
                      </v-list-tile-action>
                      <v-list-tile-content>
                        <v-list-tile-title v-text="item"></v-list-tile-title>
                      </v-list-tile-content>
                    </v-list-tile>
                  </v-list>
                </v-flex>
                <v-flex sm6 v-if="model.gender !== null && model.gender !== undefined">
                  <v-list dense>
                    <div class="heading ml-3" style="font-weight: bold">Type</div>
                    <v-list-tile v-for="(item,i) in Object.keys(model.gender)" :key="i" class="ma-0">
                      <v-list-tile-action>
                        <v-icon color="blue">star</v-icon>
                      </v-list-tile-action>
                      <v-list-tile-content dense>
                        <v-list-tile-title v-text="item"></v-list-tile-title>
                      </v-list-tile-content>
                    </v-list-tile>
                  </v-list>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "SchoolDetail",
  props: ["model"],
  data: () => ({
    show: false
  })
};
</script>

<style scoped>
  .review div{
    font-family: 'Gudea', sans-serif;
  }

  .review p{
    font-family: 'Magra', sans-serif;
  }
</style>
