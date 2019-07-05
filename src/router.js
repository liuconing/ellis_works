import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  // mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/ellis_works/",
      name: "home",
      component: () => import("./views/Home.vue")
    },
    {
      path: "/ellis_works/tourism",
      name: "Tourism",
      component: () => import("./views/Gallerys/Tourism.vue")
    },
    {
      path: "/ellis_works/airquality",
      name: "AirQuality",
      component: () => import("./views/Gallerys/AirQuality.vue")
    },
    {
      path: "/ellis_works/fortune",
      name: "Fortune",
      component: () => import("./views/Gallerys/Fortune.vue")
    }
  ]
});
