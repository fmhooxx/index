<template>
  <div>
    <div class="box">
      <div class="box_title">
        <img src="@/assets/image/Home/right_arrow.png" alt="车辆进出分析" />
        <div>车辆进出分析</div>
        <div class="box_title_right">
          <div
            @click="dateChange(index)"
            :class="[
              index == 1 ? 'area_title_right_tow' : '',
              index == dateCurrent ? 'activeDate' : '',
            ]"
            v-for="(item, index) in date"
            :key="index"
          >
            {{ item.text }}
          </div>
        </div>
      </div>

      <div class="content">
        <div>
          <div
            ref="vehicle"
            :style="{ height: 100 + '%', width: 100 + '%' }"
          ></div>
        </div>
        <div>
          <div class="area_title">
            <div class="area_title_right">
              <div
                @click="dateChange(index)"
                :class="[
                  index == 1 ? 'area_title_right_tow' : '',
                  index == dateCurrent ? 'activeDate' : '',
                ]"
                v-for="(item, index) in date"
                :key="index"
              >
                {{ item.text }}
              </div>
            </div>
          </div>
          <div ref="annular" :style="{ height: 100 + '%', width: 100 + '%' }">
            111
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let that = "";
export default {
  data() {
    return {
      // 圆环图中间文字
      annularText: 40,
    };
  },
  beforeCreate() {
    that = this;
  },
  mounted() {
    // 获取车辆管理的环状图
    this.annular(),
      // 获取车辆进出分析柱状图
      this.getVehicle();
  },
  methods: {
    // 点击切换 日、周、月
    dateChange(index) {
      this.dateCurrent = index;
      this.getVehicle();
    },
    // 获取车辆进出分析柱状图
    getVehicle() {
      let myChart = this.$echarts.init(this.$refs.vehicle);
      window.onresize = myChart.resize;
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
        },
        legend: {
          left: "right",
          textStyle: {
            color: "#039dc6",
          },
          icon: "rect", // 形状
          itemWidth: 20, // 宽
          itemHeight: 5, // 高
          data: ["进港车辆", "离港车辆"],
        },
        grid: {
          top: "20%",
          left: "0%",
          right: "0%",
          bottom: "20%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: ["穿山", "梅山", "北仑", "镇海"],
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
                  { offset: 0, color: "#142949" }, //柱图渐变色
                  { offset: 0.5, color: "#0b6e94" }, //柱图渐变色
                  { offset: 1, color: "#01b2df" }, //柱图渐变色
                ]),
              },
            },
          },
          {
            name: "离港车辆",
            type: "bar",
            data: [150, 160, 170, 180],
            barWidth: 20,
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#474038" }, //柱图渐变色
                  { offset: 0.5, color: "#8a7236" }, //柱图渐变色
                  { offset: 1, color: "#c39c35" }, //柱图渐变色
                ]),
              },
            },
          },
        ],
      };
      myChart.setOption(option);
    },
    // 获取车辆管理的折线图
    annular() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(this.$refs.annular);
      window.onresize = myChart.resize;
      // 折线图的颜色
      var colorList = [
        "#7eacea",
        "#e15777",
        "#95ea71",
        "#ea9b4f",
        "#7577df",
        "#be72d8",
        "#fff",
      ];
      // 绘制图表
      let option = {
        tooltip: {
          trigger: "axis",

          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: {
          left: "right",
          textStyle: {
            color: "#039dc6",
          },
          data: ["穿山港区", "梅山港区", "北仑港区", "镇海港区"],
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        grid: {
          left: "0%",
          right: "0%",
          bottom: "10%",
          top: "20%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: [
              "00:00",
              "04:00",
              "08:00",
              "12:00",
              "16:00",
              "20:00",
              "24:00",
            ],
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
            axisLine: {
              lineStyle: {
                type: "solid",
                color: "#74acef", //左边线的颜色
                width: "2", //坐标线的宽度
              },
            },
          },
        ],
        series: [
          {
            name: "穿山港区",
            type: "line",

            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [23, 30, 27, 35, 45, 25, 30],
          },
          {
            name: "梅山港区",
            type: "line",

            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [6, 21, 12, 19, 19, 37, 10],
          },
          {
            name: "北仑港区",
            type: "line",

            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [6, 10, 27, 9, 16, 7, 8],
          },
          {
            name: "镇海港区",
            type: "line",

            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [6, 20, 19, 25, 12, 21, 10],
          },
        ],
      };
      myChart.setOption(option);
    },
  },
};
</script>

<style lang="less" scoped>
.box {
  height: 100%;
  .box_title {
    display: flex;
    align-items: center;
    color: #50f4c1;
    > img {
      height: 0.6rem;
    }
    > div {
      font-size: 0.65rem;
      font-weight: bold;
      margin-left: 1rem;
    }
  }
  .content {
    height: 98%;
    display: flex;
    flex-direction: column;
    > div {
      height: 50%;
      width: 100%;
    }
    .area_title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0.14rem;
      color: #50f4c1;
      margin-bottom: 0.3rem;
      .area_title_left {
        display: flex;
        align-items: center;
        height: 100%;
        > span {
          width: 0.1rem;
          height: 0.4rem;
          background-color: #50f4c1;
          margin-right: 0.4rem;
        }
      }
      .area_title_right {
        display: flex;
        align-items: center;
        border: 0.02rem solid #0f3a64;
        > div {
          color: #20a8ce;
          padding: 0.2rem;
          cursor: pointer;
        }
        .area_title_right_tow {
          border-left: 0.01rem solid #0f3a64;
          border-right: 0.01rem solid #0f3a64;
        }
        .activeDate {
          background-color: #0f3a64;
        }
      }
    }
  }
}
</style>