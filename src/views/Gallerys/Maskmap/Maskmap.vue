<template>
  <div id="Maskmap">
    <div class="City">
      <div class="toolbox">
        <div class="sticky-top bg-white shadow-sm p-2 w-100">
          <div class="form-group d-flex">
            <label for="cityName" class="mr-2 col-form-label text-right"
              >縣市</label
            >
            <div class="flex-fill">
              <select id="cityName" class="form-control" v-model="selectCity">
                <option v-for="n in Citydata" :value="n.CityName">{{
                  n.CityName
                }}</option>
              </select>
            </div>
          </div>
          <div class="form-group d-flex">
            <label for="area" class="mr-2 col-form-label text-right"
              >地區</label
            >
            <div class="flex-fill">
              <select id="area" class="form-control" v-model="selectArea">
                <option value="-- Select One --">-- Select One --</option>
                <option v-for="n in Cityarea()" :value="n.AreaName">{{
                  n.AreaName
                }}</option>
              </select>
            </div>
          </div>
          <p class="mb-0 small text-muted text-right">
            請先選擇區域查看
          </p>
        </div>
        <ul class="list-group">
          <li class="list-group-item text-left" v-for="n in filterData">
            <h3 class="mb-2">藥局名稱：{{ n.properties.name }}</h3>
            <p class="mb-2">
              成人口罩：{{ n.properties.mask_adult }} | 兒童口罩：{{
                n.properties.mask_child
              }}
            </p>
            <p class="mb-2">
              電話：<a :href="`tel:${n.properties.phone}`">{{
                n.properties.phone
              }}</a>
            </p>
            <p class="mb-2">
              地址：<a
                :href="
                  `https://www.google.com.tw/maps/place/${n.geometry.coordinates[1]},${n.geometry.coordinates[0]}`
                "
                target="_blank"
                title="Google Map"
              >
                {{ n.properties.address }}</a
              >
            </p>
          </li>
        </ul>
      </div>
    </div>
    <div class="Map">
      <l-map style="width: 100%; height: 100%;" :zoom="zoom" :center="center">
        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
        <l-marker
          v-for="n in filterData"
          :key="n.properties.name"
          :lat-lng="{
            lat: n.geometry.coordinates[1],
            lng: n.geometry.coordinates[0]
          }"
        >
          <l-icon
            :icon-url="icon.type.gold"
            :shadow-url="icon.shadowUrl"
            :icon-size="icon.iconSize"
            :icon-anchor="icon.iconAnchor"
            :popup-anchor="icon.popupAnchor"
            :shadow-size="icon.shadowSize"/>
          <l-popup :content="locationMessage(n.properties)"
        /></l-marker>
      </l-map>
    </div>
  </div>
</template>
<script>
import { LMap, LTileLayer, LMarker, LPopup, LIcon } from "vue2-leaflet";
import Citydata from "./city.json";
export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LIcon
  },
  data() {
    return {
      //縮放
      zoom: 13.5,
      //地圖位置
      center: {
        lat: 25.0295499,
        lng: 121.5186288
      },
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      icon: {
        type: {
          black:
            "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png",
          gold:
            "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png"
        },
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      },
      //城市資料
      Citydata,
      //選擇地址
      selectCity: "臺北市",
      selectArea: "中正區",
      MaskData: [],
      filterData: []
    };
  },
  watch: {
    selectCity() {
      this.Cityarea();
      this.changArea();
      this.filterLocation();
    },
    selectArea() {
      this.filterLocation();
    }
  },
  methods: {
    //地區資料
    Cityarea() {
      return this.Citydata.filter(item => item.CityName == this.selectCity).map(
        res => res.AreaList
      )[0];
    },
    changArea() {
      let t = this.Citydata.filter(
        item => item.CityName == this.selectCity
      ).map(res => res.AreaList)[0];
      this.selectArea = t[0].AreaName;
      console.log(this.selectArea);
      return t;
    },
    //篩選城市地區
    async filterLocation() {
      this.filterData = await this.MaskData.filter(item => {
        if (
          item.properties.county == this.selectCity &&
          item.properties.town == this.selectArea
        ) {
          return item;
        }
      });
      this.center = {
        lat:
          this.filterData[0] == undefined
            ? 25.0295499
            : this.filterData[0].geometry.coordinates[1],
        lng:
          this.filterData[0] == undefined
            ? 121.5186288
            : this.filterData[0].geometry.coordinates[0]
      };
    },
    //顯示詳細資訊
    locationMessage(r) {
      let str = `
        <h2>藥局名稱：${r.name}</h2>
        <p>地址：${r.address}</p>
        <p>電話：<a href="tel:${r.phone}">${r.phone}</a></p>
        <p>販售時間：${r.note}</p>
        <p>成人口罩：${r.mask_adult} | 兒童口罩：${r.mask_child}</p>
        `;
      return str;
    }
  },
  async created() {
    this.axios.defaults.withCredentials = false;
    await this.axios
      .get(
        "https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json"
      )
      .then(res => (this.MaskData = res.data.features));
    await this.filterLocation();
  },
  mounted() {}
};
</script>
<style lang="scss">
@import "./Maskmap.scss";
</style>
