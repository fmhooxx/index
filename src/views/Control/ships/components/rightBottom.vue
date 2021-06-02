<template>
  <div>
    <div class="box">
      <div class="box_title">
        <div class="box_title_left">
          <img
            src="@/assets/image/Home/right_arrow.png"
            alt="船只违法行为管控"
          />
          <div>船只违法行为管控</div>
        </div>
      </div>
      <div class="top_box">
        <div ref="top" :style="{ height: 100 + '%', width: 100 + '%' }"></div>
      </div>

      <div class="area_title">
        <div class="area_title_left">
          <span></span>
          <div>船只违规行为比例</div>
        </div>
      </div>
      <div class="annular_box">
        <div
          ref="annular"
          :style="{ height: 100 + '%', width: 100 + '%' }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
let that = "";
export default {
  data() {
    return {
      // 船只数据列表
    };
  },
  beforeCreate() {
    that = this;
  },
  mounted() {
    // 获取车辆管控的环状图
    this.annular();
    this.top();
  },
  methods: {
    // 点击切换 日、周、月
    dateChange(index) {
      this.dateCurrent = index;
    },
    // 获取人员管控的环状图
    top() {
      let myChart = this.$echarts.init(this.$refs.top);
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
        grid: {
          top: "10%",
          left: "0%",
          right: "0%",
          bottom: "10%",
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
            name: "违法船只",
            type: "bar",
            data: [9900, 5000, 9900, 5000],
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
        ],
      };
      myChart.setOption(option);
    },
    annular() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(this.$refs.annular);
      window.onresize = myChart.resize;
      // 环状图的颜色
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
          trigger: "item",
          formatter: "{b} : {d}% <br/> {c}",
        },
        series: [
          {
            type: "pie",
            radius: "70%",
            roseType: "radius",
            center: ["50%", "50%"],
            // roseType: 'radius',
            data: [
              {
                value: 2500,
                name: "其他",
              },
              {
                value: 2000,
                name: "违法停靠船",
              },
              {
                value: 3000,
                name: "偷渡船",
              },
              {
                value: 2500,
                name: "走私船",
              },
            ],
            // 设置圆环颜色
            itemStyle: {
              normal: {
                color: function (params) {
                  return colorList[params.dataIndex];
                },
              },
            },
            labelLine: {
              normal: {
                show: true,
                length: 10,
                length2: 10,
                lineStyle: {
                  width: 2,
                },
              },
            },
            label: {
              normal: {
                formatter: function (params) {
                  var str =
                    "{c|" +
                    params.data.name +
                    "}" +
                    "{b|\n" +
                    ((params.data.value / 10000) * 100).toFixed(2) +
                    "%}" +
                    "{c|\n" +
                    params.data.value +
                    "}";
                  return str;
                },
                rich: {
                  c: {
                    color: "#97c5f6",
                    fontSize: 12,
                    align: "left",
                    padding: 4,
                  },
                  b: {
                    color: "#ffac29",
                    fontSize: 12,
                    align: "left",
                    padding: 4,
                  },
                },
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
.box {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .box_title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .box_title_left {
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
    .box_title_right {
      font-size: 0.14rem;
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
    .area_title_right_tow {
      border-left: 0.01rem solid #0f3a64;
      border-right: 0.01rem solid #0f3a64;
    }
    .activeDate {
      background-color: #0f3a64;
    }
  }
  .annular {
    display: flex;
    align-items: center;
    justify-content: center;
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
  }
  .annular_box {
    height: 50%;
  }
  .top {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .top_box {
    height: 50%;
  }
}
</style>