<template>
  <div class="right_bottom_box">
    <div class="box_title">
      <commonTopText :commonTopText="'实有人员管控'"></commonTopText>
    </div>
    <div class="content">
      <div class="histogram_box">
        <div
          ref="histogram"
          :style="{ height: 100 + '%', width: 100 + '%' }"
        ></div>
      </div>
      <div class="table_box">
        <el-table
          :data="tableData"
          style="width: 100%"
          :header-cell-style="{ background: '#00446f', color: '#fff' }"
        >
          <el-table-column align="center" prop="area" label="港区" width="80">
          </el-table-column>
          <el-table-column
            align="center"
            prop="people"
            label="实有人员"
            width="80"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="noRegister"
            label="已疑似未登记"
          >
          </el-table-column>
          <el-table-column align="center" prop="leave" label="疑似离开">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          area: "穿山港区",
          people: "3307",
          noRegister: "260",
          leave: "87",
        },
        {
          area: "梅山港区",
          people: "3307",
          noRegister: "260",
          leave: "87",
        },
        {
          area: "北仑港区",
          people: "3307",
          noRegister: "260",
          leave: "87",
        },
        {
          area: "镇海",
          people: "3307",
          noRegister: "260",
          leave: "87",
        },
      ],
    };
  },
  mounted() {
    // 获取柱状图数据
    this.getHistogram();
  },
  methods: {
    // 获取柱状图数据
    getHistogram() {
      let myChart = this.$echarts.init(this.$refs.histogram);
      window.onresize = myChart.resize;
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
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
            name: "单位: 人",
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
            name: "进港车辆",
            type: "bar",
            data: [100, 200, 300, 400],
            barWidth: 20,
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#00caff" }, //柱图渐变色
                  { offset: 0.5, color: "#0089e9" }, //柱图渐变色
                  { offset: 1, color: "#0040ce" }, //柱图渐变色
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
.right_bottom_box {
  .box_title {
    color: #50f4c1;
  }
  .content {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 0.2rem;
    > div {
      height: 50%;
      width: 100%;
    }
    .histogram_box {
      // height: 40%;
    }
    .table_box {
      // height: 58%;
      overflow-y: auto;
      /deep/.el-form-item__label {
        color: #fff;
      }
      /deep/.el-table {
        background-color: transparent;
      }
      /deep/.el-table td {
        padding: 0rem 0;
      }
      /deep/.el-table th {
        padding: 0.1rem 0;
      }
      /deep/.el-table__header {
        border: 1px solid #1c5683;
        margin-bottom: 0.1rem;
        table-layout: auto;
        background-color: #00416b;
      }
      /deep/.el-table th.is-leaf {
        border: none;
      }
      /deep/.el-table tr {
        background-color: #25456e;
        color: #fff;
      }
      /deep/.el-table tbody tr:hover > td {
        background-color: #096c7f;
      }
      /deep/.is-center {
        border: 0;
      }
      /deep/.el-table::before {
        background-color: transparent;
      }
    }
  }
}
</style>