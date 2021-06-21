<template>
  <div class="left_top_box">
    <div class="box_title" @click="jump">
      <commonTopText
        :flag="true"
        ref="commonTopText"
        :commonTopText="'一人一档统计(布控)'"
      ></commonTopText>
    </div>
    <div class="box_list">
      <div
        class="list_item"
        :class="current == index ? 'active' : ''"
        v-for="(item, index) in list"
        :key="index"
        @click="currentChange(index)"
      >
        <span>{{ item.num }}</span>
        <div>{{ item.text }}</div>
      </div>
    </div>
    <div class="box_statistics">
      <span></span>
      <div>
        <div class="box_statistics_left">港区实有人口: <span>9234</span></div>
        <div class="box_statistics_right">漏登人口: <span>56</span></div>
      </div>
    </div>
    <div class="histogram_box">
      <div
        ref="histogram"
        :style="{ height: 100 + '%', width: 100 + '%' }"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          text: "镇海港区",
          num: 1009,
        },
        {
          text: "梅山港区",
          num: 1200,
        },
        {
          text: "北仑港区",
          num: 1010,
        },
        {
          text: "穿山港区",
          num: 1036,
        },
      ],
      // 当前选中项
      current: 0,
    };
  },
  mounted() {
    // 获取柱状图数据
    this.getHistogram();
  },
  methods: {
    // 跳转页面
    jump() {
      this.$refs.commonTopText.goUrl("/peopleOutDetails");
    },
    // 点击 list 切换显示
    currentChange(index) {
      this.current = index;
    },
    // 获取柱状图数据
    getHistogram() {
      let myChart = this.$echarts.init(this.$refs.histogram);
      window.onresize = myChart.resize;
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
            crossStyle: {
              color: "#999",
            },
          },
        },
        grid: {
          top: "20%",
          left: "0%",
          right: "0%",
          bottom: "0%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: ["港区人员", "司机", "船员", "临时访客"],
            axisPointer: {
              type: "shadow",
            },
            axisLine: {
              lineStyle: {
                type: "solid",
                color: "#74acef", //左边线的颜色
                width: "2", //坐标线的宽度
              },
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "单位: 人",
            min: 0,
            // axisLabel: {
            //   formatter: '{value} °C',
            // },
            axisLine: {
              lineStyle: {
                type: "solid",
                color: "#74acef", //左边线的颜色
                width: "2", //坐标线的宽度
              },
            },
            splitLine: {
              show: true,
            },
          },
        ],
        series: [
          {
            name: "进港车辆",
            type: "bar",
            data: [100, 200, 300, 400],
            barWidth: 20,
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#00caff" }, //柱图渐变色
                  { offset: 0.5, color: "#0089e9" }, //柱图渐变色
                  { offset: 1, color: "#0040ce" }, //柱图渐变色
                ]),
              },
            },
          },
        ],
      };
      myChart.setOption(option);
    },
  },
};
</script>

<style lang="less" scoped>
.left_top_box {
  .box_title {
    color: #50f4c1;
  }
  .box_list {
    display: flex;
    justify-content: space-between;
    margin: 1rem 0;
    .list_item {
      width: 24%;
      height: 3.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: url("../../../../assets/image/Control/list.jpg");
      background-size: 100% 100%;
      cursor: pointer;
      > span {
        font-size: 0.8rem;
        font-weight: bold;
        color: #00fafd;
      }
      > div {
        font-size: 0.3rem;
        margin-top: 0.6rem;
        color: #69abd1;
      }
    }
    .active {
      background: url("../../../../assets/image/Control/list_current.jpg");
      background-size: 100% 100%;
      > span {
        color: #fff;
      }
      > div {
        color: #fff;
      }
    }
  }
  .box_statistics {
    display: flex;
    align-items: center;
    justify-content: space-between;
    > div {
      font-size: 0.3rem;
      color: #3d84b9;
      display: flex;
      align-items: center;
      .box_statistics_left {
        > span {
          color: #e19016;
        }
      }
      .box_statistics_right {
        margin-left: 1rem;
        > span {
          color: #00d326;
        }
      }
      span {
        margin-left: 0.5rem;
      }
    }
  }
  .histogram_box {
    height: 8rem;
  }
}
</style>