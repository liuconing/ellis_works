<template>
  <div id="app">
    <LoginPicture v-if="this.$router.history.current.fullPath == '/'" />
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
            <router-link class="nav-link" @click.native="ScrollTop('Home')" to>Home</router-link>
            <!-- <a  href="javascript:;" @click="ScrollTop('Home')">Home</a> -->
          </li>
          <li class="nav-item">
            <a class="nav-link" href="javascript:;">Link</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="javascript:;">Link</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="javascript:;">Link</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="javascript:;">Link</a>
          </li>
        </ul>
      </div>
    </nav>
    <router-view />
  </div>
</template>



<script>
  //HEllo頁面
  import LoginPicture from "./components/LoginPicture.vue";
  //Button按鈕
  // import Button from "./components/DirectionButton.vue";
  //簡單Login動畫
  import Open from "./components/LandingPage.vue";
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
    },
    methods: {
      ScrollTop(id) {
        this.Router = this.$router.history.current.fullPath;
        if (this.Router == "/") {
          $("html, body").animate(
            {
              scrollTop: $(`#${id}`).offset().top
            },
            1000
          );
        } else {
          new Promise((resolve, reject) => {
            this.$router.push({ path: "/" });
            resolve();
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
    mounted() {
      $(document).ready(() => {
        //滾動效果
        $(window).scroll(() => {
          //取得每次滾動的位置
          let scrollPos = $(window).scrollTop();
          //取得目前視窗的高
          let windowHeight = $(window).height();
          //確認ID的位置座標
          // let SkillTop = $("#skill").position().top;
          //如果ID位置小於等於(目前滾動位置+視窗高)就觸發下面內容
          // if (SkillTop <= scrollPos + windowHeight && !showSkill) {
          //   showSkill = true;
          //   $("#skill .skill-progress-bar").each(function() {
          //     let thisValue = $(this).data("progress");
          //     $(this).css("width", thisValue + "%");
          //   });
          // }
          // $(".animated").each(function() {
          //   let thisPos = $(this).offset().top;
          //   if (windowHeight + scrollPos >= thisPos) {
          //     $(this).addClass("fadeIn");
          //   }
          // });
        });
      });
    }
  };
</script>

<style lang="scss" >
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
