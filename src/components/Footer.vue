<template>
  <v-footer :clipped="$vuetify.breakpoint.lgAndUp" height="auto">
    <v-card flat tile width="100%">
      <v-card-title class="grey darken-4 white--text">
        <strong class="subheading">Get connected with us on social networks!</strong>
        <v-spacer></v-spacer>
        <v-btn
          v-for="icon in icons"
          :key="icon"
          icon
          dark
          class="mx-3">
          <v-icon size="24px">{{ icon }}</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="grey darken-4 white--text">
        <v-layout>
          <v-flex
            v-for="(col, i) in rows"
            :key="i"
            xs3
          >
            <span class="body-2" v-text="col.title.toUpperCase()"></span>
            <div
              v-for="(child, i) in col.children"
              :key="i"
              v-text="child"></div>
          </v-flex>
          <v-flex xs3 layout column>
            <span class="body-2">CONTACT</span>
            <div>
              <v-icon size="18px" dark class="mr-3">home</v-icon>
              New York, NY 10012, US
            </div>
            <div>
              <v-icon size="18px" dark class="mr-3">message</v-icon>
              info@example.com
            </div>
            <div>
              <v-icon size="18px" dark class="mr-3">phone</v-icon>
              + 01 234 567 88
            </div>
            <div>
              <v-icon size="18px" dark class="mr-3">print</v-icon>
              + 01 234 567 89
            </div>
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-card-actions class="primary justify-center white--text">
        &copy;2018 — <strong>CredoLabs</strong>
      </v-card-actions>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    icons: [
      "fab fa-facebook",
      "fab fa-twitter",
      "fab fa-google-plus",
      "fab fa-linkedin",
      "fab fa-instagram"
    ],
    rows: [
      {
        title: "Company Name",
        children: [
          "Here you can use rows and columns here to organize your footer content. Lorem ipsum dolor sit amet, consectetur adipisicing elit"
        ]
      },
      {
        title: "Products",
        children: [
          "MDBootstrap",
          "MDWordPress",
          "BrandFlow",
          "Bootstrap Angular"
        ]
      },
      {
        title: "Useful Links",
        children: [
          "Your account",
          "Become an Affiliate",
          "Shipping Rates",
          "Helper"
        ]
      }
    ]
  })
};
</script>
