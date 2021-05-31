<template>
  <div class="middle_bottom_box">
    <div class="box_title">
      <commonTopText :commonTopText="'人员进出统计'"></commonTopText>
    </div>
    <div class="content">
      <div>
        <div
          ref="content_top"
          :style="{ height: 100 + '%', width: 100 + '%' }"
        ></div>
      </div>
      <div class="content_bottom_box">
        <div>
          <div
            ref="content_bottom_box_left"
            :style="{ height: 100 + '%', width: 100 + '%' }"
          ></div>
        </div>
        <div>
          <div
            ref="content_bottom_box_right"
            :style="{ height: 100 + '%', width: 100 + '%' }"
          >
            111
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    // 获取人员进出统计柱状图
    this.getPeopel();
    // 获取底部右侧的环状图
    this.getPeopleLeft();
    // 获取底部左侧的柱状图
    this.getPeopleRight();
  },
  methods: {
    // 获取人员进出统计柱状图
    getPeopel() {
      let myChart = this.$echarts.init(this.$refs.content_top);
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
          data: ["进港人员", "离港人员"],
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
            name: "进港人员",
            type: "bar",
            data: [100, 200, 300, 400],
            barWidth: 20,
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#00392f" }, //柱图渐变色
                  { offset: 0.5, color: "#005d1f" }, //柱图渐变色
                  { offset: 1, color: "#006f0f" }, //柱图渐变色
                ]),
              },
            },
          },
          {
            name: "离港人员",
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
    // 获取底部右侧的环状图
    getPeopleLeft() {
      let myChart = this.$echarts.init(this.$refs.content_bottom_box_left);
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
          data: ["入境船员"],
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
            name: "入境船员",
            type: "bar",
            data: [100, 200, 300, 400],
            barWidth: 20,
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#39cbfb" }, //柱图渐变色
                  { offset: 0.5, color: "#11b477" }, //柱图渐变色
                  { offset: 1, color: "#00ab43" }, //柱图渐变色
                ]),
              },
            },
          },
        ],
      };
      myChart.setOption(option);
    },
    // 获取底部左侧的柱状图
    getPeopleRight() {
      let myChart = this.$echarts.init(this.$refs.content_bottom_box_right);
      let data = [
        { value: 1048, name: "意大利" },
        { value: 735, name: "菲律宾" },
        { value: 580, name: "日本" },
        { value: 484, name: "俄罗斯" },
        { value: 300, name: "马来西亚" },
        { value: 200, name: "韩国" },
      ];
      window.onresize = myChart.resize;
      var colorList = ["#0063ce", "#bf58ff", "#00d2f3", "##00e321"];
      // 绘制图表
      let option = {
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          top: "bottom",
          left: "right",
          type: "scroll",
          textStyle: {
            color: "#039dc6",
          },
          itemWidth: 10,
          itemHeight: 10,
          icon: "circle",
          formatter(name) {
            let num = "";
            let total = 0;
            data.forEach((item) => {
              total += item.value;
              if (item.name == name) {
                return (num = item.value);
              }
            });
            let p = (num / total) * 100;
            return name + p.toFixed(2) + "%";
          },
        },
        graphic: {
          elements: [
            {
              type: "text",
              style: {
                text: "入境国籍",
                width: 200,
                height: 200,
                fill: "#00a1ed",
                fontSize: 12,
              },
              left: "22.5%",
              top: "45%",
            },
          ],
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: [40, 60],
            center: ["30%", "50%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            labelLine: {
              show: false,
            },
            data: data,
          },
        ],
      };
      myChart.setOption(option);
    },
  },
};
</script>

<style lang="less" scoped>
.middle_bottom_box {
  .box_title {
    color: #50f4c1;
  }
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    > div {
      height: 50%;
      width: 100%;
    }
    .content_bottom_box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      > div {
        height: 100%;
        width: 50%;
      }
    }
  }
}
</style>