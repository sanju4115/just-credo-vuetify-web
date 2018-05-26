<template>
  <v-card>
    <v-layout row wrap>
      <v-flex xs12>
        <v-list two-line>
          <template v-for="item in notification">
            <v-list-tile avatar @click="onClickNotification(item)">
              <v-list-tile-avatar>
                <img :src="item.icon">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title v-html="item.title"></v-list-tile-title>
                <v-list-tile-sub-title v-html="item.body"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider inset></v-divider>
          </template>
        </v-list>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex>
        <infinite-loading @infinite="infiniteHandler" spinner="spiral">
              <span slot="no-more">
                <v-alert type="info" :value="true">
                      No more notifications !
                </v-alert>
              </span>
        </infinite-loading>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import db from "../firebaseInit";
import InfiniteLoading from "vue-infinite-loading";

export default {
  name: "AdminNotification",
  components: {
    InfiniteLoading
  },
  data: function() {
    return {
      currentUser: this.$store.getters.user,
      notification: [],
      LIMIT: 5,
      firstTime: true,
      notificationSubscription:null
    };
  },
  created() {
    this.nextQuery = db
      .collection("admin_notifications")
      .where("admin", "==", true)
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
          this.notification = this.notification.concat(temp);
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
            .collection("admin_notifications")
            .where("admin", "==", true)
            .orderBy("timestamp", "desc")
            .startAfter(lastVisible)
            .limit(this.LIMIT);
        })
        .catch(function(error) {
          console.log("Error getting documents: ", error);
        });
    },
    buildEvenListener() {
      this.notificationSubscription = db
        .collection("admin_notifications")
        .where("admin", "==", true)
        .orderBy("timestamp", "desc")
        .limit(this.LIMIT)
        .onSnapshot(snapshot => {
          snapshot.docChanges.forEach(change => {
            if (change.type === "added") {
              const notificationExist = this.notification.find(notification => {
                return notification.id === change.doc.data().id;
              });

              if (!notificationExist) {
                console.log("New review: ", change.doc.data());
                this.notification.unshift(change.doc.data());
              }
            }
          });
        });
    },
    onClickNotification(notification){
      if (notification.type === "school_approval") {
        this.$router.push("/approval/" + notification.schoolId);
      }
    }
  },
  mounted() {},

  /**
   * Called before destroying this component
   *
   * un-subscribing from database listeners
   */
  beforeDestroy() {
    if (this.notificationSubscription !== null) {
      this.notificationSubscription();
    }
  }
};
</script>

<style scoped>
</style>
