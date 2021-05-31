<template>
  <div>
    <div class="title">
      <div class="common_title title_left">
        <div class="timer">{{ timer }}</div>
        <div class="region">宁波市公安局港航分局</div>
      </div>
      <div class="title_middle">{{ commonTitleText }}</div>
      <div class="common_title title_right">
        <div class="navigation">
          <!-- <div>导航</div>
          <svg-icon class="xiala"
                    icon-class="xiala"></svg-icon> -->
          <el-dropdown @command="handleCommand" trigger="click">
            <span class="el-dropdown-link">
              导航<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">测试链接</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="address">浙江省宁波市</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    commonTitleText: {
      type: String,
      default: "数字海港",
    },
  },
  data() {
    return {
      // 当前的日期
      timer: "",
    };
  },
  created() {
    this.getNewTime();
  },
  mounted() {
    document.body.style.backgroundColor = "#020128";
  },
  methods: {
    handleCommand(item) {
      window.open("https://www.baidu.com/");
    },
    // 获取当前的日期
    getNewTime() {
      this.timer = this.$until.getTime();
    },
  },
};
</script>

<style lang="less" scoped>
.title {
  background: url("../../assets/image/Common/common_title.png") no-repeat;
  background-size: cover;
  height: 2.7rem;
  color: #fff;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.4rem;
  .title_left {
    flex: 1;
    .timer {
      flex: 1;
    }
    .region {
      flex: 2;
      text-align: center;
    }
  }
  .title_middle {
    flex: 2;
    text-align: center;
    letter-spacing: 0.3rem;
    font-weight: bold;
  }
  .title_right {
    flex: 1;
    .navigation {
      flex: 2;
      text-align: center;
    }
    .address {
      flex: 1;
      text-align: right;
    }
  }
  .common_title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    > div {
      font-size: 0.3rem;
    }
    .navigation {
      display: flex;
      align-items: center;
      justify-content: center;
      /deep/.el-dropdown {
        cursor: pointer;
        color: #fff;
      }
      > div {
        margin-right: 0.1rem;
      }
      .xiala {
        font-size: 0.16rem;
        color: #fff;
      }
    }
  }
}
</style>