<template>
  <div>
    <div id="Home" class="container-fluid clearfix">
      <h2 class="text-center font-weight-bold mb-4">介紹</h2>
      <div class="row">
        <div class="col-md-6 MyImag">
          <img src="https://i.imgur.com/vTWoB7o.png" alt="劉文華（Ellis）" />
        </div>
        <div class="col-md-6 MyInt">
          <h3 class="mt-4">姓名</h3>
          <p class="mt-3">劉文華 Ellis</p>
          <h3 class="mt-4">工作經歷</h3>
          <p class="mt-3 mb-2">
            <span class="font-weight-bold font-italic">2018/04 - 2020/02</span>
            <br />
            <a href="https://home.star-bit.io/zh-tw/" target="_blank">思偉達科技股份有限公司</a>－前端工程師
          </p>
          <p class="mt-2">建立乙太坊交易所和與智能合約串接製作區塊鏈相關產品。</p>
          <h3 class="mt-4">技能</h3>
          <p class="mt-3">
            HTML / CSS3 、 JavaScript 、 jQuery 、 VueJS、 Nuxt.js 、 ReactJS、
            Git / GitHub
          </p>
          <h3 class="mt-4">簡介</h3>
          <p class="mt-3">
            我叫劉文華（Ellis），居住新北市三峽， 1995 年出生並於 2017
            年亞東技術學院 資訊管理系畢業。
          </p>
          <p class="mt-3">
            曾任 思偉達創新科技
            擔任前端工程師職務，在任內為公司建置去中心化交易所前端版面與API串接、也製作智能合約DAPP應用頁面。
          </p>
          <p class="mt-3">
            具備能熟練使用 HTML / CSS 按照設計稿刻出畫面並使用 JavaScript
            語言以及相關框架(Vue.js、Nuxt.js)製作出具有功能性的網站。
          </p>
          <p class="mt-3">有相關前端實務經驗，擁有良好的團隊溝通，喜歡互相分享技術經驗或新知並對於新技術熱於研究。</p>
          <p class="mt-3">
            <a href="https://www.cakeresume.com/pp840405" target="_blank">CakeResume 履歷</a>
          </p>
        </div>
      </div>
    </div>
    <div id="Gallery">
      <h2 class="text-center font-weight-bold pb-5">作品</h2>
      <div class="container-fluid GalleryList">
        <ul>
          <li>
            <h3>RWD ( 手刻板 ) 一頁網頁</h3>
            <p>● 沒有使用任何 CSS 框架</p>
            <a href="https://pure-beyond-68785.herokuapp.com/" target="_blank">
              <img src="../assets/images/herokuapp.jpg" alt="RWD ( 手刻板 ) 一頁網頁" />
            </a>
          </li>
          <li>
            <h3>高雄旅遊景點</h3>
            <p>
              ● 使用 Vue 框架做撰寫
              <br />● fetch 取的 API 並渲染出來
              <br />● 使用 Bootstrap 4 做排版
            </p>
            <router-link to="gallerys/tourism">
              <img src="../assets/images/Tourism.jpg" alt="高雄旅遊景點" />
            </router-link>
          </li>
          <li>
            <h3>空氣品質指標 (AQI)</h3>
            <p>
              ● 使用 Vue 框架做撰寫
              <br />● 跨來源資源共用（CORS）取得 API 資料
              <br />● fetch 取的 API 並渲染出來
              <br />● 使用 vue-loading 來做等待載入資料畫面
            </p>
            <router-link to="gallerys/airquality">
              <img src="../assets/images/AirQuality.jpg" alt="空氣品質指標 (AQI)" />
            </router-link>
          </li>
          <li>
            <h3>神明求籤</h3>
            <p>
              ● 使用 Vue 框架做撰寫
              <br />● 使用 Vue transition 與 CSS 動畫切換效果
              <br />● 使用 Vue v-if 判斷是否渲染該畫面
              <br />
            </p>
            <router-link to="gallerys/fortune">
              <img src="../assets/images/Fortune.jpg" alt="神明求籤" />
            </router-link>
          </li>
          <li>
            <h3>口罩地圖</h3>
            <p>
              ● 使用 Vue 框架做撰寫
              <br />● 使用 Leaflet 地圖繪製工具
              <br />● 使用 OpenStreetMap 做地圖渲染
              <br />● axios 取的 API 並渲染出來
            </p>
            <router-link to="/Maskmap">
              <img src="../assets/images/Maskmap.jpg" alt="口罩地圖" />
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    components: {},
    methods: {
      ScrollTop(id, PathName) {
        new Promise((resolve, reject) => {
          this.$router.push({ path: `/${PathName}` });
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
  };
</script>
<style lang="scss" scoped>
  #Home {
    padding: 0 8%;
    padding-top: 20px;
    padding-bottom: 30px;
    // min-height: 100vh;
    h2 {
      font-size: 48px;
    }
    .MyImag {
      img {
        display: block;
        width: 500px;
        min-height: auto;
        margin: 0 auto;
        @include dai_425 {
          width: 100%;
        }
      }
    }
    .MyInt {
      padding-left: 20px;
      @include dai_425 {
        padding-left: 10px;
      }
      h3 {
        border-left: 2px solid #000;
        border-bottom: 2px solid #000;
        padding: 0 0 10px 5px;
        width: 20%;
        font-weight: 900;
        @include dai_425 {
          width: 70%;
        }
      }
      p {
        font-size: 23px;
        padding-left: 20px;
        font-weight: 500;
        @include dai_425 {
          line-height: 1.5;
          padding-left: 0;
        }
      }
    }
  }
  #Gallery {
    width: 100%;
    min-height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    padding-top: 58px;
    h2 {
      font-size: 48px;
      color: white;
    }
    .GalleryList {
      padding: 0 8%;
      ul {
        @include flex_pos(flex-start, center);
        flex-wrap: wrap;
        li {
          width: calc(100% / 4 - 40px);
          margin: 0 20px;
          margin-bottom: 50px;
          background-color: rgba(0, 0, 0, 0);
          min-height: 550px;
          @include flex_pos(flex-start, center, column);
          p {
            width: 100%;
            color: #fff;
            font-size: 16px;
            margin-bottom: 10px;
            line-height: 20px;
          }
          h3 {
            color: #fff;
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 10px;
          }
          img {
            display: block;
            width: 100%;
            height: auto;
          }
        }
      }
    }
  }
</style>
