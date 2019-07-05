<template>
  <div id="Fortune">
    <transition name="Home">
      <div class="Home" v-if="HomePAGE">
        <h1>
          線上求籤
          <p>。</p>
        </h1>
        <div class="Fortune_step">
          <h2>求籤步驟</h2>
          <p>① 請虔誠地在心中默念您的姓名、出生年月日、住址</p>
          <p>② 選擇欲請教的求籤類別後，誠心地在心中詳細說明</p>
          <p>③ 說明完後即可點選「開始求籤」按鈕進行線上求籤</p>
        </div>
        <div class="Fortune_category">
          <h2>求籤類別</h2>
          <ul>
            <li
              v-for="(n,key) in category"
              @click="focuscategory = key +1 "
              :class="{'active':focuscategory == key+1}"
            >{{n}}</li>
          </ul>
        </div>
      </div>
    </transition>
    <transition name="Start">
      <div class="Start" v-if="!StartPAGE">
        <div class="Start_border">
          <p>線</p>
          <p>上</p>
          <p>求</p>
          <p>籤</p>
          <div class="line"></div>
          <div class="line"></div>
          <div class="line"></div>
          <div class="line"></div>
        </div>
        <transition name="FortuneText">
          <div class="fortune_text" v-if="!FortuneText">
            <p class="text_top">第 {{FortuneNubmer}} 籤</p>
            <p class="text_content">{{FortuneName}}</p>
            <p class="text_bottom">【 戊辛 】</p>
          </div>
        </transition>
        <transition name="FortuneContent">
          <div class="fortune_content" v-if="!FortuneContent">
            <div class="content_left">
              <p class="left_title">聖意</p>
              <p class="left_content" style="width:215px;">遇貴者 訟和平 病驚險 莫求名 財物耗 婚宜停 逢寅字 事漸亨</p>
              <p class="left_title">解曰</p>
              <p
                class="left_content"
              >此籤家道不安 須防人口舌 怨恨臨門 財有失 逢貴人提挈方保 漸亨不成 多口舌 問婚訟平 病有驚 財物耗散 名利空虛 只宜守舊 不利遠行 防親人侵損也</p>
              <div class="Rebutton_box" @click="ReAnime">重新求籤</div>
            </div>
            <div class="content_right">
              <h3>第 {{FortuneNubmer}} 籤 【 戊 辛 】 {{FortuneName}}</h3>
              <p>登 山 涉 水 正 天 寒</p>
              <p>兄 弟 姻 親 那 得 安</p>
              <p>不 遇 虎 頭 人 一 喚</p>
              <p>全 家 誰 保 汝 重 歡</p>
            </div>
          </div>
        </transition>
      </div>
    </transition>
    <div class="button_box fixed-bottom" :class="{'button_boxAnime':!HomePAGE}">
      <p class="box_start" @click="Anime">開始求籤</p>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        HomePAGE: true,
        StartPAGE: true,
        FortuneText: true,
        FortuneContent: true,
        FortuneNubmer: 0,
        FortuneName: "",
        category: [
          "網站上線",
          "感情姻緣",
          "事業工作",
          "家庭生活",
          "求財運勢",
          "參選總統"
        ],
        focuscategory: false
      };
    },
    methods: {
      Anime() {
        if (!this.focuscategory) return;
        this.HomePAGE = !this.HomePAGE;
        this.StartPAGE = !this.StartPAGE;
        this.FortuneNubmer = Math.floor(Math.random() * 100);
        if (this.FortuneNubmer === 0) {
          this.FortuneNubmer = this.FortuneNubmer + 1;
        }
        if (this.FortuneNubmer <= 33) this.FortuneName = "小 吉";
        else if (this.FortuneNubmer <= 66) this.FortuneName = "中 吉";
        else if (this.FortuneNubmer <= 100) this.FortuneName = "大 吉";
        setTimeout(() => {
          this.FortuneText = !this.FortuneText;
          setTimeout(() => {
            this.FortuneText = !this.FortuneText;
            setTimeout(() => {
              this.FortuneContent = !this.FortuneContent;
            }, 2000);
          }, 3000);
        }, 3000);
      },
      ReAnime() {
        this.HomePAGE = true;
        this.StartPAGE = true;
        this.FortuneContent = true;
      }
    },
    mounted() {
      let p = navigator.platform;
      let system = { win: false, mac: false, xll: false };
      system.win = p.indexOf("Win") == 0;
      system.mac = p.indexOf("Mac") == 0;
      system.x11 = p == "X11" || p.indexOf("Linux") == 0;
      if (system.win || system.mac || system.xll) {
      } else {
        alert("請使用PC訪問此網站為最佳體驗");
      }
    }
  };
</script>
<style lang="scss" scoped>
  .Home-enter-active,
  .Home-leave-active,
  .Start-enter-active,
  .Start-leave-active,
  .FortuneText-enter-active,
  .FortuneText-leave-active,
  .FortuneContent-enter-active,
  .FortuneContent-leave-active {
    transition: opacity 2s ease-in-out;
  }
  .Home-enter,
  .Home-leave-to,
  .Start-enter,
  .Start-leave-to,
  .FortuneText-enter,
  .FortuneText-leave-to,
  .FortuneContent-enter,
  .FortuneContent-leave-to {
    opacity: 0;
  }
  * {
    font-family: "Noto Serif TC", serif;
  }
  .button_boxAnime {
    height: 0 !important;
  }
  .Fortune_page {
    position: fixed;
    width: 100%;
  }
  #Fortune {
    position: fixed;
    height: 100%;
    width: 100%;
    background-image: radial-gradient(rgba(0, 0, 0, 0.35), black),
      url(../../assets/images/fortune_bg.jpg);
    background-size: 100% 100%;
    background-position: center center;
    background-repeat: no-repeat;
    .Home {
      position: relative;
      padding: 0 8%;
      min-height: 100%;
      h1 {
        position: absolute;
        right: 20%;
        line-height: 120px;
        width: 120px;
        color: white;
        font-size: 120px;
        margin-top: 50px;
        p {
          font-size: 120px;
        }
      }
      h2 {
        font-size: 24px;
        color: white;
        font-weight: 900;
        margin-bottom: 24px;
      }
      p {
        font-size: 16px;
        color: white;
        margin: 5px 0;
      }
      .Fortune_step {
        margin-bottom: 40px;
        padding-top: 15%;
      }
      ul {
        width: 370px;
        li {
          display: inline-block;
          width: calc(100% / 3 - 16px);
          margin: 8px;
          border: 1px white solid;
          color: white;
          font-size: 16px;
          text-align: center;
          padding: 10px;
          @include mouse;
          &:hover {
            color: #000;
            background-color: white;
          }
          &.active {
            color: #000;
            background-color: white;
          }
        }
      }
    }
    .button_box {
      height: 130px;
      width: 100%;
      background-color: white;
      padding-left: 180px;
      transition: height 2s ease;
      .box_start {
        color: #000;
        font-size: 24px;
        font-weight: bold;
        margin-top: 40px;
        width: 355px;
        height: 55px;
        border: 2px #000 solid;
        text-align: center;
        line-height: 55px;
        transition: all 0.8s ease;
        @include mouse;
        &:hover {
          color: white;
          background-color: #000;
        }
      }
    }
  }
  .Start {
    position: relative;
    height: calc(100% - 188px);
    padding: 0 8%;
    display: flex;
    justify-content: center;
    align-items: center;
    .Start_border {
      position: absolute;
      height: 100%;
      width: 100%;
      left: 0;
      top: 40px;
      z-index: 1;
      .line {
        position: absolute;
        background-color: rgba(255, 255, 255, 0.3);
        &:nth-of-type(1) {
          width: calc(100% - 250px);
          height: 1px;
          top: 6%;
          left: 6%;
        }
        &:nth-of-type(3) {
          width: calc(100% - 250px);
          height: 1px;
          bottom: 6%;
          left: 6%;
        }
        &:nth-of-type(2) {
          width: 1px;
          height: calc(100% - 200px);
          top: 13%;
          left: 3.5%;
        }
        &:nth-of-type(4) {
          width: 1px;
          height: calc(100% - 200px);
          top: 13%;
          right: 3.5%;
        }
      }
      p {
        position: absolute;
        color: rgba(255, 255, 255, 0.4);
        font-size: 36px;
        font-weight: 900;
        &:nth-of-type(1) {
          left: 40px;
          top: 40px;
        }
        &:nth-of-type(2) {
          right: 40px;
          top: 40px;
        }
        &:nth-of-type(3) {
          left: 40px;
          bottom: 40px;
        }
        &:nth-of-type(4) {
          right: 40px;
          bottom: 40px;
        }
      }
    }
    .fortune_text {
      position: relative;
      z-index: 12;
      transition: opacity 2s ease-in-out;
      p {
        letter-spacing: 35px;
        text-align: center;
        color: white;
        font-weight: 900;
      }
      .text_top,
      .text_bottom {
        font-size: 24px;
        text-align: center;
      }
      .text_content {
        font-size: 240px;
        margin: 60px 0;
      }
      &.textopacity {
        opacity: 0;
      }
    }
    .fortune_content {
      position: relative;
      z-index: 13;
      width: 100%;
      padding: 0 5%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .content_left {
        width: 355px;
        p {
          color: white;
          line-height: 24px;
        }
        .left_title {
          font-size: 24px;
          font-weight: 900;
        }
        .left_content {
          font-size: 16px;
          margin-top: 24px;
          margin-bottom: 40px;
        }
        .Rebutton_box {
          margin-top: 40px;
          width: 350px;
          height: 55px;
          text-align: center;
          line-height: 55px;
          font-size: 24px;
          color: white;
          border: 1px white solid;
          @include mouse;
        }
      }
      .content_right {
        writing-mode: vertical-rl;
        h3 {
          font-size: 16px;
          color: white;
        }
        p {
          font-size: 40px;
          font-weight: 900;
          color: white;
          margin: 0 30px;
        }
      }
    }
  }
</style>
