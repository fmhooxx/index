<template>
  <div class="right_top_box">
    <div class="box_title">
      <commonTopText :commonTopText="'疫情管控'"></commonTopText>
    </div>
    <div class="data_box">
      <div class="data_box_common data_box_left">
        <div class="data_box_left_ningbo">
          <img src="@/assets/image/Control/ningbo.png" alt="" />
          <div>宁波疫情</div>
        </div>
        <div class="data_box_left_info">
          <div>累计确诊: <span class="red">0</span></div>
          <div>现有确诊: <span class="yellow">157</span></div>
          <div>累计治愈: <span class="green">157</span></div>
          <div>累计死亡: <span>0</span></div>
        </div>
      </div>
      <div class="data_box_common data_box_right">
        <div class="data_box_left_ningbo">
          <img src="@/assets/image/Control/port_area.png" alt="" />
          <div>港区疫情</div>
        </div>
        <div class="data_box_left_info">
          <div>累计确诊: <span class="red">0</span></div>
          <div>现有确诊: <span class="yellow">0</span></div>
          <div>累计治愈: <span class="green">0</span></div>
          <div>累计死亡: <span>0</span></div>
        </div>
      </div>
    </div>
    <div class="content">
      <div>
        <div
          ref="content_left"
          :style="{ height: 100 + '%', width: 100 + '%' }"
        ></div>
      </div>
      <div>
        <div
          ref="content_right"
          :style="{ height: 100 + '%', width: 100 + '%' }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    // 获取左边的圆环数据
    this.getContentLeft();
    // 获取右边的圆环数据
    this.getContentRight();
  },
  methods: {
    // 获取左边的圆环数据
    getContentLeft() {
      let myChart = this.$echarts.init(this.$refs.content_left);
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
          formatter: "{b} : {d}% <br/> {c}",
        },
        legend: {
          orient: "vertical",
          // top: "center",
          textStyle: {
            color: "#039dc6",
          },
          itemWidth: 20, // 宽
          itemHeight: 5, // 高
          x: "center",
          y: "bottom",
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
                text: "重点地区",
                width: 200,
                height: 200,
                fill: "#02d3d8",
                fontSize: 12,
              },
              left: "35%",
              top: "15%",
            },
            {
              type: "text",
              style: {
                text: "来往人员",
                width: 200,
                height: 200,
                fill: "#00a1ed",
                fontSize: 12,
              },
              left: "35%",
              top: "22.5%",
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
              left: "40%",
              top: "30%",
            },
          ],
        },
        series: [
          {
            type: "pie",
            radius: [35, 60],
            center: ["50%", "25%"],
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
                show: false,
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
    // 获取右边的圆环数据
    getContentRight() {
      let myChart = this.$echarts.init(this.$refs.content_right);
      window.onresize = myChart.resize;
      var colorList = ["#fdd003", "#ff4141", "#02ad45"];
      let data = [
        {
          value: 2341,
          name: "黄码",
        },
        {
          value: 3428,
          name: "红码",
        },
        {
          value: 5102,
          name: "绿码",
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
          formatter: "{b} : {d}% <br/> {c}",
        },
        legend: {
          orient: "vertical",
          // top: "center",
          textStyle: {
            color: "#039dc6",
          },
          itemWidth: 20, // 宽
          itemHeight: 5, // 高
          x: "center",
          y: "bottom",
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
                text: "重点地区",
                width: 200,
                height: 200,
                fill: "#02d3d8",
                fontSize: 12,
              },
              left: "35%",
              top: "20%",
            },
            {
              type: "text",
              style: {
                text: "来往人员",
                width: 200,
                height: 200,
                fill: "#00a1ed",
                fontSize: 12,
              },
              left: "35%",
              top: "27.5%",
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
              left: "40%",
              top: "35%",
            },
          ],
        },
        series: [
          {
            type: "pie",
            radius: [35, 60],
            center: ["50%", "30%"],
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
                show: false,
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
.right_top_box {
  .box_title {
    color: #50f4c1;
  }
  .data_box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 3.5rem;
    margin: 0.5rem 0;
    background: url("../../../../assets/image/Control/epidemic_bgi.jpg");
    background-size: 100% 100%;
    > div {
      flex: 1;
      height: 100%;
    }
    .data_box_common {
      height: 100%;
      display: flex;
      align-items: center;
      .data_box_left_ningbo {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 45%;
        position: relative;
        > img {
          width: 100%;
          height: 56%;
        }
        > div {
          font-size: 0.6rem;
          color: #38c03a;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }
      .data_box_left_ningbo::after {
        position: absolute;
        right: 0;
        width: 0.01rem;
        height: 70%;
        content: "";
        background-color: #253685;
      }
      .data_box_left_info {
        height: 100%;
        width: 55%;
        font-size: 0.34rem;
        color: #6489b1;
        margin-left: 0.3rem;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        .red {
          color: #cf2736;
        }
        .yellow {
          color: #e19530;
        }
        .green {
          color: #2af741;
        }
      }
    }
    .data_box_right {
      .data_box_left_ningbo {
        > div {
          color: #beba33;
        }
      }
    }
  }
  .content {
    width: 100%;
    height: 64%;
    display: flex;
    align-items: center;
    > div {
      width: 50%;
      height: 100%;
    }
  }
}
</style>