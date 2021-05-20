<template>
  <div>
    <div class="box">
      <div class="box_title">
        <div class="box_title_left">
          <img src="../../assets/image/Home/right_arrow.png"
               alt="船只管控">
          <div>船只管控</div>
        </div>
        <div class="box_title_right">
          <div @click="dateChange(index)"
               :class="[index == 1 ? 'area_title_right_tow':'', index == dateCurrent ? 'activeDate':'']"
               v-for="(item, index) in date"
               :key="index">{{item.text}}</div>
        </div>
      </div>
      <div class="annular_box">
        <div ref="annular"
             :style="{height: 100 + '%',width: 100 + '%'}"></div>
      </div>
      <div class="box_list">
        <div class="box_list_item"
             v-for="(item, index) in list"
             :key="index">
          <div class="box_list_item_ships">
            <div>抵港船只</div>
            <div class="yellow">{{item.arrival}}</div>
          </div>
          <div class="box_list_item_ships">
            <div>离港船只</div>
            <div class="red">{{item.departure}}</div>
          </div>
          <div class="box_list_item_bottom">{{item.address}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let that = ''
export default {
  data () {
    return {
      // 圆环图中间文字
      annularText: 40,
      // 日、周、月
      date: [
        {
          id: 0,
          text: '日'
        },
        {
          id: 1,
          text: '周'
        },
        {
          id: 2,
          text: '月'
        }
      ],
      // 日、周、月 当前选中项
      dateCurrent: 0,
      // 船只数据列表
      list: [
        {
          id: 0,
          arrival: 576,
          departure: 542,
          address: '北仑港口'
        },
        {
          id: 0,
          arrival: 501,
          departure: 507,
          address: '镇海港口'
        },
        {
          id: 0,
          arrival: 576,
          departure: 542,
          address: '梅山港口'
        },
        {
          id: 0,
          arrival: 576,
          departure: 542,
          address: '穿山港口'
        }
      ]
    }
  },
  beforeCreate () {
    that = this;
  },
  mounted () {
    // 获取人员管控的环状图
    this.annular()
  },
  methods: {
    // 点击切换 日、周、月
    dateChange (index) {
      this.dateCurrent = index
    },
    // 获取人员管控的环状图
    annular () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(this.$refs.annular)
      window.onresize = myChart.resize;
      // 环状图的颜色
      var colorList = ['#7eacea', '#e15777', '#95ea71', '#ea9b4f', '#7577df', '#be72d8', '#fff'];
      // 绘制图表
      let option = {
        tooltip: {
          trigger: 'item',
          // formatter: "{b} : {d}% <br/> {c}"
        },
        graphic: {
          elements: [{
            type: 'text',
            style: {
              text: '一船一档',
              width: 200,
              height: 200,
              fill: '#97c5f6',
              fontSize: 16,
            },
            left: 'center',
            top: '40%'
          },
          {
            type: 'text',
            style: {
              text: that.annularText,
              width: 200,
              height: 200,
              fill: '#50f4c1',
              fontSize: 16,
            },
            left: 'center',
            top: '60%'
          }]
        },
        series: [{
          type: 'pie',
          radius: [40, 50],
          center: ['50%', '50%'],
          // roseType: 'radius',
          data: [
            {
              value: 3735,
              name: '北仑港口'
            },
            {
              value: 7843,
              name: '镇海港口'
            },
            {
              value: 3735,
              name: '穿山港区'
            },
            {
              value: 7000,
              name: '梅山港区'
            },
          ],
          // 设置圆环颜色
          itemStyle: {
            normal: {
              color: function (params) {
                return colorList[params.dataIndex]
              }
            }
          },
          labelLine: {
            normal: {
              show: true,
              length: 10,
              length2: 10,
              lineStyle: {
                width: 2
              }
            }
          },
          label: {
            normal: {
              formatter: function (params) {
                var str = '{c|' + params.data.name + '}' + '{c|\n' + '百分比:' + (params.data.value / 175043 * 100).toFixed(2) + '%}' + '{c|\n' + '人数:' + params.data.value + '}';
                return str;
              },
              rich: {
                c: {
                  color: '#97c5f6',
                  fontSize: 12,
                  align: 'left',
                  padding: 4
                }
              }
            }
          }
        }]
      };
      myChart.setOption(option);
    },
  },
}
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
        font-size: 0.8rem;
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
  .annular_box {
    height: 50%;
  }
  .box_list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .box_list_item {
      display: flex;
      flex-direction: column;
      align-items: center;
      border: 0.01rem solid #2f91b4;
      font-size: 0.12rem;
      width: 23%;
      border-radius: 10%;
      text-align: center;
      overflow: hidden;
      background-color: rgba(47, 145, 180, 0.2);
      .box_list_item_ships {
        padding: 0.2rem 0;
        color: #2f91b4;
        .yellow {
          color: #d09131;
        }
        .red {
          color: #fb2831;
        }
      }
      .box_list_item_bottom {
        color: #dde9ed;
        background-color: #147ba6;
        width: 100%;
        padding: 0.2rem 0.4rem;
        border-radius: 0 0 10% 10%;
      }
    }
  }
}
</style>