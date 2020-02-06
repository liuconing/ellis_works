import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

export default new Router({
  // mode: "history",
  // base: process.env.BASE_URL,
  routes: [
    // {
    //   path: "/",
    //   component: () => import("./views/Layout.vue"),
    //   children: [
    //     { path: "", name: "Home", component: () => import("./views/Home.vue") }
    //   ]
    // },
    {
      path: "/gallerys",
      component: () => import("./views/Layout.vue"),
      children: [
        {
          path: "",
          component: () => import("./views/Home.vue")
        },
        {
          path: "tourism",
          component: () => import("./views/Gallerys/Tourism.vue")
        },
        {
          path: "airquality",
          component: () => import("./views/Gallerys/AirQuality.vue")
        },
        {
          path: "fortune",
          component: () => import("./views/Gallerys/Fortune.vue")
        }
      ]
    },
    {
      path: "/thef2e",
      component: () => import("./views/F2E/FtoweLayout.vue"),
      children: [
        {
          path: "",
          component: () => import("./views/F2E/FtoweHome.vue")
        },
        {
          path: "tomato",
          component: () => import("./views/F2E/Tomato/Tomato.vue")
        },
        {
          path: "solitaire",
          component: () => import("./views/F2E/NewSolitaire/Solitaire.vue")
        }
      ]
    },
    {
      path: "*",
      beforeEnter(to, form, next) {
        return next("gallerys");
      }
    }
  ]
});
