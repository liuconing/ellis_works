<template>
  <div class="Tourism">
    <div v-if="isLoading" class="trueLoading">
      <Loading :active.sync="isLoading" :can-cancel="false" :is-full-page="true"></Loading>
    </div>
    <div v-else-if="!isLoading" class="falseLoading">
      <div class="wrae clearfix">
        <div class="container-fluid header-img">
          <div class="row d-flex justify-content-center header-title">
            <h1>高雄旅遊景點</h1>
          </div>
          <div class="manu">
            <select class="area" v-model="focusArea" @change="addMarker(focusArea)">
              <option value="請選擇">--請選擇地區--</option>
              <option v-for="(n,key) in Area" :value="n" :key="key">{{n}}</option>
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
            :center="{lat: markers[0].position.lat, lng: markers[0].position.lng}"
            :zoom="11"
            map-type-id="terrain"
            style="width: 500px; height: 300px"
          >
            <GmapMarker
              :key="index"
              v-for="(m, index) in markers"
              :position="m.position"
              :clickable="true"
              :draggable="true"
              :title="m.title"
              @click="center=m.position"
            />
          </GmapMap>
        </div>

        <hr style="border: 3px dashed #559AC8;" />
        <div class="content">
          <div class="content-title">{{focusArea == '請選擇'?'三民區':focusArea}}</div>
          <ul class="content-ul">
            <li class="content-li" v-for="(n,key) in displayArea" :key="key">
              <div class="land-img" :style="`background-image: url(${n.Picture1});`">
                <div class="land-content">
                  <div class="land-text">
                    <h3>{{n.Name}}</h3>
                    <h5>{{n.Zone}}</h5>
                  </div>
                </div>
              </div>
              <div class="land-info">
                <ul>
                  <li>開放時間：{{n.Opentime}}</li>
                  <li>參觀地址：{{n.Add}}</li>
                  <li>連絡電話：{{n.Tel}}</li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="footer mt-3">
        <p>高雄旅遊網</p>
        <a target="_blank" href="https://data.kcg.gov.tw/dataset/attractions-information">資料來源：高雄市政府</a>
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
        Area: [],
        focusArea: "請選擇",
        markers: [],
        isLoading: true
      };
    },
    components: {
      Loading
    },
    computed: {
      displayArea() {
        return this.GetData.filter(item => {
          return (
            item.Zone == (this.focusArea == "請選擇" ? "三民區" : this.focusArea)
          );
        });
      }
    },
    watch: {},
    methods: {
      addMarker(Area) {
        console.log("Area");
        let marker = {};
        this.markers.length = 0;
        if (Area == "請選擇" || !Area) {
          this.GetData.forEach(item => {
            if (item.Zone == "三民區") {
              marker = {
                lat: parseFloat(item.Py),
                lng: parseFloat(item.Px)
              };
              this.markers.push({ position: marker, title: item.Name });
            }
          });
        } else {
          this.GetData.forEach(item => {
            if (item.Zone == Area) {
              marker = {
                lat: parseFloat(item.Py),
                lng: parseFloat(item.Px)
              };
              this.markers.push({ position: marker });
            }
          });
        }
      },
      HotArea(event) {
        this.focusArea = event.target.innerText;
        this.addMarker(event.target.innerText);
      }
    },
    async created() {
      await fetch(
        "https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97",
        { method: "GET" }
      )
        .then(res => {
          return res.json();
        })
        .then(data => {
          this.GetData = data.result.records;
          this.isLoading = false;
        });
      this.Area = [
        ...new Set(this.GetData.map(item => JSON.stringify(item.Zone)))
      ].map(item => JSON.parse(item));
      this.addMarker();
    },
    mounted() {
      setTimeout(() => {
        if (this.isLoading) {
          return alert("");
        }
      }, 60000);
    }
  };
</script>
<style lang="scss" scoped>
  .wrae {
    max-width: 1024px;
    margin: 0 auto;
    .header-img {
      min-height: 380px;
      max-width: 100%;
      background-image: url(https://i.imgur.com/i4GvwRh.png);
      background-size: cover;
      background-position: center center;
      .header-title {
        padding-top: 50px;
        h1 {
          font-family: PingFangTC-Regular;
          font-size: 40px;
          color: #ffffff;
          letter-spacing: 3.89px;
        }
      }
      .manu {
        margin-top: 20px;
        position: relative;
        text-align: center;
        .area {
          margin-top: 80px;
          max-width: 452px;
          height: 30px;
          background: rgba(255, 255, 255, 0.7);
          border: 3px solid #ffffff;
          border-radius: 3px;
          text-align: center;
        }
      }
    }
  }

  .fire-top {
    ul {
      max-width: 800px;
      min-height: 112px;
      background: #ffffff;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
      border-radius: 5px;
      margin: 0 auto;
      margin-top: -50px;
      h3 {
        font-family: AppleSystemUIFont;
        font-size: 18px;
        color: #000000;
        padding: 20px 0 0 20px;
      }
      li {
        text-align: center;
        width: 130px;
        height: 42px;
        margin-left: 90px;
        margin-top: 10px;
        @include mouse;
        @include TextCenter;
        @include dai_425 {
          margin-top: 20px;
          margin-left: 0px;
        }
      }
    }
  }

  .content {
    margin: auto;
    width: 100%;
    height: 100%;
    .content-title {
      font-family: SFNSDisplay;
      font-size: 36px;
      color: #8a82cc;
      text-align: center;
    }
    .content-ul {
      max-width: 100%;
      min-height: auto;
      text-overflow: ellipsis;
      .content-li {
        background: #ffffff;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
        float: left;
        width: 46%;
        margin-left: 2%;
        margin-right: 2%;
        box-sizing: border-box;
        margin-top: 20px;
        border-radius: 10px;
        @include dai_425 {
          float: none;
          width: 96%;
        }
        &:hover {
          box-shadow: 5px 5px 60px rgba(0, 0, 0, 0.4);
          transform: translate(-5px, -5px);
        }
        .land-img {
          max-width: 500px;
          min-height: 155px;
          background-size: cover;
          background-position: center center;
          position: relative;
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
          .land-text {
            width: 100%;
            background-image: linear-gradient(
              -180deg,
              rgba(0, 0, 0, 0) 0%,
              rgba(0, 0, 0, 0.54) 100%
            );
            h3 {
              font-family: SFNSDisplay;
              font-size: 24px;
              color: #ffffff;
              background-color: rgba(0, 0, 0, 0.8);
              border-radius: 5px;
              position: absolute;
              left: 10px;
              bottom: 0;
            }
            h5 {
              font-family: PingFangTC-Regular;
              font-size: 16px;
              color: #ffffff;
              position: absolute;
              background-color: rgba(0, 0, 0, 0.8);
              border-radius: 5px;
              bottom: 0;
              right: 10px;
            }
          }
        }
        .land-info {
          li {
            padding: 10px 10px 10px 10px;
            // &:hover {
            //   box-shadow: 5px 5px 60px rgba(0, 0, 0, 0.4);
            //   transform: translate(-5px, -5px);
            // }
          }
        }
      }
    }
  }
  .footer {
    max-width: 100%;
    height: 90px;
    margin: 0 auto;
    background-color: #559ac8;
    clear: both;
    text-align: center;
    font-family: AppleSystemUIFont;
    p {
      font-size: 14px;
      color: #ffffff;
      padding-top: 24px;
    }
    a {
      font-size: 14px;
      color: #ffd366;
    }
  }
  #map {
    height: 400px;
    max-width: 600px;
    margin-top: 20px;
    border-radius: 10px;
  }
</style>
