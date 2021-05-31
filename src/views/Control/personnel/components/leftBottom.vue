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
    return {
      total: 0,
    };
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
      let myChart = this.$echarts.init(this.$refs.content_top);
      window.onresize = myChart.resize;
      var colorList = ["#0063ce", "#bf58ff", "#00d2f3", "##00e321"];
      // 绘制图表
      let option = {
        tooltip: {
          trigger: "item",
          formatter: "{b} : {d}% <br/> {c}",
        },
        legend: {
          orient: "vertical",
          top: "bottom",
          left: "right",
          textStyle: {
            color: "#039dc6",
          },
          // formatter(name) {
          //   let text = "";
          //   data.forEach((item) => {
          //     if (item.name == name) {
          //       return (text = item.name + item.value);
          //     }
          //   });
          //   return text;
          // },
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
              left: "35%",
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
              left: "35%",
              top: "55%",
            },
          ],
        },
        series: [
          {
            type: "pie",
            radius: [40, 60],
            center: ["40%", "50%"],
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
              normal: {
                position: "inner", //标签的位置
                formatter: "{c}%",
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
    // 获取下面的圆环数据
    getContentBottom() {
      let myChart = this.$echarts.init(this.$refs.content_bottom);
      window.onresize = myChart.resize;
      var colorList = ["#0086ff", "#ff821e", "#00c48c", "#ceda00"];
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
      data.forEach((item) => {
        that.total += item.value;
      });
      // 绘制图表
      let option = {
        tooltip: {
          trigger: "item",
          formatter: "{b} : {d}% <br/> {c}",
        },
        legend: {
          orient: "vertical",
          top: "bottom",
          left: "right",
          textStyle: {
            color: "#039dc6",
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
              left: "35%",
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
              left: "35%",
              top: "55%",
            },
          ],
        },
        series: [
          {
            type: "pie",
            radius: [40, 60],
            center: ["40%", "50%"],
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
                  var str =
                    "{c|" +
                    ((params.data.value / that.total) * 100).toFixed(2) +
                    "}";
                  return str;
                },
                formatter: "{c}%",
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