<template>
  <div>
    <div class="box">
      <div class="box_title">
        <div class="box_title_left">
          <img src="../../assets/image/Home/right_arrow.png"
               alt="预警中心">
          <div>预警中心</div>
        </div>
        <div class="box_title_right">
          <div @click="dateChange(index)"
               :class="[index == 1 ? 'area_title_right_tow':'', index == dateCurrent ? 'activeDate':'']"
               v-for="(item, index) in date"
               :key="index">{{item.text}}</div>
        </div>
      </div>
      <div class="box_text">
        <div>
          <div>预警总数</div>
          <span class="yellow">1624</span>
        </div>
        <div>
          <div>已处理</div>
          <span class="green">1524</span>
        </div>
        <div>
          <div>未处理</div>
          <span class="red">100</span>
        </div>
      </div>
      <div class="annular_box">
        <div ref="annularLeft"
             :style="{height: 100 + '%',width: 100 + '%'}"></div>
        <div ref="annularRight"
             :style="{height: 100 + '%',width: 100 + '%'}"></div>
      </div>
    </div>
  </div>
</template>

<script>
let that = ''
export default {
  data () {
    return {
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
      // 圆环图中间文字
      annularText: 40,
    }
  },
  beforeCreate () {
    that = this;
  },
  mounted () {
    // 获取左边的环状图
    this.annularLeft()
    // 获取右边的环状图
    this.annularRight()
  },
  methods: {
    // 点击切换 日、周、月
    dateChange (index) {
      this.dateCurrent = index
    },
    // 获取左边的环状图
    annularLeft () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(this.$refs.annularLeft)
      window.onresize = myChart.resize;
      // 环状图的颜色
      var colorList = ['#7eacea', '#e15777', '#95ea71', '#ea9b4f', '#7577df', '#be72d8', '#fff'];
      // 绘制图表
      let option = {
        tooltip: {
          trigger: 'item',
          // formatter: "{b} : {d}% <br/> {c}"
        },
        series: [{
          type: 'pie',
          // radius: [40, 50],
          center: ['50%', '50%'],
          roseType: 'radius',
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
    // 获取右边的环状图
    annularRight () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(this.$refs.annularRight)
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
            top: '45%'
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
            top: '55%'
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
      margin-right: 0.3rem;
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
  .box_text {
    display: flex;
    align-items: center;
    margin: 0.6rem 0 0 1rem;
    > div {
      display: flex;
      align-items: center;
      font-size: 0.5rem;
      color: #2f91b4;
      margin-right: 1rem;
      > div {
        margin-right: 1rem;
      }
      .yellow {
        color: #f09101;
      }
      .green {
        color: #01e9be;
      }
      .red {
        color: #f40001;
      }
    }
  }
  .annular_box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 70%;
    width: 100%;
    margin-top: 0.6rem;
  }
}
</style>