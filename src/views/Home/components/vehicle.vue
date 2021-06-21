<template>
  <div>
    <div class="box">
      <div class="box_title" @click="jump">
        <commonTopText
          ref="commonTopText"
          :flag="true"
          :commonTopText="'车辆管控'"
        ></commonTopText>
      </div>
      <div class="content">
        <div>
          <div
            ref="annular"
            :style="{ height: 100 + '%', width: 100 + '%' }"
          ></div>
        </div>
        <div>
          <div class="area_title">
            <div class="area_title_left">
              <span></span>
              <div>车辆进出分析</div>
            </div>
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
          <div
            ref="vehicle"
            :style="{ height: 100 + '%', width: 100 + '%' }"
          ></div>
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
      // 日、周、月
      date: [
        {
          id: 0,
          text: "日",
        },
        {
          id: 1,
          text: "周",
        },
        {
          id: 2,
          text: "月",
        },
      ],
      // 日、周、月 当前选中项
      dateCurrent: 0,
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
    // 跳转页面
    jump() {
      this.$refs.commonTopText.goUrl("/vehicle");
    },
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
          top: "22%",
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
    // 获取车辆管理的环状图
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
      let data = [
        {
          value: 3735,
          name: "北仑港口",
        },
        {
          value: 7843,
          name: "镇海港口",
        },
        {
          value: 3735,
          name: "穿山港区",
        },
        {
          value: 7000,
          name: "梅山港区",
        },
      ];
      let total = 0;
      data.forEach((item) => {
        total += item.value;
      });
      data.map((item) => {
        item.num = ((item.value / total) * 100).toFixed(2);
      });
      // 绘制图表
      let option = {
        tooltip: {
          trigger: "item",
          formatter: function (params) {
            if (params.componentType == "series") {
              var str =
                params.data.name +
                `<span style="color:#ffac29">${params.data.num}%</span>` +
                params.data.value;
              return str;
            } else {
              return "";
            }
          },
        },
        graphic: {
          elements: [
            {
              type: "text",
              style: {
                text: "一车一档",
                width: 200,
                height: 200,
                fill: "#97c5f6",
                fontSize: 16,
              },
              left: "center",
              top: "40%",
            },
            {
              type: "text",
              style: {
                text: that.annularText,
                width: 200,
                height: 200,
                fill: "#50f4c1",
                fontSize: 16,
              },
              left: "center",
              top: "55%",
            },
          ],
        },
        series: [
          {
            type: "pie",
            radius: [40, 60],
            center: ["50%", "50%"],
            roseType: "radius",
            data: data,
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
                    params.data.num +
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