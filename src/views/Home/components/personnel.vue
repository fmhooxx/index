<template>
  <div class="box">
    <div>
      <div class="box_title">
        <img src="../../../assets/image/Home/right_arrow.png"
             alt="人员管控" />
        <div>人员管控</div>
      </div>
      <div ref="annular"
           :style="{ height: 87 + '%', width: 100 + '%' }"></div>
    </div>
    <div>
      <div class="area_title">
        <div class="area_title_left">
          <span></span>
          <div>港区人员进出分析</div>
        </div>
        <div class="area_title_right">
          <div @click="dateChange(index)"
               :class="[
              index == 1 ? 'area_title_right_tow' : '',
              index == dateCurrent ? 'activeDate' : '',
            ]"
               v-for="(item, index) in date"
               :key="index">
            {{ item.text }}
          </div>
        </div>
      </div>
      <div ref="area"
           :style="{ height: 80 + '%', width: 100 + '%' }">33</div>
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
    // 获取人员管控的环状图
    this.annular();
    // 获取港区人员进出分析柱状图
    this.getArea();
  },
  methods: {
    // 点击切换 日、周、月
    dateChange(index) {
      this.dateCurrent = index;
      this.getArea();
    },
    // 获取人员管控的环状图
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
        graphic: {
          elements: [
            {
              type: "text",
              style: {
                text: "一人一档",
                width: 200,
                height: 200,
                fill: "#97c5f6",
                fontSize: 16,
              },
              left: "center",
              top: "45%",
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
            data: [
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
    // 获取港区人员进出分析柱状图
    getArea() {
      let myChart = this.$echarts.init(this.$refs.area);
      window.onresize = myChart.resize;
      let option = {
        tooltip: {
          trigger: "axis",
        },
        grid: {
          left: "0%",
          right: "6%",
          bottom: "0%",
          top: "0%",
          containLabel: true,
        },
        calculable: true,
        xAxis: [
          {
            type: "value",
            boundaryGap: [0, 0.01],
            axisLabel: {
              show: false,
              showMaxLabel: true,
              interval: 0, //代表显示所有x轴标签显示
              textStyle: {
                fontSize: 14,
                color: "#D5CBE8",
              },
            },
            // X 轴的线条设置
            splitLine: {
              show: false,
              lineStyle: {
                type: "dashed",
                color: "#DDD",
              },
            },
          },
        ],
        yAxis: [
          {
            type: "category",
            name: "",
            data: ["梅山港区", "穿山港区", "临海港区", "北仑港区", "全港区"],
            axisLabel: {
              textStyle: {
                fontSize: 12,
                color: "#97c5f6",
              },
            },
          },
        ],
        series: [
          {
            name: "2018年",
            type: "bar",
            barWidth: 10, //柱图宽度
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: "right", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "#086a95",
                    fontSize: 12,
                  },
                },
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#1b4ea0",
                  },
                  {
                    offset: 1,
                    color: "#386ec8",
                  },
                ]),
                // barBorderRadius: 10,
              },
            },
            data: [100, 580, 850, 500, 3000],
          },
          {
            name: "2019年",
            type: "bar",
            barGap: "0%",
            barWidth: 10, //柱图宽度
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: "right", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "#086a95",
                    fontSize: 12,
                  },
                },
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#3acfa9",
                  },
                  {
                    offset: 1,
                    color: "#50aed2",
                  },
                ]),
                // barBorderRadius: 10,
              },
            },
            data: [200, 650, 880, 300, 3500],
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  > div {
    width: 100%;
    height: 100%;
  }
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
</style>