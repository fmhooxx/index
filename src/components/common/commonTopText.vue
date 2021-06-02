<template>
  <div class="box">
    <div class="common_box" :class="flag ? 'common_flag' : ''">
      <slot name="commonTopImg">
        <img src="@/assets/image/Home/right_arrow.png" alt="" />
      </slot>
      <div>{{ commonTopText }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    commonTopText: {
      type: String,
      required: true,
    },
    flag: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    console.log(this.flag);
    if (this.flag) {
    }
  },
  methods: {
    goUrl(url) {
      this.$router.push(url);
    },
  },
};
</script>

<style lang="less" scoped>
.box {
  width: 100%;
  .common_box {
    width: 100%;
    display: flex;
    align-items: center;
    > img {
      height: 0.6rem;
      width: 1rem;
    }
    > div {
      font-size: 0.65rem;
      font-weight: bold;
      margin-left: 1rem;
    }
  }
  .common_flag {
    cursor: pointer;
  }
}
</style>