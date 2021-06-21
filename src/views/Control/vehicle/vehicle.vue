<template>
  <div class="contain">
    <commonTitle :commonTitleText="'数智港警 — 车辆管控'"></commonTitle>
    <div class="box">
      <div class="box_common box_left">
        <leftTop class="box_bgi leftTop"></leftTop>
        <leftBottom class="box_bgi leftBottom"></leftBottom>
      </div>
      <div class="box_common box_middle">
        <div class="map" id="map2"></div>
        <middleBottom class="box_bgi middleBottom"></middleBottom>
      </div>
      <div class="box_common box_right">
        <rightTop class="box_bgi rightTop"></rightTop>
        <rightBottom class="box_bgi rightBottom"></rightBottom>
      </div>
    </div>
  </div>
</template>

<script>
let map = "";
import leftBottom from "./components/leftBottom";
import leftTop from "./components/leftTop";
import middleBottom from "./components/middleBottom";
import rightBottom from "./components/rightBottom";
import rightTop from "./components/rightTop";
export default {
  components: {
    leftBottom,
    leftTop,
    middleBottom,
    rightBottom,
    rightTop,
  },
  mounted() {
    // const a = document.createElement("script");
    // a.type = "text/javascript";
    // a.src = "http://10.119.1.18/PGIS_S_TileMapV7/thirds/assign.polyfill.js";
    // document.body.appendChild(a);
    // const b = document.createElement("script");
    // b.type = "text/javascript";
    // b.src = "http://10.119.1.18/PGIS_S_TileMapV7/lib/EzMapAPI.js";
    // document.body.appendChild(b);
    // const c = document.createElement("script");
    // c.type = "text/javascript";
    // c.src = "http://10.119.1.18/PGIS_S_TileMapV7/lib/EzServerClient.min.js";
    // document.body.appendChild(c);
    // // this.initMap();
    this.init();
  },
  methods: {
    initMap() {
      map = new EzMap("map2");
      map.getTileLayers().getLayers().clear();
      var ezMapLayer = new EzTileLayerTDT(
        "夜视",
        "http://10.119.1.18/PGIS_S_TileMapServer/Maps/NBTDTYS"
      );
      map.addLayer(ezMapLayer);
      map.zoomTo(13);
    },
    init() {
      let map = this.$L.map("map2", {
        minZoom: 3,
        maxZoom: 14,
        center: [39.550339, 116.114129],
        zoom: 12,
        zoomControl: false,
        attributionControl: false,
        crs: L.CRS.EPSG3857,
      });
      this.map = map; //data上需要挂载
      window.map = map;
      this.$L
        .tileLayer(
          "http://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}"
        )
        .addTo(map);
    },
  },
};
</script>
<style>
/* @import url("http://10.119.1.18/PGIS_S_TileMapV7/lib/EzServerClient.min.css"); */
/* @import url("http://10.119.1.18/PGIS_S_TileMapV7/mapDemopage/css/popup.css"); */
</style>
<style lang="less" scoped>
.contain {
  width: 100%;
  height: 100%;
  .box {
    height: 91%;
    display: flex;
    justify-content: space-between;
    padding: 0 0.6rem;
    .box_left {
      width: 25%;
      .leftTop {
        height: 50%;
      }
      .leftBottom {
        height: 49%;
      }
    }
    .box_middle {
      width: 49%;
      margin: 0 0.3rem;
      .map {
        height: 55%;
      }
      .middleBottom {
        height: 44%;
      }
    }
    .box_right {
      width: 25%;
      .rightTop {
        height: 50%;
      }
      .rightBottom {
        height: 49%;
      }
    }
    .box_common {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .box_bgi {
        background: url("../../../assets/image/Home/home_bgi.jpg");
        background-size: 100% 100%;
        border-radius: 0.5rem;
        padding: 0.6rem;
      }
    }
  }
}
</style>