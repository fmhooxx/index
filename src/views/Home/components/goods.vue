<template>
  <div>
    <div class="box">
      <div class="box_title">
        <commonTopText :commonTopText="'货物管控'"></commonTopText>
      </div>
      <div class="content">
        <div class="bot_top">
          <div
            ref="goods"
            :style="{ height: 100 + '%', width: 100 + '%' }"
          ></div>
        </div>
        <div class="bot_bottom">
          <div>
            <div
              ref="annularLeft"
              :style="{ height: 100 + '%', width: 100 + '%' }"
            ></div>
          </div>
          <div>
            <div
              ref="annularRight"
              :style="{ height: 100 + '%', width: 100 + '%' }"
            ></div>
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
    // 获取货物管理的柱状图
    this.getGoods(),
      // 获取左边的环状图
      this.annularLeft();
    // 获取右边的环状图
    this.annularRight();
  },
  methods: {
    annularLeft() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(this.$refs.annularLeft);
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
        graphic: {
          elements: [
            {
              type: "text",
              style: {
                text: "货物占比",
                width: 200,
                height: 200,
                fill: "#97c5f6",
                fontSize: 12,
              },
              left: "center",
              top: "45%",
            },
          ],
        },
        series: [
          {
            type: "pie",
            radius: [40, 30],
            // center: ['50%', '50%'],
            roseType: "radius",
            data: [
              {
                value: 3735,
                name: "普通货物",
              },
              {
                value: 7843,
                name: "重点货物",
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
                length: 0,
                length2: 0,
                lineStyle: {
                  width: 1,
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
                    fontSize: 10,
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
    // 获取右边的环状图
    annularRight() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(this.$refs.annularRight);
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
        graphic: {
          elements: [
            {
              type: "text",
              style: {
                text: "重点货物",
                width: 200,
                height: 200,
                fill: "#97c5f6",
                fontSize: 12,
              },
              left: "center",
              top: "45%",
            },
            {
              type: "text",
              style: {
                text: "占比",
                width: 200,
                height: 200,
                fill: "#97c5f6",
                fontSize: 12,
              },
              left: "center",
              top: "55%",
            },
          ],
        },
        series: [
          {
            type: "pie",
            radius: [40, 30],
            // center: ['50%', '50%'],
            // roseType: 'radius',
            data: [
              {
                value: 3735,
                name: "其他",
              },
              {
                value: 7843,
                name: "易燃易爆",
              },
              {
                value: 3735,
                name: "冻品",
              },
              {
                value: 7000,
                name: "毒害品",
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
                length: 0,
                length2: 0,
                lineStyle: {
                  width: 1,
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
                    fontSize: 10,
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
    // 获取货物管理的柱状图
    getGoods() {
      let myChart = this.$echarts.init(this.$refs.goods);
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
          data: ["普通货物", "重点货物"],
        },
        grid: {
          top: "22%",
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
            name: "单位: 件",
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
            name: "普通货物",
            type: "bar",
            data: [100, 200, 300, 400],
            barWidth: 20,
            itemStyle: {
              normal: {
                color: "#0d7dfe",
              },
            },
          },
          {
            name: "重点货物",
            type: "bar",
            data: [50, 60, 70, 80],
            barWidth: 20,
            itemStyle: {
              normal: {
                color: "#b572fd",
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
  .box_title {
    display: flex;
    align-items: center;
    color: #50f4c1;
    margin-bottom: 0.5rem;
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
    height: 93%;
    display: flex;
    flex-direction: column;
    .bot_top {
      height: 50%;
    }
    .bot_bottom {
      height: 50%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      > div {
        width: 50%;
        height: 100%;
      }
    }
  }
}
</style>