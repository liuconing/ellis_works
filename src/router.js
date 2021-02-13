import Vue from "vue";
import Router from "vue-router";
const scrollBehavior = (to, from, savedPosition) => {
  // keep-alive 返回缓存页面后记录浏览位置
  if (savedPosition && to.meta.keepAlive) {
    return savedPosition;
  }
  // 异步滚动操作
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ x: 0, y: 1 });
    }, 0);
  });
};

Vue.use(Router);
export default new Router({
  mode: process.env.NODE_ENV === "production" ? "hash" : "history",
  routes: [
    {
      path: "/",
      name: "HOME",
      component: () => import("./views/Layout.vue"),
      redirect: "/gallerys",
      meta: {
        keepAlive: true, // 需要被缓存
      },
    },
    {
      //作品集
      path: "/gallerys",
      component: () => import("./views/Layout.vue"),
      children: [
        {
          path: "",
          name: "gallerys",
          component: () => import("./views/Home.vue"),
          meta: {
            keepAlive: true, // 需要被缓存
          },
        },
        {
          path: "tourism",
          name: "tourism",
          component: () => import("./views/Gallerys/Tourism/Tourism.vue"),
        },
        {
          path: "airquality",
          name: "airquality",
          component: () => import("./views/Gallerys/AirQuality/AirQuality.vue"),
        },
        {
          path: "fortune",
          name: "fortune",
          component: () => import("./views/Gallerys/Fortune/Fortune.vue"),
        },
      ],
    },
    //KKboxMusic
    {
      path: "/kkboxmusic",
      name: "kkboxmusic",
      component: () => import("./views/Gallerys/KKboxMusic/KKboxMusic.vue"),
    },
    //口罩地圖
    {
      path: "/maskmap",
      name: "maskmap",
      component: () => import("./views/Gallerys/Maskmap/Maskmap.vue"),
      meta: {
        keepAlive: true, // 需要被缓存
      },
    },
    {
      path: "/thef2e",
      component: () => import("./views/F2E/FtoweLayout.vue"),
      children: [
        {
          path: "",
          name: "thef2e",
          component: () => import("./views/F2E/FtoweHome.vue"),
        },
        {
          path: "tomato",
          name: "tomato",
          component: () => import("./views/F2E/Tomato/Tomato.vue"),
        },
        {
          path: "solitaire",
          name: "solitaire",
          component: () => import("./views/F2E/NewSolitaire/Solitaire.vue"),
        },
      ],
    },
    {
      path: "/vueshop",
      name: "vueshop",
      component: () => import("./views/VueShop/ShopLayout/ShopLayout.vue"),
      children: [],
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./views/VueShop/ShopLogin/ShopLogin.vue"),
      beforeEnter(to, form, next) {
        return next();
      },
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
          meta: { requiresAuth: true },
        },
        {
          path: "*",
          redirect: "/login",
        },
      ],
    },
    {
      path: "*",
      beforeEnter(to, form, next) {
        return next("gallerys");
      },
    },
  ],
  scrollBehavior,
});
