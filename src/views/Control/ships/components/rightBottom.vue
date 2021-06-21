<template>
  <div class="right_bottom_box">
    <div class="box_title">
      <commonTopText :commonTopText="'船只违法行为管控'"></commonTopText>
    </div>
    <div class="content">
      <div class="histogram_box">
        <div
          ref="histogram"
          :style="{ height: 100 + '%', width: 100 + '%' }"
        ></div>
      </div>
      <div class="ships_box">
        <div class="ships_box_title">
          <span></span>
          <div>船只违规行为比例</div>
        </div>
        <div class="ships_bottom">
          <div
            ref="ships"
            :style="{ height: 100 + '%', width: 100 + '%' }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    // 获取柱状图数据
    this.getHistogram();
    // 获取扇形图数据
    this.getShips();
  },
  methods: {
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
          top: "25%",
          left: "0%",
          right: "0%",
          bottom: "0%",
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
            name: "单位: 艘",
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
            name: "进港船只",
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
    // 获取扇形图数据
    getShips() {
      let myChart = this.$echarts.init(this.$refs.ships);
      window.onresize = myChart.resize;
      // 环状图的颜色
      var colorList = ["#ffdf00", "#ff8f4f", "#009be6", "#a22cb2"];
      // 绘制图表
      let option = {
        tooltip: {
          trigger: "item",
          formatter: "{b} : {d}% <br/> {c}",
        },
        series: [
          {
            type: "pie",
            radius: "100%",
            center: ["50%", "50%"],
            roseType: "radius",
            data: [
              {
                value: 3000,
                name: "偷渡船",
              },
              {
                value: 2000,
                name: "违法停靠船",
              },
              {
                value: 2500,
                name: "其他",
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
                    ((params.data.value / 175043) * 100).toFixed(2) +
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
.right_bottom_box {
  .box_title {
    color: #50f4c1;
  }
  .content {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 0.2rem;
    > div {
      height: 50%;
      width: 100%;
    }
    .histogram_box {
      height: 45%;
    }
    .ships_box {
      margin-top: 0.4rem;
      .ships_box_title {
        display: flex;
        align-items: center;
        font-size: 0.3rem;
        color: #00ffff;
        margin-bottom: 0.3rem;
        > span {
          height: 0.4rem;
          width: 0.1rem;
          background-color: #00ffff;
          margin-right: 0.4rem;
        }
      }
      .ships_bottom {
        // margin-top: 0.3rem;
        height: 4.6rem;
        // width: 100%;
      }
    }
  }
}
</style>