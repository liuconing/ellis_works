<template>
  <div class="Layout">
    <LoginPicture v-if="this.$router.history.current.fullPath == '/gallerys'" />
    <!-- 簡單Login動畫 -->
    <!-- <Open/> -->
    <nav
      id="nav"
      class="navbar navbar-expand-lg navbar-dark sticky-top"
      style="background-color:rgba(0,0,0, .6)"
    >
      <span class="navbar-brand"></span>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" @click.native="ScrollTop('Home')" to="/">Home</router-link>
            <!-- <a  href="javascript:;" @click="ScrollTop('Home')">Home</a> -->
          </li>
          <li class="nav-item">
            <a class="nav-link" href="javascript:;" @click="ScrollTop('Gallery')">作品</a>
          </li>
        </ul>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
  import Home from "./Home.vue";
  import AirQuality from "./Gallerys/AirQuality.vue";
  import Fortune from "./Gallerys/Fortune.vue";
  import Tourism from "./Gallerys/Tourism.vue";

  //HEllo頁面
  import LoginPicture from "../components/LoginPicture.vue";
  //Button按鈕
  // import Button from "./components/DirectionButton.vue";
  //簡單Login動畫
  import Open from "../components/LandingPage.vue";
  export default {
    data() {
      return {
        Router: this.$router.history.current.fullPath,
        WindowHeight: 0,
        scrolled: false
      };
    },
    watch: {},
    components: {
      LoginPicture,
      Open
      // Home,
      // Fortune,
      // Tourism,
      // AirQuality
    },
    methods: {
      ScrollTop(id) {
        this.Router = this.$router.history.current.fullPath;
        console.log(this.Router);
        if (this.Router == "/") {
          $("html, body").animate(
            {
              scrollTop: $(`#${id}`).offset().top
            },
            1000
          );
        } else {
          new Promise((resolve, reject) => {
            this.$router.push({ path: "/gallerys" });
            setTimeout(() => {
              resolve();
            }, 300);
          }).then(res => {
            $("html, body").animate(
              {
                scrollTop: $(`#${id}`).offset().top
              },
              1000
            );
          });
        }
      }
    },
    mounted() {},
    created() {
      this.axios
        .get("https://vue-course-api.herokuapp.com/api/ellis_shop/products")
        .then(res => console.log(res));
    }
  };
</script>
<style lang="scss">
  #app {
    position: relative;
  }
  #nav {
    button.navbar-toggler {
      color: rgba(255, 255, 255, 0.6);
      border-color: rgba(255, 255, 255, 0.4);
    }
    .navbar-nav {
      align-items: center;
      justify-content: center;
      .nav-item {
        .nav-link {
          color: white;
          font-size: 20px;
        }
        &:nth-of-type(1) {
          .nav-link {
            font-size: 26px;
            margin-right: 20px;
            @include dai_425 {
              margin: 0;
            }
          }
        }
      }
    }
  }
</style>
