import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  // base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("./views/Home.vue")
    },
    {
      path: "/tourism",
      name: "Tourism",
      component: () => import("./views/Gallerys/Tourism.vue")
    },
    {
      path: "/airquality",
      name: "AirQuality",
      component: () => import("./views/Gallerys/AirQuality.vue")
    },
    {
      path: "/fortune",
      name: "Fortune",
      component: () => import("./views/Gallerys/Fortune.vue")
    }
  ]
});
