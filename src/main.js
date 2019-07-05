import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// import $ from "jquery";
import "bootstrap"; // Import js file
import "bootstrap/dist/css/bootstrap.min.css";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBE5PlOsPSTaqJGWUha74hEcHGVST16aI0",
    libraries: "places" // This is required if you use the Autocomplete plugin
  }
});

Vue.config.productionTip = false;
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
