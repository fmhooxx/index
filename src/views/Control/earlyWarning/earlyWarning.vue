<template>
  <div
    class="earlyWarning_box"
    :style="{ height: windowHeight + 'px', width: windowWidth + 'px' }"
  ></div>
</template>

<script>
export default {
  data() {
    return {
      windowHeight: document.documentElement.clientHeight,
      windowWidth: document.documentElement.clientWidth,
    };
  },
  // <!--在watch中监听实时宽高-->
  watch: {
    windowHeight(val) {
      let that = this;
    },
  },
  mounted() {
    var that = this;
    window.onresize = () => {
      return (() => {
        window.fullHeight = document.documentElement.clientHeight;
        window.fullWidth = document.documentElement.clientWidth;
        that.windowHeight = window.fullHeight; // 高
        that.windowWidth = window.fullWidth; // 宽
      })();
    };
  },
};
</script>

<style lang="less" scoped>
.earlyWarning_box {
  position: fixed;
  width: 100%;
  height: 100%;
  background: url("../../../assets/image/Control/earlyWarning.png");
  background-size: cover;
}
</style>