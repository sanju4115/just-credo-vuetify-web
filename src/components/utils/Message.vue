<template>
  <v-container>
      <v-layout row wrap fill-height class="text-xs-center">
        <v-flex xs12>
          <img src="/static/images/nothing_found.png" style="height: 100px"/>
        </v-flex>
        <v-flex xs12>
          <p style="width: 100%">{{message}}</p>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "Message",
      props: {
        message: {
          type: String,
          required: true
        }
      },
    }
</script>

<style scoped>

</style>
