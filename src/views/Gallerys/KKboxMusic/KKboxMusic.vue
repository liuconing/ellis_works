<template>
  <div id="KKboxMusic">
    <div class="KKboxMusic"></div>
  </div>
</template>
<script>
  let qs = require("qs");
  export default {
    data() {
      return {};
    },
    created() {
      // const oauth = {
      //   grant_type: "client_credentials",
      //   client_id: "c3a21705f0af27ccdf74b8c198a17b62",
      //   client_secret: "701b89d3f5a8c3549903760c83f8dae3"
      // };
      // this.axios
      //   .post(`/token`, qs.stringify(oauth), {
      //     headers: {
      //       "Content-Type": "application/x-www-form-urlencoded"
      //     }
      //   })
      //   .then(res => console.log(res.data));
      // this.axios
      //   .get("http://localhost:3000/ping")
      //   .then(res => {
      //     console.log(JSON.parse(res.data));
      //   })
      //   .catch(err => console.log(err));
    }
  };
</script>
<style lang="scss" scope>
  @import "./KKboxMusic.scss";
</style>
