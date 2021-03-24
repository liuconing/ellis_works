<template>
  <div class="AirQuality">
    <div v-if="isLoading" class="trueLoading">
      <Loading
        :active.sync="isLoading"
        :can-cancel="false"
        :is-full-page="true"
      ></Loading>
    </div>
    <div class="falseLoading" v-else-if="!isLoading">
      <div class="AirQuality_header">
        <div class="AreaSelect">
          <h1>空氣品質指標 (AQI)</h1>
          <select
            name="QualitySelect"
            id="QualitySelect"
            v-model="QualitySelect"
            @change="addMarker(QualitySelect)"
          >
            <option value="請選擇地區">請選擇地區</option>
            <option v-for="(n, key) in QualityArea" :value="n" :key="key">
              {{ n }}
            </option>
          </select>
        </div>
        <div class="Indicatortable">
          <table>
            <tbody>
              <tr>
                <th>0～50</th>
                <th>51～100</th>
                <th>101～150</th>
                <th>151～200</th>
                <th>201～300</th>
                <th>301～400</th>
              </tr>
              <tr>
                <td>良好</td>
                <td>普通</td>
                <td style="padding:0 10px;line-height: 1.5;">
                  對敏感族群不健康
                </td>
                <td style="padding:0 10px;line-height: 1.5;">
                  對所有族群不健康
                </td>
                <td>非常不健康</td>
                <td>危害</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="DisplayArea">
        <h2>{{ QualitySelect == "請選擇地區" ? "新北市" : QualitySelect }}</h2>
        <hr />
        <div class="UpdateTime">
          {{ GetData[0] == undefined ? "" : GetData[0].PublishTime }} 更新
        </div>
      </div>
      <div class="AirQuality_content">
        <div class="DisplayTotal">
          <div class="FoucsArea">
            <div class="FoucsArea_name">
              {{ !DisplayOneArea[0] ? "" : DisplayOneArea[0]["SiteName"] }}
            </div>
            <div class="FoucsArea_number" :style="FoucsAreaBackground()">
              {{ !DisplayOneArea[0] ? "" : DisplayOneArea[0]["AQI"] }}
            </div>
          </div>
          <ul>
            <li>
              <p>
                臭氧
                <span>O3 (ppb)</span>
              </p>
              <p>{{ !DisplayOneArea[0] ? "" : DisplayOneArea[0]["O3"] }}</p>
            </li>
            <li>
              <p>
                懸浮微粒
                <span>
                  PM
                  <span style="font-size: 12px;">10</span> (μg/m³)
                </span>
              </p>
              <p>{{ !DisplayOneArea[0] ? "" : DisplayOneArea[0]["PM10"] }}</p>
            </li>
            <li>
              <p>
                細懸浮微粒
                <span>
                  PM
                  <span style="font-size: 12px;">2.5</span> (μg/m³)
                </span>
              </p>
              <p>{{ !DisplayOneArea[0] ? "" : DisplayOneArea[0]["PM2.5"] }}</p>
            </li>
            <li>
              <p>
                一氧化碳
                <span>CO (ppm)</span>
              </p>
              <p>{{ !DisplayOneArea[0] ? "" : DisplayOneArea[0]["CO"] }}</p>
            </li>
            <li>
              <p>
                二氧化硫
                <span>
                  SO
                  <span style="font-size: 12px;">2</span> (ppb)
                </span>
              </p>
              <p>{{ !DisplayOneArea[0] ? "" : DisplayOneArea[0]["SO2"] }}</p>
            </li>
            <li>
              <p>
                二氧化氮
                <span>
                  NO
                  <span style="font-size: 12px;">2</span> (ppb)
                </span>
              </p>
              <p>{{ !DisplayOneArea[0] ? "" : DisplayOneArea[0]["NO2"] }}</p>
            </li>
          </ul>
        </div>
        <ul class="ContentSelect">
          <li v-for="n in FilterArea">
            <p @click="OneAreaName = n.SiteName">{{ n.SiteName }}</p>
            <p :style="FoucsArea_numberStyle">{{ n.AQI }}</p>
          </li>
        </ul>
      </div>
      <footer>
        <span
          >資料來源：<a href="https://www.epa.gov.tw/" target="_blank">
            行政院環境保護署
          </a>
        </span>
        <span>Copyright © 2019 HexSchool. All rights reserved.</span>
      </footer>
    </div>
  </div>
</template>
<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  data() {
    return {
      GetData: [],
      QualityArea: [],
      QualitySelect: "請選擇地區",
      FoucsArea_numberStyle: {
        backgroundColor: "#95f084",
      },
      DisplayArea: [],
      OneAreaName: "",
      OneArea: {},
      isLoading: true,
      closeInterval: null,
    };
  },
  components: {
    Loading,
  },
  computed: {
    FilterArea() {
      return this.GetData.filter((itme) => {
        return (
          itme.County ==
          (this.QualitySelect == "請選擇地區" ? "新北市" : this.QualitySelect)
        );
      });
    },
    DisplayOneArea() {
      return this.DisplayArea.filter((item, index, key) => {
        if (item.SiteName == this.OneAreaName) {
          return item;
        }
      });
    },
  },
  methods: {
    addMarker(Area) {
      this.DisplayArea.length = 0;
      if (Area == "請選擇地區" || !Area) {
        this.GetData.forEach((item, index, key) => {
          if (item.County == "新北市") {
            this.DisplayArea.push(item);
            this.OneAreaName = this.DisplayArea[0].SiteName;
          }
        });
      } else {
        this.GetData.forEach((item) => {
          if (item.County == Area) {
            this.DisplayArea.push(item);
            this.OneAreaName = this.DisplayArea[0].SiteName;
          }
        });
      }
    },
    FoucsAreaBackground() {
      let color = !this.DisplayOneArea[0] ? "" : this.DisplayOneArea[0]["AQI"];
      if (!color) return;
      if (color <= 50) return { backgroundColor: "#95f084" };
      else if (color <= 100) return { backgroundColor: "#ffe695" };
      else if (color <= 150) return { backgroundColor: "#ffaf6a" };
      else if (color <= 200) return { backgroundColor: "#ff5757" };
      else if (color <= 300) return { backgroundColor: "#9777ff" };
      else if (color <= 400) return { backgroundColor: "#ad1774" };
    },
    async GetAPI() {
      let googletextAPI =
        "https://script.google.com/macros/s/AKfycbybISNYaWXKBTceWX6AvtDJKSW1supmAlq5k40z9CEmME4vqFM/exec?url=http://opendata.epa.gov.tw/webapi/Data/REWIQA/?format=json";
      let golangAPI = "http://api.ellisliu.website:8088/ping";
      await fetch(golangAPI, {
        method: "GET",
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          // console.log(JSON.parse(data).records);
          this.GetData = JSON.parse(data).records;
          console.table(this.GetData);
          this.isLoading = false;
        });
    },
  },
  beforeDestroy() {
    clearInterval(this.closeInterval);
  },
  async created() {
    await this.GetAPI();
    this.closeInterval = setInterval(async () => {
      let t = new Date();
      let now = t.toLocaleTimeString().replace(/^\D*/, "");
      let num = now.indexOf(":");
      let time = now.substring(0, num) + ":00:00";
      if (now == time) {
        this.isLoading = true;
        await this.GetAPI();
      }
    }, 30000);
    this.QualityArea = [
      ...new Set(this.GetData.map((item) => JSON.stringify(item.County))),
    ].map((item) => JSON.parse(item));
    this.addMarker();
  },
};
</script>
<style lang="scss" scoped>
@import "./AirQuality.scss";
</style>
