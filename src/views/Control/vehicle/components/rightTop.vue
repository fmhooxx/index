<template>
  <div>
    <div class="box">
      <div class="box_title">
        <img src="@/assets/image/Home/right_arrow.png" alt="集卡预约管控" />
        <div>集卡预约管控</div>
      </div>
      <div class="content">
        <div>
          <div class="box_top">
            <div class="box_top_item" v-for="(item, index) in top" :key="index">
              <div class="box_top_item_ships">
                <div class="red">{{ item.atop }}</div>
              </div>
              <div class="box_top_item_bottom">
                {{ item.abottom }}
                <div class="box_top_item_bottom_right">{{ item.aright }}</div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="area_title">
            <div class="area_title_left">
              <span></span>
              <div>港区预约数量统计</div>
            </div>
          </div>
          <div class="box_list">
            <div
              class="box_list_item"
              v-for="(item, index) in list"
              :key="index"
            >
              <div class="box_list_item_ships">
                <div class="red">{{ item.departure }}</div>
              </div>
              <div class="box_list_item_bottom">{{ item.address }}</div>
            </div>
          </div>
          <div ref="vehicle" :style="{ height: 100 + '%', width: 100 + '%' }">
            111
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let that = "";
export default {
  data() {
    return {
      dateCurrent: 0,
      top: [
        {
          id: 0,
          atop: "注册司机",
          abottom: 98989,
          aright: "人",
        },
        {
          id: 0,
          atop: "注册集卡车",
          abottom: 88960,
          aright: "辆",
        },
      ],
      list: [
        {
          id: 0,
          departure: 1009,
          address: "今日预约",
        },
        {
          id: 0,
          departure: 1320,
          address: "明日预约",
        },
        {
          id: 0,
          departure: 4500,
          address: "累计预约",
        },
      ],
    };
  },
  beforeCreate() {
    that = this;
  },
  mounted() {
    // 获取车辆进出分析柱状图
    this.getVehicle();
  },
  methods: {
    dateChange(index) {
      this.dateCurrent = index;
      this.getVehicle();
    },
    // 获取车辆进出分析柱状图
    getVehicle() {
      let myChart = this.$echarts.init(this.$refs.vehicle);
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
        grid: {
          top: "22%",
          left: "0%",
          right: "0%",
          bottom: "10%",
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
            name: "预约车辆",
            type: "bar",
            data: [9000, 7000, 9000, 7000],
            barWidth: 20,
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#142949" }, //柱图渐变色
                  { offset: 0.5, color: "#0b6e94" }, //柱图渐变色
                  { offset: 1, color: "#01b2df" }, //柱图渐变色
                ]),
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
  .content {
    height: 98%;
    display: flex;
    flex-direction: column;
    > div {
      height: 70%;
      width: 100%;
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
  .box_list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .box_list_item {
      align-items: center;
      border: 0.01rem solid #2f91b4;
      font-size: 0.6rem;
      width: 30%;
      height: 2.4rem;
      border-radius: 10%;
      text-align: center;
      overflow: hidden;
      background-color: rgba(47, 145, 180, 0.2);
      .box_list_item_ships {
        padding: 0.2rem 0;
        color: #2f91b4;
        font-size: 1rem;
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
  .box_top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .box_top_item {
      align-items: center;
      border: 0.01rem solid #2f91b4;
      font-size: 0.6rem;
      width: 46%;
      height: 3rem;
      line-height: 200%;
      border-radius: 10%;
      text-align: center;
      overflow: hidden;
      background-color: rgba(47, 145, 180, 0.2);
      .box_top_item_ships {
        padding: 0.2rem 0;
        color: #ffffff;
        font-size: 0.7rem;
        .red {
          color: #ffffff;
        }
      }
      .box_top_item_bottom {
        color: #00ff00;
        width: 100%;
        padding: 0.2rem 0.4rem;
        border-radius: 0 0 10% 10%;
        text-align: center;
        line-height: 50%;
        font-size: 1rem;
        padding-left: 1.2rem;
      }
      .box_top_item_bottom_right {
        color: rgb(255, 255, 255);
        float: right;
        padding-right: 0.8rem;
        font-size: 0.7rem;
      }
    }
  }
}
</style>