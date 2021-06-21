<template>
  <div class="left_top_box">
    <div class="box_title">
      <commonTopText :commonTopText="'货物吞吐量'"></commonTopText>
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
        <div>货物比例</div>
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
      let myChart = this.$echarts.init(this.$refs.goods);
      window.onresize = myChart.resize;
      var colorList = [
        "#00e506",
        "#00ff00",
        "#ffeb00",
        "#ffa200",
        "#ff7000",
        "#005bff",
        "#00aaff",
        "#00feea",
      ];
      let data = [
        {
          value: 300,
          name: "意大利",
        },
        {
          value: 30,
          name: "菲律宾",
        },
        {
          value: 50,
          name: "日本",
        },
        {
          value: 80,
          name: "韩国",
        },
        {
          value: 70,
          name: "马来西亚",
        },
        {
          value: 150,
          name: "俄罗斯",
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
          type: "scroll",
          itemWidth: 5, // 宽
          itemHeight: 5, // 高
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
                text: "进口货物",
                width: 200,
                height: 200,
                fill: "#00a1ed",
                fontSize: 12,
              },
              left: "13.5%",
              top: "42.5%",
            },
            {
              type: "text",
              style: {
                text: "来源地占比",
                width: 200,
                height: 200,
                fill: "#00a1ed",
                fontSize: 12,
              },
              left: "12.5%",
              top: "52.5%",
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
        color: #eca814;
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