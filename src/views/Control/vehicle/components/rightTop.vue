<template>
  <div>
    <div class="box">
      <div class="box_title">
        <commonTopText :commonTopText="'集卡预约管控'"></commonTopText>
      </div>
      <div class="content">
        <div>
          <div class="box_top">
            <div class="box_top_item" @click="goUrl('注册司机')">
              <img src="@/assets/image/Control/vehicle_driver.png" alt="" />
              <div class="box_top_item_content">
                <div class="box_top_item_text">注册司机</div>
                <div class="box_top_item_num driver">
                  {{ countsObj.driverCount }}<span>人</span>
                </div>
              </div>
            </div>
            <div class="box_top_item">
              <img src="@/assets/image/Control/vehicle_car.png" alt="" />
              <div class="box_top_item_content">
                <div class="box_top_item_text">注册集卡车</div>
                <div class="box_top_item_num car">
                  {{ countsObj.carCount }}<span>辆</span>
                </div>
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
              :class="current == 0 ? 'active' : ''"
              @click="currentChange(0)"
            >
              <div>{{ orderObj.today_reservation }}</div>
              <span>今日预约</span>
            </div>
            <div
              class="box_list_item"
              :class="current == 1 ? 'active' : ''"
              @click="currentChange(1)"
            >
              <div>{{ orderObj.tomorrow_reservation }}</div>
              <span>明日预约</span>
            </div>
            <div
              class="box_list_item"
              :class="current == 2 ? 'active' : ''"
              @click="currentChange(2)"
            >
              <div>{{ orderObj.today_arrival }}</div>
              <span>今日已抵达</span>
            </div>
            <!-- <div
              class="box_list_item"
              v-for="(item, index) in list"
              :class="current == index ? 'active' : ''"
              @click="currentChange(index)"
              :key="index"
            >
              <div>{{ item.num }}</div>
              <span>{{ item.order }}</span>
            </div> -->
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
import { getCount, getOrderCount } from "@/api/Control/vehicle/index.js";
let that = "";
export default {
  data() {
    return {
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
      // 港区预约统计数据
      orderObj: {},
      // 注册人与车统计数据
      countsObj: {},
      // 当前选中项
      current: 0,
    };
  },
  beforeCreate() {
    that = this;
  },
  created() {
    // 注册人与车统计接口
    this.getCounts();
    // 获取预约统计数据
    this.getOrderCounts();
  },
  mounted() {
    // 获取车辆进出分析柱状图
    this.getVehicle();
  },
  methods: {
    // current 切换的时候
    currentChange(index) {
      this.current = index;
    },
    // 跳转页面
    goUrl(e) {
      if (e == "注册司机") {
        this.$router.push("/driverList");
      }
    },
    async getOrderCounts() {
      let res = await getOrderCount();
      this.orderObj = res.data;
    },
    // 注册人与车统计接口
    async getCounts() {
      let res = await getCount();
      this.countsObj = res.data;
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
          top: "20%",
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
            name: "单位: 辆",
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
    color: #50f4c1;
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
      cursor: pointer;
      height: 2rem;
      width: 31%;
      background-color: #0d205a;
      border: 0.01rem solid #0e2773;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      > div {
        font-size: 0.8rem;
        color: #00c9d6;
        margin-bottom: 0.2rem;
      }
      > span {
        font-size: 0.2rem;
        color: #528fb5;
      }
    }
    .active {
      // background-color: #00a0cc;
      background: linear-gradient(to bottom, #0079a2 0%, #00cffc 100%);
      > div {
        font-weight: 600;
        color: #fff;
      }
      > span {
        font-weight: 500;
        color: #fff;
      }
    }
  }
  .box_top {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .box_top_item {
      cursor: pointer;
      display: flex;
      align-items: center;
      width: 45%;
      height: 70%;
      background: url("../../../../assets/image/Control/epidemic_bgi.jpg");
      background-size: 100% 100%;
      > img {
        width: 1rem;
        margin: 0 0.5rem;
      }
      .box_top_item_content {
        display: flex;
        flex-direction: column;
        .box_top_item_text {
          margin-bottom: 0.3rem;
          font-size: 0.4rem;
          color: #fff;
        }
        .box_top_item_num {
          font-size: 0.8rem;
          font-weight: bold;
          > span {
            color: #427ba2;
            font-weight: 400;
            font-size: 0.3rem;
            margin-left: 0.3rem;
          }
        }
        .driver {
          color: #009a0b;
        }
        .car {
          color: #f8a400;
        }
      }
    }
  }
}
</style>