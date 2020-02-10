import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

export default new Router({
  mode: process.env.NODE_ENV === "production" ? "hash" : "history",
  // base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: () => import("./views/Layout.vue"),
      beforeEnter(to, form, next) {
        return next("gallerys");
      }
    },
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
      path: "/vueshop",
      component: () => import("./views/VueShop/ShopLayout/ShopLayout.vue"),
      children: []
    },
    {
      path: "/login",
      component: () => import("./views/VueShop/ShopLogin/ShopLogin.vue"),
      beforeEnter(to, form, next) {
        return next();
      }
    },
    {
      path: "/admin",
      component: () =>
        import("./views/VueShop/ShopBackstage/ShopBackstage.vue"),
      children: [
        {
          path: "products",
          component: () =>
            import("./views/VueShop/ShopBackstage/Products/Products.vue"),
          meta: { requiresAuth: true }
        },
        {
          path: "*",
          redirect: "/login"
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
