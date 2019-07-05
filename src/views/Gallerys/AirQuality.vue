<template>
  <div class="AirQuality">
    <div v-if="isLoading" class="trueLoading">
      <Loading :active.sync="isLoading" :can-cancel="false" :is-full-page="true"></Loading>
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
            <option v-for="(n,key) in QualityArea" :value="n" :key="key">{{n}}</option>
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
                <td style="padding:0 10px;line-height: 1.5;">對敏感族群不健康</td>
                <td style="padding:0 10px;line-height: 1.5;">對所有族群不健康</td>
                <td>非常不健康</td>
                <td>危害</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="DisplayArea">
        <h2>{{QualitySelect == '請選擇地區' ? '新北市':QualitySelect}}</h2>
        <hr />
        <div class="UpdateTime">{{GetData[0] == undefined ? '':GetData[0].PublishTime}} 更新</div>
      </div>
      <div class="AirQuality_content">
        <div class="DisplayTotal">
          <div class="FoucsArea">
            <div class="FoucsArea_name">{{!DisplayOneArea[0]?'':DisplayOneArea[0]['SiteName']}}</div>
            <div
              class="FoucsArea_number"
              :style="FoucsAreaBackground()"
            >{{!DisplayOneArea[0]?'':DisplayOneArea[0]['AQI']}}</div>
          </div>
          <ul>
            <li>
              <p>
                臭氧
                <span>O3 (ppb)</span>
              </p>
              <p>{{!DisplayOneArea[0]?'':DisplayOneArea[0]['O3']}}</p>
            </li>
            <li>
              <p>
                懸浮微粒
                <span>
                  PM
                  <span style="font-size: 12px;">10</span> (μg/m³)
                </span>
              </p>
              <p>{{!DisplayOneArea[0]?'':DisplayOneArea[0]['PM10']}}</p>
            </li>
            <li>
              <p>
                細懸浮微粒
                <span>
                  PM
                  <span style="font-size: 12px;">2.5</span> (μg/m³)
                </span>
              </p>
              <p>{{!DisplayOneArea[0]?'':DisplayOneArea[0]['PM2.5']}}</p>
            </li>
            <li>
              <p>
                一氧化碳
                <span>CO (ppm)</span>
              </p>
              <p>{{!DisplayOneArea[0]?'':DisplayOneArea[0]['CO']}}</p>
            </li>
            <li>
              <p>
                二氧化硫
                <span>
                  SO
                  <span style="font-size: 12px;">2</span> (ppb)
                </span>
              </p>
              <p>{{!DisplayOneArea[0]?'':DisplayOneArea[0]['SO2']}}</p>
            </li>
            <li>
              <p>
                二氧化氮
                <span>
                  NO
                  <span style="font-size: 12px;">2</span> (ppb)
                </span>
              </p>
              <p>{{!DisplayOneArea[0]?'':DisplayOneArea[0]['NO2']}}</p>
            </li>
          </ul>
        </div>
        <ul class="ContentSelect">
          <li v-for="n in FilterArea">
            <p @click="OneAreaName = n.SiteName">{{n.SiteName}}</p>
            <p :style="FoucsArea_numberStyle">{{n.AQI}}</p>
          </li>
        </ul>
      </div>
      <footer>
        <span>資料來源：行政院環境保護署</span>
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
          backgroundColor: "#95f084"
        },
        DisplayArea: [],
        OneAreaName: "",
        OneArea: {},
        isLoading: true
      };
    },
    components: {
      Loading
    },
    computed: {
      FilterArea() {
        return this.GetData.filter(itme => {
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
      }
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
          this.GetData.forEach(item => {
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
        await fetch(
          "https://script.google.com/macros/s/AKfycbybISNYaWXKBTceWX6AvtDJKSW1supmAlq5k40z9CEmME4vqFM/exec?url=http://opendata.epa.gov.tw/webapi/Data/REWIQA/?format=json",
          {
            method: "GET"
          }
        )
          .then(res => {
            return res.json();
          })
          .then(data => {
            this.GetData = data;
            this.isLoading = false;
          });
      }
    },
    async created() {
      await this.GetAPI();
      setInterval(async () => {
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
        ...new Set(this.GetData.map(item => JSON.stringify(item.County)))
      ].map(item => JSON.parse(item));
      this.addMarker();
      // console.log(this.GetData);
      // console.log(this.FilterArea(this.GetData, "新竹縣"));
    }
  };
</script>
<style lang="scss" scoped>
  * {
    font-family: Noto Sans CJK TC;
    font-weight: bold;
  }
  .AirQuality {
    padding-top: 30px;
    .AirQuality_header {
      display: flex;
      justify-content: center;
      align-items: center;
      @include dai_425 {
        flex-direction: column;
      }
      .AreaSelect {
        margin-right: 20%;
        @include dai_425 {
          margin-right: 0;
        }
        #QualitySelect {
          margin-top: 10px;
          width: 100%;
          border: solid #000000 3px;
          height: 56px;
          padding-left: 20px;
        }
      }
      .Indicatortable {
        @include dai_425 {
          margin-top: 30px;
        }
        table {
          th,
          td {
            text-align: center;
            width: 120px;
            height: 55px;
            font-size: 16px;
            vertical-align: middle;

            border: 3px solid #000000;
          }
          th {
            &:nth-of-type(1) {
              background-color: #95f084;
            }
            &:nth-of-type(2) {
              background-color: #ffe695;
            }
            &:nth-of-type(3) {
              background-color: #ffaf6a;
            }
            &:nth-of-type(4) {
              background-color: #ff5757;
            }
            &:nth-of-type(5) {
              background-color: #9777ff;
            }
            &:nth-of-type(6) {
              background-color: #ad1774;
            }
          }
        }
      }
    }
    .DisplayArea {
      display: flex;
      justify-content: center;
      align-content: center;
      padding: 0 10%;
      height: 35px;
      margin: 45px 0;
      @include dai_425 {
        padding: 0;
        flex-direction: column;
        height: auto;
        margin: 20px 0;
      }
      h2 {
        width: 160px;
        @include dai_425 {
          text-align: center;
          width: 100%;
        }
      }
      hr {
        width: 100%;
        border-top: 3px dashed #000;
        margin-right: 40px;
        @include dai_425 {
          display: none;
        }
      }
      .UpdateTime {
        width: 21%;
        line-height: 35px;
        @include dai_425 {
          font-size: 16px;
          width: auto;
          text-align: center;
        }
      }
    }
    .AirQuality_content {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 10%;
      @include dai_425 {
        padding: 0;
        flex-direction: column;
      }
      .DisplayTotal {
        display: inline-block;
        width: 350px;
        min-height: 535px;
        border: 3px solid #000;
        @include dai_425 {
          min-height: 300px;
        }
        .FoucsArea {
          div {
            display: inline-block;
            width: 50%;
            height: 97px;
            font-size: 48px;
            line-height: 97px;
            text-align: center;
            font-weight: bold;
            border-bottom: 3px solid #000;
            @include dai_425 {
              font-size: 28px;
              height: 65px;
              line-height: 65px;
            }
          }
        }
        ul {
          width: 100%;
          height: 100%;
          padding: 30px;
          li {
            padding-top: 15px;
            padding-bottom: 20px;
            border-bottom: 1px solid #000000;

            p {
              display: inline-block;
              font-size: 24px;
              font-weight: bold;

              &:nth-of-type(1) {
                width: 80%;
                margin-right: -3px;
              }
              &:nth-of-type(2) {
                width: 20%;
                text-align: right;
              }
              span {
                font-size: 16px;
                font-weight: 500;
                margin-left: -3px;
                @include dai_425 {
                  font-size: 12px;
                  margin-left: 0px;
                }
              }
              @include dai_425 {
                font-size: 16px;
              }
            }
          }
        }
      }
      .ContentSelect {
        width: calc(100% - 353px);
        min-height: 535px;
        display: inline-block;
        padding-left: 30px;
        @include dai_425 {
          margin-top: 30px;
          width: 100%;
          min-height: auto;
        }
        li {
          margin: 0 30px;
          margin-bottom: 30px;
          width: calc(100% / 2 - 60px);
          height: 97px;
          border: solid 3px #000;
          float: left;
          @include dai_425 {
            width: calc(100% / 2 - 30px);
            margin: 0 15px;
            height: 50px;
            margin-bottom: 15px;
          }
          p {
            display: inline-block;
            width: 50%;
            height: 100%;
            font-size: 48px;
            text-align: center;
            @include TextCenter;
            &:nth-of-type(1) {
              border-right: solid 3px #000;
              &:hover {
                @include mouse;
                background-color: darken($color: #ffffff, $amount: 20%);
              }
            }
            @include dai_425 {
              font-size: 16px;
            }
          }
        }
      }
    }
  }
  footer {
    margin-top: 20px;
    height: 35px;
    background-color: #000;
    padding: 0 15%;
    display: flex;
    justify-content: space-between;
    align-content: center;
    span {
      color: white;
      line-height: 35px;
    }
  }
</style>
