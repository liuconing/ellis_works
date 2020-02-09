<template>
  <div id="ShopLogin">
    <div class="ShopLogin">
      <form class="form-signin" @submit.prevent="signin">
        <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
        <label for="inputEmail" class="sr-only">Email address</label>
        <input
          type="email"
          id="inputEmail"
          class="form-control"
          placeholder="Email address"
          v-model="user.username"
          autocomplete
          required
          autofocus
        />
        <label for="inputPassword" class="sr-only">Password</label>
        <input
          type="password"
          id="inputPassword"
          class="form-control"
          placeholder="Password"
          v-model="user.password"
          autocomplete
          required
        />
        <div class="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div>
        <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      </form>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        user: {
          username: "tag102111226@gmail.com",
          password: "102111226"
        }
      };
    },
    methods: {
      signin() {
        const { axios, $store, $router, user } = this;
        const api = `${$store.state.APIPATH}/admin/signin`;
        axios.post(api, user).then(res => {
          console.log(res.data.success);
          if (res.data.success) {
            return $router.push("/admin/products");
          }
          alert(res.data.message);
        });
      }
    },
    created() {
      const apicheck = `${this.$store.state.APIPATH}/api/user/check`;
      this.axios.post(apicheck).then(res => {
        if (res.data.success) {
          return this.$router.push("/admin/products");
        }
      });
    }
  };
</script>
<style lang="scss">
  @import "./ShopLogin.scss";
</style>
