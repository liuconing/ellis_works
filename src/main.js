import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";
import store from "./store/index";
import VueCookies from "vue-cookies";
import "bootstrap"; // Import js file
import "bootstrap/dist/css/bootstrap.min.css";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBE5PlOsPSTaqJGWUha74hEcHGVST16aI0",
    libraries: "places" // This is required if you use the Autocomplete plugin
  }
});
Vue.use(VueAxios, axios);
Vue.use(VueCookies);
Vue.config.productionTip = false;
axios.defaults.withCredentials = true;

router.beforeEach((to, form, next) => {
  if (to.meta.requiresAuth) {
    const api = `${store.state.APIPATH}/api/user/check`;
    axios.post(api).then(res => {
      if (res.data.success) {
        next();
      } else {
        next({
          path: "/login"
        });
      }
    });
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
export { store };
