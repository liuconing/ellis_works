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
              v-for="(n, key) in category"
              @click="focuscategory = key + 1"
              :class="{ active: focuscategory == key + 1 }"
            >
              {{ n }}
            </li>
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
            <p class="text_top">第 {{ FortuneNubmer }} 籤</p>
            <p class="text_content">{{ FortuneName }}</p>
            <p class="text_bottom">【 戊辛 】</p>
          </div>
        </transition>
        <transition name="FortuneContent">
          <div class="fortune_content" v-if="!FortuneContent">
            <div class="content_left">
              <p class="left_title">聖意</p>
              <p class="left_content" style="width:215px;">
                遇貴者 訟和平 病驚險 莫求名 財物耗 婚宜停 逢寅字 事漸亨
              </p>
              <p class="left_title">解曰</p>
              <p class="left_content">
                此籤家道不安 須防人口舌 怨恨臨門 財有失 逢貴人提挈方保 漸亨不成
                多口舌 問婚訟平 病有驚 財物耗散 名利空虛 只宜守舊 不利遠行
                防親人侵損也
              </p>
              <div class="Rebutton_box" @click="ReAnime">重新求籤</div>
            </div>
            <div class="content_right">
              <h3>第 {{ FortuneNubmer }} 籤 【 戊 辛 】 {{ FortuneName }}</h3>
              <p>登 山 涉 水 正 天 寒</p>
              <p>兄 弟 姻 親 那 得 安</p>
              <p>不 遇 虎 頭 人 一 喚</p>
              <p>全 家 誰 保 汝 重 歡</p>
            </div>
          </div>
        </transition>
      </div>
    </transition>
    <div
      class="button_box fixed-bottom"
      :class="{ button_boxAnime: !HomePAGE }"
    >
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
@import "./Fortune.scss";
</style>
