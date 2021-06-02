<template>
  <div>
    <div class="box">
      <div class="box_title">
        <div class="box_title_left">
          <img src="@/assets/image/Home/right_arrow.png" alt="一船一档" />
          <div>一船一档</div>
        </div>
      </div>
      <div class="box_top">
        <div class="box_top_item" v-for="(item, index) in top" :key="index">
          <div class="box_top_item_left">
            {{ item.aleft }}
            <div class="lv">{{ item.aright }}</div>
          </div>
        </div>
      </div>
      <div class="box_list">
        <div class="box_list_item" v-for="(item, index) in list" :key="index">
          <div class="box_list_item_ships">
            <div class="red">{{ item.departure }}</div>
          </div>
          <div class="box_list_item_bottom">{{ item.address }}</div>
        </div>
      </div>
      <div class="area_title">
        <div class="area_title_left">
          <span></span>
          <div>船舶类型比例</div>
        </div>
      </div>
      <div class="annular_box">
        <div
          ref="annular"
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
      // 船只数据列表
      top: [
        {
          id: 0,
          aleft: "总数量：",
          aright: 45608,
        },
      ],
      list: [
        {
          id: 0,
          departure: 1009,
          address: "穿山港区",
        },
        {
          id: 0,
          departure: 1200,
          address: "梅山港区",
        },
        {
          id: 0,
          departure: 1010,
          address: "北仑港区",
        },
        {
          id: 0,
          departure: 1036,
          address: "镇海港区",
        },
      ],
    };
  },
  beforeCreate() {
    that = this;
  },
  mounted() {
    // 获取车辆管控的环状图
    this.annular();
  },
  methods: {
    // 点击切换 日、周、月
    dateChange(index) {
      this.dateCurrent = index;
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
                text: "类型比例",
                width: 200,
                height: 200,
                fill: "#97c5f6",
                fontSize: 16,
              },
              left: "center",
              top: "50%",
            },
          ],
        },
        series: [
          {
            type: "pie",
            radius: [40, 60],
            center: ["50%", "50%"],
            // roseType: 'radius',
            data: [
              {
                value: 100,
                name: "集装箱船",
              },
              {
                value: 100,
                name: "油船",
              },
              {
                value: 100,
                name: "散货船",
              },
              {
                value: 100,
                name: "其他",
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
                    ((params.data.value / 400) * 100).toFixed(2) +
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .box_title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .box_title_left {
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
    .box_title_right {
      font-size: 0.14rem;
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
    .area_title_right_tow {
      border-left: 0.01rem solid #0f3a64;
      border-right: 0.01rem solid #0f3a64;
    }
    .activeDate {
      background-color: #0f3a64;
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
  }
  .annular_box {
    height: 50%;
  }
  .box_top {
    display: flex;
    align-items: center;
    width: 100%;
  }
  .box_top_item {
    align-items: center;
    font-size: 0.4rem;
    width: 100%;
    text-align: right;
    line-height: 50%;
    font-size: 0.5rem;
    float: right;
  }
  .box_top_item_left {
    color: #039dc6;
    .lv {
      color: #03f53f;
      float: right;
      font-size: 0.8rem;
    }
  }
  .box_list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .box_list_item {
      align-items: center;
      border: 0.01rem solid #2f91b4;
      font-size: 0.6rem;
      width: 23%;
      height: 2.5rem;
      border-radius: 10%;
      text-align: center;
      overflow: hidden;
      background-color: rgba(47, 145, 180, 0.2);
      .box_list_item_ships {
        padding: 0.2rem 0;
        color: #2f91b4;
        .red {
          color: #50f4c1;
        }
      }
      .box_list_item_bottom {
        color: #50f4c1;
        width: 100%;
        padding: 0.2rem 0.4rem;
        border-radius: 0 0 10% 10%;
      }
    }
  }
}
</style>