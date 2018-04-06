<template>
  <v-app id="inspire">
    <v-navigation-drawer fixed :clipped="$vuetify.breakpoint.lgAndUp" app v-model="drawer">
      <v-list dense>
        <template v-for="item in items">
            <v-layout row v-if="item.heading" align-center :key="item.heading">
              <v-flex xs6>
                <v-subheader v-if="item.heading">
                  {{ item.heading }}
                </v-subheader>
              </v-flex>
              <v-flex xs6 class="text-xs-center">
                <a href="#!" class="body-2 black--text">EDIT</a>
              </v-flex>
            </v-layout>
            <v-list-group
              v-else-if="item.children"
              v-model="item.model"
              :key="item.text"
              :prepend-icon="item.model ? item.icon : item['icon-alt']"
              append-icon="">
              <v-list-tile slot="activator" router :to="item.link">
                <v-list-tile-content>
                  <v-list-tile-title>
                    {{ item.text }}
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile
                v-for="child in item.children"
                :key="child.text" router :to="child.link">
                <v-list-tile-action v-if="child.icon">
                  <v-icon>{{ child.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>
                    {{ child.text }}
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list-group>
            <v-list-tile v-else :key="item.text" router :to="item.link">
              <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
      </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      color="primary"
      dark
      app
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      fixed
    >
      

      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <img style="curson : pointer" @click.stop="drawer = !drawer" src="/static/logo_tag.png" width="200px" margin-left="200px"/>
      </v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        prepend-icon="search"
        label="Search"
        class="hidden-sm-and-down"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn>
      <v-btn icon large>
        <v-avatar size="32px" tile>
          <img
            src="https://vuetifyjs.com/static/doc-images/logo.svg"
            alt="Vuetify"
          >
        </v-avatar>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
                <router-view></router-view>
        </v-layout>
      </v-container>
    </v-content>
    <v-btn
      fab
      bottom
      right
      color="pink"
      dark
      fixed
      @click.stop="dialog = !dialog">

      <v-icon>add</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" width="800px">
      <v-card>
        <v-card-title
          class="grey lighten-4 py-4 title"
        >
          Create contact
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs12 align-center justify-space-between>
              <v-layout align-center>
                <v-avatar size="40px" class="mr-3">
                  <img
                    src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png"
                    alt=""
                  >
                </v-avatar>
                <v-text-field
                  placeholder="Name"
                ></v-text-field>
              </v-layout>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                prepend-icon="business"
                placeholder="Company"
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                placeholder="Job title"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                prepend-icon="mail"
                placeholder="Email"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                type="tel"
                prepend-icon="phone"
                placeholder="(000) 000 - 0000"
                mask="phone"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                prepend-icon="notes"
                placeholder="Notes"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-btn flat color="primary">More</v-btn>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="dialog = false">Cancel</v-btn>
          <v-btn flat @click="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  <!-- <call-footer-link/> -->

  </v-app>
</template>

<script>
import Footer from './components/Footer.vue';
  export default {
    components: {
            'call-footer-link': Footer,
        },
    data: () => ({
      dialog: false,
      drawer: true,
      items: [{
          icon: "home",
          text: "Home",
          link:"/"
        },
        {
          icon: "pages",
          text: "Feeds",
          link:"/feeds"
        },
        {
          icon: "burst_mode",
          text: "Blogs",
          link:"/blogs"
        },
        {
          icon: "person",
          text: "Profile",
          link:"/profile"
        },
        {
          icon: "keyboard_arrow_up",
          "icon-alt": "keyboard_arrow_down",
          text: "Add Place",
          model: false,
          children: [{
            text: "School",
            link:"/profile"
          },
          {
            text: "Coaching",
            link:"/profile"
          },{
            text: "Music School",
            link:"/profile"
          },{
            text: "Sports School",
            link:"/profile"
          },{
            text: "Art School",
            link:"/profile"
          },{
            text: "Private/Home Tutors",
            link:"/profile"
          }]
        },
        {
          icon: "settings",
          text: "Settings",
          link:"/profile"
        },
        {
          icon: "chat_bubble",
          text: "Send feedback",
          link:"/profile"
        },
        {
          icon: "help",
          text: "Help",
          link:"/profile"
        },
        {
          icon: "phonelink",
          text: "App downloads",
          link:"/profile"
        }
      ]
    }),
    props: {
      source: String
    }
  };
</script>