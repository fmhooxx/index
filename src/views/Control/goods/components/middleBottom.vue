<template>
  <div class="middle_bottom_box">
    <div class="box_title">
      <commonTopText
        ref="commonTopText"
        :commonTopText="'货物进出分析'"
      ></commonTopText>
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
    // 获取底部左侧的环状图
    this.getPeopleLeft();
    // 获取底部右侧的环状图
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
          data: ["进货", "出货"],
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
            name: "进货",
            type: "bar",
            data: [100, 200, 300, 400],
            barWidth: 20,
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#00f7e3" }, //柱图渐变色
                  { offset: 0.5, color: "#008fa7" }, //柱图渐变色
                  { offset: 1, color: "#003e6f" }, //柱图渐变色
                ]),
              },
            },
          },
          {
            name: "出货",
            type: "bar",
            data: [150, 160, 170, 180],
            barWidth: 20,
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#ffd900" }, //柱图渐变色
                  { offset: 0.5, color: "#b08607" }, //柱图渐变色
                  { offset: 1, color: "#63431c" }, //柱图渐变色
                ]),
              },
            },
          },
        ],
      };
      myChart.setOption(option);
    },
    // 获取底部左侧的环状图
    getPeopleLeft() {
      let myChart = this.$echarts.init(this.$refs.content_bottom_box_left);
      window.onresize = myChart.resize;
      var colorList = ["#00e5ff", "#bf58ff", "#008eff"];
      let data = [
        {
          value: 150,
          name: "普通货物",
        },
        {
          value: 50,
          name: "重点货物",
        },
        {
          value: 50,
          name: "其他货物",
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
        legend: {
          orient: "vertical",
          top: "center",
          textStyle: {
            color: "#039dc6",
          },
          itemWidth: 10, // 宽
          itemHeight: 10, // 高
          icon: "circle",
          x: "40%",
          formatter(name) {
            let text = "";
            data.forEach((item) => {
              if (item.name == name) {
                text =
                  "{a|" +
                  name +
                  "}" +
                  "{b|" +
                  item.num +
                  "%" +
                  "}" +
                  "{a|" +
                  item.value +
                  "}";
              }
            });
            return text;
          },
          textStyle: {
            rich: {
              a: {
                color: "#3aa7ee",
                fontSize: 12,
              },
              b: {
                color: "#d18814",
                fontSize: 12,
                padding: 4,
              },
            },
          },
        },
        graphic: {
          elements: [
            {
              type: "text",
              style: {
                text: "货物占比",
                width: 200,
                height: 200,
                fill: "#00a1ed",
                fontSize: 12,
              },
              left: "12.5%",
              top: "47.5%",
            },
          ],
        },
        series: [
          {
            type: "pie",
            radius: [40, 60],
            center: ["20%", "50%"],
            avoidLabelOverlap: false,
            data: data,
            // 设置圆环颜色
            itemStyle: {
              normal: {
                color: function (params) {
                  return colorList[params.dataIndex];
                },
              },
            },
            label: {
              show: false,
              position: "center",
            },
            labelLine: {
              show: false,
            },
          },
        ],
      };
      myChart.setOption(option);
    },
    // 获取底部右侧的环状图
    getPeopleRight() {
      let myChart = this.$echarts.init(this.$refs.content_bottom_box_right);
      let data = [
        { value: 150, name: "国内" },
        { value: 100, name: "国外" },
      ];
      let total = 0;
      data.forEach((item) => {
        total += item.value;
      });
      data.map((item) => {
        item.num = ((item.value / total) * 100).toFixed(2);
      });
      window.onresize = myChart.resize;
      var colorList = ["#ffb486", "#839afb"];
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
        legend: {
          orient: "vertical",
          top: "center",
          x: "60%",
          textStyle: {
            color: "#039dc6",
          },
          // type: "scroll",
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
            // return name + p.toFixed(2) + "%" + num;
            return (
              "{a|" +
              name +
              "}" +
              "{b|" +
              p.toFixed(2) +
              "%" +
              "}" +
              "{a|" +
              num +
              "}"
            );
          },
          textStyle: {
            rich: {
              a: {
                color: "#3aa7ee",
                fontSize: 12,
              },
              b: {
                color: "#d18814",
                fontSize: 12,
                padding: 4,
              },
            },
          },
        },
        graphic: {
          elements: [
            {
              type: "text",
              style: {
                text: "国内外",
                width: 200,
                height: 200,
                fill: "#00a1ed",
                fontSize: 12,
              },
              left: "25%",
              top: "40%",
            },
            {
              type: "text",
              style: {
                text: "货物占比",
                width: 200,
                height: 200,
                fill: "#00a1ed",
                fontSize: 12,
              },
              left: "22.5%",
              top: "50%",
            },
          ],
        },
        series: [
          {
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
            // 设置圆环颜色
            itemStyle: {
              normal: {
                color: function (params) {
                  return colorList[params.dataIndex];
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
.middle_bottom_box {
  .box_title {
    width: 22%;
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