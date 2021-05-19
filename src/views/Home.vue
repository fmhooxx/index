<template>
  <div class="contain">
    <commonTitle></commonTitle>
    <div class="box">
      <div class="box_common box_left">
        <personnel class="box_bgi personnel"></personnel>
        <ships class="box_bgi ships"></ships>
      </div>
      <div class="box_common box_middle">
        <div class="map">地图</div>
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
  },
  methods: {
  },
}
</script>

<style lang="less" scoped>
.contain {
  width: 100%;
  height: 100%;
}
.box {
  height: 90%;
  display: flex;
  justify-content: space-between;
  padding: 0.4rem;
  .box_left {
    flex: 1;
    .personnel {
      height: 69%;
    }
    .ships {
      height: 30%;
    }
  }
  .box_middle {
    margin: 0 0.3rem;
    flex: 2;
    .map {
      height: 60%;
      background-color: rgb(167, 84, 84);
    }
    .earlyWarning {
      height: 39%;
    }
  }
  .box_right {
    flex: 1;
    .vehicle {
      height: 69%;
    }
    .goods {
      height: 30%;
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
      padding: 0.3rem;
    }
  }
}
</style>
