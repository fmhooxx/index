<template>
  <div>
    <div class="box">
      <div class="box_title">
        <img src="@/assets/image/Home/right_arrow.png" alt="船只进出分析" />
        <div>船只进出分析</div>
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
        <div class="top_box">
          <div
            ref="vehicle"
            :style="{ height: 100 + '%', width: 100 + '%' }"
          ></div>
        </div>
        <div>
          <div class="bottom_box">
            <div class="one">
              <div ref="aone" :style="{ height: 100 + '%', width: 100 + '%' }">
                111
              </div>
            </div>
            <div class="two">
              <div ref="atwo" :style="{ height: 100 + '%', width: 100 + '%' }">
                111
              </div>
            </div>
            <div class="three">
              <div
                ref="athree"
                :style="{ height: 100 + '%', width: 100 + '%' }"
              >
                111
              </div>
            </div>
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
    this.getVehicle();
    this.aone();
    this.atwo();
    this.athree();
  },
  methods: {
    dateChange(index) {
      this.dateCurrent = index;
      this.getVehicle();
    },
    // 获取船只进出分析柱状图
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
          data: ["进港船只", "离港船只"],
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
            name: "进港船只",
            type: "bar",
            data: [800, 600, 1200, 800],
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
            name: "离港船只",
            type: "bar",
            data: [600, 500, 900, 600],
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
    aone() {
      let myChart = this.$echarts.init(this.$refs.aone);
      window.onresize = myChart.resize;
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
                text: "国内外船只统计",
                width: 200,
                height: 200,
                fill: "#97c5f6",
                fontSize: 10,
              },
              left: "18%",
              top: "50%",
            },
          ],
        },
        legend: {
          x: "46%",
          y: "28%",
          textStyle: {
            color: "#039dc6",
          },
          right: 0,
          top: 30,
          orient: "vertical",
          data: ["国内", "国外"],
          formatter: function (name) {
            var data = option.series[0].data; //获取series中的data
            var total = 0;
            var tarValue;
            for (var i = 0, l = data.length; i < l; i++) {
              total += data[i].value;
              if (data[i].name == name) {
                tarValue = data[i].value;
              }
            }
            var p = (tarValue / total) * 100;
            return name + " " + " " + p.toFixed(2) + "%";
          },
        },
        series: [
          {
            type: "pie",
            radius: [25, 40],
            center: ["30%", "50%"],
            // roseType: 'radius',
            data: [
              {
                value: 80,
                name: "国内",
              },
              {
                value: 20,
                name: "国外",
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
                show: false,
                length: 10,
                length2: 10,
                lineStyle: {
                  width: 2,
                },
              },
            },
            label: {
              normal: {
                show: false,
                formatter: function (params) {
                  var str =
                    "{c|" +
                    params.data.name +
                    "}" +
                    "{b|\n" +
                    ((params.data.value / 1100) * 100).toFixed(2) +
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
    atwo() {
      let myChart = this.$echarts.init(this.$refs.atwo);
      window.onresize = myChart.resize;
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
                text: "国外船只比例",
                width: 200,
                height: 200,
                fill: "#97c5f6",
                fontSize: 10,
              },
              left: "18%",
              top: "50%",
            },
          ],
        },
        legend: {
          x: "46%",
          y: "28%",
          textStyle: {
            color: "#039dc6",
          },
          right: 0,
          top: 0,
          orient: "vertical",
          data: ["意大利", "菲律宾", "日本", "韩国", "马来西亚", "俄罗斯"],
          formatter: function (name) {
            var data = option.series[0].data; //获取series中的data
            var total = 0;
            var tarValue;
            for (var i = 0, l = data.length; i < l; i++) {
              total += data[i].value;
              if (data[i].name == name) {
                tarValue = data[i].value;
              }
            }
            var p = (tarValue / total) * 100;
            return name + " " + " " + p.toFixed(2) + "%";
          },
        },
        series: [
          {
            type: "pie",
            radius: [25, 40],
            center: ["30%", "50%"],
            // roseType: 'radius',
            data: [
              {
                value: 70,
                name: "意大利",
              },
              {
                value: 3,
                name: "菲律宾",
              },
              {
                value: 8,
                name: "日本",
              },
              {
                value: 8,
                name: "韩国",
              },
              {
                value: 3,
                name: "马来西亚",
              },
              {
                value: 8,
                name: "俄罗斯",
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
                show: false,
                length: 10,
                length2: 10,
                lineStyle: {
                  width: 2,
                },
              },
            },
            label: {
              normal: {
                show: false,
                formatter: function (params) {
                  var str =
                    "{c|" +
                    params.data.name +
                    "}" +
                    "{b|\n" +
                    ((params.data.value / 1100) * 100).toFixed(2) +
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
    athree() {
      let myChart = this.$echarts.init(this.$refs.athree);
      window.onresize = myChart.resize;
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
                text: "船只比例",
                width: 200,
                height: 200,
                fill: "#97c5f6",
                fontSize: 10,
              },
              left: "21%",
              top: "50%",
            },
          ],
        },
        legend: {
          x: "46%",
          y: "28%",
          textStyle: {
            color: "#039dc6",
          },
          right: 0,
          top: 0,
          orient: "vertical",
          data: ["浙江省", "江苏省", "福建", "山东省", "上海", "天津"],
          formatter: function (name) {
            var data = option.series[0].data; //获取series中的data
            var total = 0;
            var tarValue;
            for (var i = 0, l = data.length; i < l; i++) {
              total += data[i].value;
              if (data[i].name == name) {
                tarValue = data[i].value;
              }
            }
            var p = (tarValue / total) * 100;
            return name + " " + " " + p.toFixed(2) + "%";
          },
        },
        series: [
          {
            type: "pie",
            radius: [25, 40],
            center: ["30%", "50%"],
            // roseType: 'radius',
            data: [
              {
                value: 70,
                name: "浙江省",
              },
              {
                value: 3,
                name: "江苏省",
              },
              {
                value: 8,
                name: "福建省",
              },
              {
                value: 8,
                name: "山东省",
              },
              {
                value: 3,
                name: "上海",
              },
              {
                value: 8,
                name: "天津",
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
                show: false,
                length: 10,
                length2: 10,
                lineStyle: {
                  width: 2,
                },
              },
            },
            label: {
              normal: {
                show: false,
                formatter: function (params) {
                  var str =
                    "{c|" +
                    params.data.name +
                    "}" +
                    "{b|\n" +
                    ((params.data.value / 1100) * 100).toFixed(2) +
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
  .top_box {
    height: 50%;
    width: 100%;
  }
  .bottom_box {
    height: 50%;
    width: 100%;
  }
  .top {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .aone {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .atwo {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .athree {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .one {
    width: 32%;
    display: block;
    float: left;
  }
  .two {
    width: 32%;
    display: block;
    margin-left: 0rem;
    float: left;
  }
  .three {
    width: 32%;
    float: right;
    top: 10;
  }
}
</style>