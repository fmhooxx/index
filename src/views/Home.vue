<template>
  <div class="contain">
    <commonTitle></commonTitle>
    <div class="box">
      <div class="box_common box_left">
        <personnel class="box_bgi personnel"></personnel>
        <ships class="box_bgi ships"></ships>
      </div>
      <div class="box_common box_middle">
        <div class="map"
             id="map2"></div>
        <earlyWarning class="box_bgi earlyWarning"></earlyWarning>
      </div>
      <div class="box_common box_right">
        <vehicle class="box_bgi vehicle"></vehicle>
        <goods class="box_bgi goods"></goods>
      </div>
    </div>
  </div>
</template>

<script>
import earlyWarning from '../components/Home/earlyWarning'
import goods from '../components/Home/goods'
import personnel from '../components/Home/personnel'
import ships from '../components/Home/ships'
import vehicle from '../components/Home/vehicle'
export default {
  components: {
    earlyWarning: earlyWarning,
    goods: goods,
    personnel: personnel,
    ships: ships,
    vehicle: vehicle,
  },
  name: 'Home',
  mounted () {
    document.body.style.backgroundColor = "#020128";
    this.initMap();
  },
  methods: {
    initMap () {
      let map = L.map("map2", {
        minZoom: 3,
        maxZoom: 14,
        center: [39.550339, 116.114129],
        zoom: 12,
        zoomControl: false,
        attributionControl: false,
        crs: L.CRS.EPSG3857
      });
      console.log('map start')
      this.map = map;　　　　//data上需要挂载
      window.map = map;
      L.tileLayer(
        "http://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}"
      ).addTo(map);
    }
  },
}
</script>

<style lang="less" scoped>
.contain {
  width: 100%;
  height: 100%;
}
.box {
  height: 91%;
  display: flex;
  justify-content: space-between;
  padding: 0 0.6rem;
  .box_left {
    width: 25%;
    .personnel {
      height: 60%;
    }
    .ships {
      height: 39%;
    }
  }
  .box_middle {
    width: 49%;
    margin: 0 0.3rem;
    .map {
      height: 65%;
    }
    .earlyWarning {
      height: 34%;
    }
  }
  .box_right {
    width: 25%;
    .vehicle {
      height: 60%;
    }
    .goods {
      height: 39%;
    }
  }
  .box_common {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .box_bgi {
      background: url("../assets/image/Home/home_bgi.jpg");
      background-size: 100% 100%;
      border-radius: 0.5rem;
      padding: 0.6rem;
    }
  }
}
</style>
