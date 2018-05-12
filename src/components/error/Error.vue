<template>
  <div class="error-page background">
    <div class="error-content">
      <div class="container">
        <img src="/static/404.png" alt="" class="img-responsive" />
        <div class="error-message">
          <h1 class="error-title">Whoops!</h1>
          <p class="colorPrimaryText--text">Looks like you are lost. But don't worry there is plenty to see!!</p>
        </div>
        <v-chip style="cursor : pointer" color="green" text-color="white" @click="goHome">Return Home</v-chip>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Error",
  data() {
    return {
      error: null
    };
  },
  mounted() {
    this.error = this.$route.query.error;
  },
  methods: {
    goHome() {
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>

@font-face {
  font-family: "Agency FB";
  src: url("/static/fonts/agency-fb.eot"); /* EOT file for IE */
}
@font-face {
  font-family: "Agency FB";
  src: url("/static/fonts/agency-fb.ttf"); /* TTF file for CSS3 browsers */
}

.error-page {
  display: table;
  text-align: center;
  width: 100%;
  height: 100vh;
}

.error-page .error-content {
  display: table-cell;
  vertical-align: middle;
}

.error-page .error-content img {
  margin: auto;
}

.error-page .error-content h1.error-title {
  font-family: "Agency FB", sans-serif;
  color: #6d6e71;
  font-size: 60px;
}

.error-page .error-content p {
  font-size: 16px;
}

.error-page .error-content form .form-group {
  width: 50%;
  margin: 0 auto 15px;
}

.error-page .error-content form .form-group .form-control {
  border-radius: 50px;
  padding-left: 20px;
  padding-right: 20px;
}
</style>
