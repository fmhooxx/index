<template>
  <div id="app"
       :style="{height: windowHeight + 'px'}">
    <router-view :style="{height: windowHeight + 'px'}" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      windowHeight: document.documentElement.clientHeight,
    }
  },
  // <!--在watch中监听实时宽高-->
  watch: {
    windowHeight (val) {
      let that = this;
    },
  },
  mounted () {
    console.log(process.env.outputDir);
    var that = this;
    window.onresize = () => {
      return (() => {
        window.fullHeight = document.documentElement.clientHeight;
        window.fullWidth = document.documentElement.clientWidth;
        that.windowHeight = window.fullHeight;  // 高
      })()
    };
  },
}
</script>

<style lang="less">
#app {
  height: 100%;
}
@import url("./assets/css/style.css");
</style>
