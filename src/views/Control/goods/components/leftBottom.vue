<template>
  <div class="left_Bottom_box">
    <div class="box_title">
      <commonTopText :commonTopText="'重点人员管控'"></commonTopText>
    </div>
    <div class="content">
      <div>
        <div
          ref="content_top"
          :style="{ height: 100 + '%', width: 100 + '%' }"
        ></div>
      </div>
      <div>
        <div
          ref="content_bottom"
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
    return {};
  },
  beforeCreate() {
    that = this;
  },
  mounted() {
    // 获取上面的圆环数据
    this.getContentTop();
    // 获取下面的圆环数据
    this.getContentBottom();
  },
  methods: {
    // 获取上面的圆环数据
    getContentTop() {
      let myChart = this.$echarts.init(this.$refs.content_top);
      window.onresize = myChart.resize;
      var colorList = ["#00e5ff", "#00e492", "#8fffce", "#00fe02"];
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
        legend: {
          orient: "vertical",
          top: "center",
          textStyle: {
            color: "#039dc6",
          },
          itemWidth: 20, // 宽
          itemHeight: 5, // 高
          x: "45%",
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
                text: "布控统计",
                width: 200,
                height: 200,
                fill: "#00a1ed",
                fontSize: 12,
              },
              left: "12.5%",
              top: "45%",
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
    // 获取下面的圆环数据
    getContentBottom() {
      let myChart = this.$echarts.init(this.$refs.content_bottom);
      window.onresize = myChart.resize;
      var colorList = ["#ff0000", "#0076ff", "#ff8800", "#00c48c"];
      let data = [
        {
          value: 150,
          name: "易燃易爆",
        },
        {
          value: 150,
          name: "毒害品",
        },
        {
          value: 200,
          name: "放射性物品",
        },
        {
          value: 600,
          name: "其他",
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
          itemWidth: 20, // 宽
          itemHeight: 5, // 高
          x: "45%",
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
                text: "布控类型",
                width: 200,
                height: 200,
                fill: "#00a1ed",
                fontSize: 12,
              },
              left: "12.5%",
              top: "45%",
            },
          ],
        },
        series: [
          {
            type: "pie",
            radius: [40, 60],
            center: ["20%", "50%"],
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
  },
};
</script>

<style lang="less" scoped>
.left_Bottom_box {
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
  }
}
</style>