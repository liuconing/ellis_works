<template>
  <div class="Tourism">
    <div v-if="isLoading" class="trueLoading">
      <Loading
        :active.sync="isLoading"
        :can-cancel="false"
        :is-full-page="true"
      />
    </div>
    <div v-else-if="!isLoading" class="falseLoading">
      <div class="wrae clearfix">
        <div class="container-fluid header-img">
          <div class="row d-flex justify-content-center header-title">
            <h1>高雄旅遊景點</h1>
          </div>
          <div class="manu">
            <select
              class="area"
              v-model="focusArea"
              @change="addMarker(focusArea)"
            >
              <option value="請選擇">--請選擇地區--</option>
              <option v-for="(n, key) in Area" :value="n" :key="key">{{
                n
              }}</option>
            </select>
          </div>
        </div>
        <div class="container-fluid fire-top">
          <ul>
            <h3>熱門行政區</h3>
            <li class="btn btn-primary" @click="HotArea">苓雅區</li>
            <li class="btn btn-success" @click="HotArea">三民區</li>
            <li class="btn btn-danger" @click="HotArea">新興區</li>
          </ul>
        </div>
        <div id="map" class="mx-auto google-map">
          <GmapMap
            class="GmapMap"
            :center="{
              lat: markers[0].position.lat,
              lng: markers[0].position.lng,
            }"
            :zoom="11"
            map-type-id="terrain"
          >
            <GmapMarker
              :key="index"
              v-for="(m, index) in markers"
              :position="m.position"
              :clickable="true"
              :draggable="true"
              :title="m.title"
              @click="center = m.position"
            />
          </GmapMap>
        </div>

        <hr style="border: 3px dashed #559AC8;" />
        <div class="content">
          <div class="content-title">
            {{ focusArea == "請選擇" ? "三民區" : focusArea }}
          </div>
          <ul class="content-ul">
            <li class="content-li" v-for="(n, key) in displayArea" :key="key">
              <div
                class="land-img"
                :style="`background-image: url(${n.Picture1});`"
              >
                <div class="land-content">
                  <div class="land-text">
                    <h3>{{ n.Name }}</h3>
                    <!-- <h5>{{ n.Zone }}</h5> -->
                  </div>
                </div>
              </div>
              <div class="land-info">
                <ul>
                  <li>開放時間：{{ n.Opentime }}</li>
                  <li>參觀地址：{{ n.Add }}</li>
                  <li>連絡電話：{{ n.Tel }}</li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="footer mt-3">
        <p>高雄旅遊網</p>
        <a
          target="_blank"
          href="https://data.kcg.gov.tw/dataset/attractions-information"
          >資料來源：高雄市政府</a
        >
      </div>
    </div>
  </div>
</template>
<script>
import { gmapApi } from "vue2-google-maps";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  data() {
    return {
      GetData: [],
      Area: [
        "楠梓區",
        "左營區",
        "鼓山區",
        "三民區",
        "苓雅區",
        "新興區",
        "前金區",
        "鹽埕區",
        "前鎮區",
        "旗津區",
        "小港區",
        "鳳山區",
        "茂林區",
        "甲仙區",
        "六龜區",
        "杉林區",
        "美濃區",
        "內門區",
        "仁武區",
        "田寮區",
        "旗山區",
        "梓官區",
        "阿蓮區",
        "湖內區",
        "岡山區",
        "茄萣區",
        "路竹區",
        "鳥松區",
        "永安區",
        "燕巢區",
        "大樹區",
        "大寮區",
        "林園區",
        "彌陀區",
        "橋頭區",
        "大社區",
        "那瑪夏區",
        "桃源區",
      ],
      focusArea: "請選擇",
      markers: [{ position: {}, title: null }],
      isLoading: true,
    };
  },
  components: {
    Loading,
  },
  computed: {
    displayArea() {
      return this.GetData.filter((item) => {
        return (
          item.Add.indexOf(
            this.focusArea === "請選擇" ? "三民區" : this.focusArea
          ) > 0
        );
      });
    },
  },
  watch: {},
  methods: {
    addMarker(Area) {
      let marker = {};
      this.markers.length = 0;
      if (Area === "請選擇" || !Area) {
        this.GetData.forEach((item) => {
          if (item.Add.indexOf("三民區") > 0) {
            marker = {
              lat: parseFloat(item.Py),
              lng: parseFloat(item.Px),
            };
            console.log(item.Add.indexOf("三民區") > 0);
            this.markers.push({ position: marker, title: item.Name });
          }
        });
      } else {
        this.GetData.forEach((item) => {
          if (item.Add.indexOf(Area) > 0) {
            marker = {
              lat: parseFloat(item.Py),
              lng: parseFloat(item.Px),
            };
            this.markers.push({ position: marker });
          }
        });
      }
    },
    HotArea(event) {
      this.focusArea = event.target.innerText;
      this.addMarker(event.target.innerText);
    },
  },
  async created() {
    await fetch(
      "https://api.kcg.gov.tw/api/service/get/9c8e1450-e833-499c-8320-29b36b7ace5c",
      { method: "GET" }
    )
      .then((res) => res.json())
      .then((data) => {
        this.GetData = data.data.XML_Head.Infos.Info;
        this.isLoading = false;
      });
    // this.Area = [
    //   ...new Set(this.GetData.map((item) => JSON.stringify(item.Zone))),
    // ].map((item) => JSON.parse(item));
    // console.log(new Set(this.GetData.map((item) => JSON.stringify(item.Zone))));
    this.addMarker();
  },
  mounted() {
    // setTimeout(() => {
    //   if (this.isLoading) {
    //     return alert("");
    //   }
    // }, 60000);
  },
};
</script>
<style lang="scss" scoped>
@import "./Tourism.scss";
</style>
