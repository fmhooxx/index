<template>
  <div class="left_top_box">
    <div class="box_title">
      <commonTopText :commonTopText="'一车一档'"></commonTopText>
    </div>
    <div class="box_list_box">
      <div class="box_list_box_total">总数量: <span>45608</span></div>
      <div class="box_list">
        <div
          class="list_item"
          :class="current == index ? 'active' : ''"
          v-for="(item, index) in list"
          :key="index"
          @click="currentChange(index)"
        >
          <span>{{ item.num }}</span>
          <div>{{ item.text }}</div>
        </div>
      </div>
    </div>
    <div class="goods_box">
      <div class="goods_box_title">
        <span></span>
        <div>港区车辆比例</div>
      </div>
      <div class="goods_box_annular">
        <div ref="goods" :style="{ height: 80 + '%', width: 100 + '%' }">
          33
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          text: "镇海港区",
          num: 1009,
        },
        {
          text: "梅山港区",
          num: 1200,
        },
        {
          text: "北仑港区",
          num: 1010,
        },
        {
          text: "穿山港区",
          num: 1036,
        },
      ],
      // 当前选中项
      current: 0,
    };
  },
  mounted() {
    // 获取人员管控的环状图
    this.annular();
  },
  methods: {
    // 点击 list 切换显示
    currentChange(index) {
      this.current = index;
    },
    // 获取人员管控的环状图
    annular() {
      let data = [
        {
          value: 2178,
          name: "集卡车辆",
        },
        {
          value: 2178,
          name: "港区车辆",
        },
        {
          value: 2178,
          name: "临时车辆",
        },
        {
          value: 2178,
          name: "其他车辆",
        },
      ];
      let total = 0;
      data.forEach((item) => {
        total += item.value;
      });
      data.map((item) => {
        item.num = ((item.value / total) * 100).toFixed(2);
      });
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(this.$refs.goods);
      window.onresize = myChart.resize;
      // 环状图的颜色
      var colorList = ["#00d1b0", "#00baff", "#ffef00", "#6b4bff"];
      // 绘制图表
      let option = {
        tooltip: {
          trigger: "item",
          formatter: "{b} : {d}% <br/> {c}",
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
                text: "车辆比列",
                width: 200,
                height: 200,
                fill: "#3da7e9",
                fontSize: 12,
              },
              left: "center",
              top: "47.5%",
            },
          ],
        },
        series: [
          {
            type: "pie",
            radius: [40, 60],
            center: ["50%", "50%"],
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
                    "{c|\n" +
                    ((params.data.value / total) * 100).toFixed(2) +
                    "%}" +
                    "{b|\n" +
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
.left_top_box {
  .box_title {
    color: #50f4c1;
  }
  .box_list_box {
    .box_list_box_total {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      font-size: 0.4rem;
      color: #3da7e9;
      margin-bottom: 0.5rem;
      > span {
        font-size: 0.8rem;
        font-weight: bold;
        color: #00bb00;
        margin-left: 0.4rem;
      }
    }
    .box_list {
      display: flex;
      justify-content: space-between;
      .list_item {
        width: 24%;
        height: 3.5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: url("../../../../assets/image/Control/list.jpg");
        background-size: 100% 100%;
        cursor: pointer;
        > span {
          font-size: 0.8rem;
          font-weight: bold;
          color: #00fafd;
        }
        > div {
          font-size: 0.3rem;
          margin-top: 0.6rem;
          color: #69abd1;
        }
      }
      .active {
        background: url("../../../../assets/image/Control/list_current.jpg");
        background-size: 100% 100%;
        > span {
          color: #fff;
        }
        > div {
          color: #fff;
        }
      }
    }
  }
  .goods_box {
    margin-top: 0.4rem;
    .goods_box_title {
      height: 100%;
      display: flex;
      align-items: center;
      font-size: 0.3rem;
      color: #00ffff;
      > span {
        height: 0.4rem;
        width: 0.1rem;
        background-color: #00ffff;
        margin-right: 0.4rem;
      }
      > div {
      }
    }
    .goods_box_annular {
      margin-top: 0.3rem;
      height: 8.6rem;
      width: 100%;
    }
  }
}
</style>