<template>
  <div class="AirQuality">
    <div class="AirQuality_header">
      <div class="AreaSelect">
        <h1>空氣品質指標 (AQI)</h1>
        <select name="QualitySelect" id="QualitySelect" v-model="QualitySelect">
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
      <div
        class="UpdateTime"
      >{{GetData[0] == undefined ? '2019-07-01 03:00':GetData[0].PublishTime}} 更新</div>
    </div>
    <div class="AirQuality_content">
      <div class="DisplayTotal">
        <div class="FoucsArea">
          <div class="FoucsArea_name">前金</div>
          <div class="FoucsArea_number" :style="FoucsArea_numberStyle">156</div>
        </div>
        <ul>
          <li>
            <p>
              臭氧
              <span>O3 (ppb)</span>
            </p>
            <p>0.01</p>
          </li>
          <li>
            <p>
              懸浮微粒
              <span>
                PM
                <span style="font-size: 12px;">10</span> (μg/m³)
              </span>
            </p>
            <p>0.01</p>
          </li>
          <li>
            <p>
              細懸浮微粒
              <span>
                PM
                <span style="font-size: 12px;">2.5</span> (μg/m³)
              </span>
            </p>
            <p>0.01</p>
          </li>
          <li>
            <p>
              一氧化碳
              <span>CO (ppm)</span>
            </p>
            <p>0.01</p>
          </li>
          <li>
            <p>
              二氧化硫
              <span>
                SO
                <span style="font-size: 12px;">2</span> (ppb)
              </span>
            </p>
            <p>0.01</p>
          </li>
          <li>
            <p>
              二氧化氮
              <span>
                NO
                <span style="font-size: 12px;">2</span> (ppb)
              </span>
            </p>
            <p>0.01</p>
          </li>
        </ul>
      </div>
      <ul class="ContentSelect">
        <li v-for="n in FilterArea">
          <p>{{n.SiteName}}</p>
          <p :style="FoucsArea_numberStyle">{{n.AQI}}</p>
        </li>
      </ul>
    </div>
    <footer>
      <span>資料來源：行政院環境保護署</span>
      <span>Copyright © 2019 HexSchool. All rights reserved.</span>
    </footer>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        GetData: [],
        QualityArea: [],
        QualitySelect: "請選擇地區",
        FoucsArea_numberStyle: {
          backgroundColor: "#95f084"
        }
      };
    },
    computed: {
      FilterArea() {
        return this.GetData.filter(itme => {
          return (
            itme.County ==
            (this.QualitySelect == "請選擇地區" ? "新北市" : this.QualitySelect)
          );
        });
        // console.log(str);
      }
    },
    methods: {
      FilterArea(obj, name) {
        return obj.filter(itme => {
          return itme.County == name;
        });
        // console.log(str);
      }
    },
    async created() {
      let self = this;
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
        });
      this.QualityArea = [
        ...new Set(this.GetData.map(item => JSON.stringify(item.County)))
      ].map(item => JSON.parse(item));
      console.log(this.GetData);
      console.log(this.FilterArea(this.GetData, "新竹縣"));
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
      .AreaSelect {
        margin-right: 20%;
        #QualitySelect {
          margin-top: 10px;
          width: 100%;
          border: solid #000000 3px;
          height: 56px;
          padding-left: 20px;
        }
      }
      .Indicatortable {
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
      h2 {
        width: 160px;
      }
      hr {
        width: 100%;
        border-top: 3px dashed #000;
        margin-right: 40px;
      }
      .UpdateTime {
        width: 21%;
        line-height: 35px;
      }
    }
    .AirQuality_content {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 10%;
      .DisplayTotal {
        display: inline-block;
        width: 350px;
        min-height: 535px;
        border: 3px solid #000;
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
        li {
          margin: 0 30px;
          margin-bottom: 30px;
          width: calc(100% / 2 - 60px);
          height: 97px;
          border: solid 3px #000;
          float: left;
          p {
            display: inline-block;
            width: 50%;
            height: 100%;
            font-size: 48px;
            text-align: center;
            @include Vertical_Centering;
            &:nth-of-type(1) {
              border-right: solid 3px #000;
              &:hover {
                @include mouse;
                background-color: darken($color: #ffffff, $amount: 20%);
              }
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
