<template>
  <div class="left_Bottom_box">
    <div class="box_title" @click="jump">
      <commonTopText
        :flag="true"
        ref="commonTopText"
        :commonTopText="'重点人员管控'"
      ></commonTopText>
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
    // 跳转页面
    jump() {
      this.$refs.commonTopText.goUrl("/keyPersonnelList");
    },
    // 获取上面的圆环数据
    getContentTop() {
      let myChart = this.$echarts.init(this.$refs.content_top);
      window.onresize = myChart.resize;
      var colorList = ["#0063ce", "#bf58ff", "#00d3f4", "#00e321"];
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
          x: "60%",
          formatter(name) {
            let text = "";
            data.forEach((item) => {
              if (item.name == name) {
                text = "{a|" + name + "}" + "{b|" + item.value + "}";
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
                text: "布局统计",
                width: 200,
                height: 200,
                fill: "#00a1ed",
                fontSize: 12,
              },
              left: "22.5%",
              top: "45%",
            },
            {
              type: "text",
              style: {
                text: 2345,
                width: 200,
                height: 200,
                fill: "#fd9c00",
                fontSize: 12,
              },
              left: "25%",
              top: "55%",
            },
          ],
        },
        series: [
          {
            type: "pie",
            radius: [40, 60],
            center: ["30%", "50%"],
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
                position: "inner", //标签的位置
                formatter: function (params) {
                  var str = "{c|" + params.data.num + "%" + "}";
                  return str;
                },

                rich: {
                  c: {
                    color: "#fff",
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
    // 获取下面的圆环数据
    getContentBottom() {
      let myChart = this.$echarts.init(this.$refs.content_bottom);
      window.onresize = myChart.resize;
      var colorList = ["#0086ff", "#ff821e", "#00c48c", "#ceda00"];
      let data = [
        {
          value: 3735,
          name: "公安重点人员",
        },
        {
          value: 7843,
          name: "港区黑名单",
        },
        {
          value: 3735,
          name: "失驾人员",
        },
        {
          value: 7000,
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
          x: "55%",
          formatter(name) {
            let text = "";
            data.forEach((item) => {
              if (item.name == name) {
                text = "{a|" + name + "}" + "{b|" + item.value + "}";
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
              left: "22.5%",
              top: "45%",
            },
            {
              type: "text",
              style: {
                text: "占比",
                width: 200,
                height: 200,
                fill: "#00a1ed",
                fontSize: 12,
              },
              left: "25%",
              top: "55%",
            },
          ],
        },
        series: [
          {
            type: "pie",
            radius: [40, 60],
            center: ["30%", "50%"],
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
                position: "inner", //标签的位置
                formatter: function (params) {
                  var str = "{c|" + params.data.num + "%" + "}";
                  return str;
                },

                rich: {
                  c: {
                    color: "#fff",
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