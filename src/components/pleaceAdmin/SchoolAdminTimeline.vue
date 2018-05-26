<template>
  <v-layout row wrap>
    <v-layout style="width: 100%" v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular
          indeterminate
          class="accent--text"
          :width="3"
          :size="30"
        ></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout v-else>
      <v-flex xs12 sm4 pt-2 pr-2>
        <v-card>
          <v-card-title primary-title pa-0>
            <div class="mb-2">
            <span>
            <v-icon medium>insert_chart</v-icon>
            <span style="color: black;font-weight: bold">Description</span>
          </span>
            </div>
            <div class="text-xs-center mb-2">
              <h3 class="subheading mb-2">{{model.name}}</h3>
              <div class="caption">{{model.description}}</div>
            </div>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-title primary-title pa-0>
            <div class="mb-2">
            <span>
            <v-icon medium>location_on</v-icon>
            <span style="color: black;font-weight: bold">Address</span>
          </span>
            </div>
            <div class="text-xs-center mb-2">
              <h3 class="subheading mb-2">{{model.location.formatted_address}}</h3>
            </div>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-title primary-title pa-0>
            <div class="mb-2">
            <span>
            <v-icon medium>insert_photo</v-icon>
            <span style="color: black;font-weight: bold">Photos</span>
          </span>
            </div>
            <ImageListView :images="Object.values(model.images)"></ImageListView>
          </v-card-title>
        </v-card>
      </v-flex>
      <v-flex xs12 sm8>
        <v-layout row wrap>
          <v-flex xs12>
            <v-expansion-panel popout row>
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
          <v-flex xs12 mb-2 v-if="model.specialFacilities !== null && model.specialFacilities !== undefined">
            <v-card class="pa-3">
              <div class="heading" style="font-weight: bold">Special Facilities</div>
              <v-container fluid v-bind="{ [`grid-list-xs`]: true }">
                <v-layout row wrap>
                  <v-flex
                    sm3 xs6
                    v-for="(item,i) in Object.keys(model.specialFacilities)" :key="i">
                    <TextWithStar icon="star" :text="item"></TextWithStar>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
          <v-flex mb-2 v-if="model.extracurricular !== null && model.extracurricular !== undefined">
            <v-card class="pa-3">
              <div class="heading" style="font-weight: bold">Extracurricular Activities</div>
              <v-container fluid v-bind="{ [`grid-list-xs`]: true }">
                <v-layout row wrap>
                  <v-flex
                    sm3 xs6
                    v-for="(item,i) in Object.keys(model.extracurricular)" :key="i">
                    <TextWithStar icon="star" :text="item"></TextWithStar>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
          <v-flex mb-2 v-if="model.facilities !== null && model.facilities !== undefined">
            <v-card class="pa-3">
              <div class="heading" style="font-weight: bold">Facilities</div>
              <v-container fluid v-bind="{ [`grid-list-xs`]: true }">
                <v-layout row wrap>
                  <v-flex
                    sm3 xs6
                    v-for="(item,i) in Object.keys(model.facilities)" :key="i">
                    <TextWithStar icon="star" :text="item"></TextWithStar>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
          <v-flex mb-2 v-if="model.classes !== null && model.classes !== undefined">
            <v-card class="pa-3">
              <div class="heading" style="font-weight: bold">Classes</div>
              <v-container fluid v-bind="{ [`grid-list-xs`]: true }">
                <v-layout row wrap>
                  <v-flex
                    sm3 xs6
                    v-for="(item,i) in Object.keys(model.classes)" :key="i">
                    <TextWithStar icon="star" :text="item"></TextWithStar>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
          <v-flex mb-2 v-if="model.classesType !== null && model.classesType !== undefined">
            <v-card class="pa-3">
              <div class="heading" style="font-weight: bold">Classes</div>
              <v-container fluid v-bind="{ [`grid-list-xs`]: true }">
                <v-layout row wrap>
                  <v-flex
                    sm3 xs6
                    v-for="(item,i) in Object.keys(model.classesType)" :key="i">
                    <TextWithStar icon="star" :text="item"></TextWithStar>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
          <v-flex mb-2 v-if="model.singing !== null && model.singing !== undefined">
            <v-card class="pa-3">
              <div class="heading" style="font-weight: bold">Singing</div>
              <v-container fluid v-bind="{ [`grid-list-xs`]: true }">
                <v-layout row wrap>
                  <v-flex
                    sm3 xs6
                    v-for="(item,i) in Object.keys(model.singing)" :key="i">
                    <TextWithStar icon="star" :text="item"></TextWithStar>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
          <v-flex mb-2 v-if="model.dancing !== null && model.dancing !== undefined">
            <v-card class="pa-3">
              <div class="heading" style="font-weight: bold">Dancing</div>
              <v-container fluid v-bind="{ [`grid-list-xs`]: true }">
                <v-layout row wrap>
                  <v-flex
                    sm3 xs6
                    v-for="(item,i) in Object.keys(model.dancing)" :key="i">
                    <TextWithStar icon="star" :text="item"></TextWithStar>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
          <v-flex mb-2 v-if="model.instruments !== null && model.instruments !== undefined">
            <v-card class="pa-3">
              <div class="heading" style="font-weight: bold">Instruments</div>
              <v-container fluid v-bind="{ [`grid-list-xs`]: true }">
                <v-layout row wrap>
                  <v-flex
                    sm3 xs6
                    v-for="(item,i) in Object.keys(model.instruments)" :key="i">
                    <TextWithStar icon="star" :text="item"></TextWithStar>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
import Address from "../addPlace/Address";
import ImageListView from "../dashboard/ImageListView";
import TextWithStar from "../utils/TextWithStar";

export default {
  name: "SchoolAdminTimeline",
  components: {ImageListView, Address,TextWithStar },
  data: () => ({
    show: false,
    model:null,
    loading:true,
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
  created(){
    const id = this.$route.params.id;
    const school = this.$store.getters.school(id);
    if (school === undefined || school === null) {
      this.$store.dispatch("findSchool", { id: id }) //find and storing school to the store
        .then(response => {
          this.model = response.data;
          this.loading = false;
        }, error => {
          this.loading = false;
          console.error(error);
          //this.$router.push(`/error?error=${error}`);
        });
    }else {
      this.model = school;
      this.loading = false;
    }
  }};
</script>

<style scoped>
</style>
