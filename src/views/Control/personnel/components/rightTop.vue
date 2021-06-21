<template>
  <div class="right_top_box">
    <div class="box_title">
      <commonTopText :commonTopText="'疫情管控'"></commonTopText>
    </div>
    <div class="data_box">
      <div class="data_box_common data_box_left">
        <div class="data_box_left_ningbo">
          <img src="@/assets/image/Control/ningbo.png" alt="" />
          <div>港区境内疫情</div>
        </div>
        <div class="data_box_left_info">
          <div>红码: <span class="red">0</span></div>
          <div>黄码: <span class="yellow">157</span></div>
          <div>绿码: <span class="green">157</span></div>
        </div>
      </div>
      <div class="data_box_common data_box_right">
        <div class="data_box_left_ningbo">
          <img src="@/assets/image/Control/port_area.png" alt="" />
          <div>港区境外疫情</div>
        </div>
        <div class="data_box_left_info">
          <div>红码: <span class="red">0</span></div>
          <div>黄码: <span class="yellow">0</span></div>
          <div>绿码: <span class="green">0</span></div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="content_title">
        <div
          class="content_title_list"
          v-for="(item, index) in tabList"
          :key="index"
        >
          {{ item.text }}
        </div>
      </div>
      <div class="content_box">
        <vue-seamless-scroll
          :class-option="optionSingleHeight"
          :data="listData"
          class="seamless_warp"
        >
          <ul class="list">
            <li
              class="list_item"
              v-for="(item, index) in listData"
              :key="index"
            >
              <span v-text="item.driverName"></span>
              <span v-text="item.identityCard"></span>
              <span>
                <span
                  class="code_color"
                  :style="{ backgroundColor: item.codeColor }"
                ></span>
              </span>
            </li>
          </ul>
        </vue-seamless-scroll>
      </div>
    </div>
  </div>
</template>

<script>
import { getOrderList } from "@/api/Control/vehicle/index.js";
export default {
  data() {
    return {
      // 头部数据
      tabList: [
        {
          text: "姓名",
        },
        {
          text: "身份证号",
        },
        {
          text: "码色",
        },
      ],
      // 滚动数据
      listData: [
        {
          driverName: "司机名称",
          identityCard: "身份证",
          codeColor: "green",
        },
        {
          driverName: "司机名称",
          identityCard: "身份证",
          codeColor: "green",
        },
        {
          driverName: "司机名称",
          identityCard: "身份证",
          codeColor: "green",
        },
        {
          driverName: "司机名称",
          identityCard: "身份证",
          codeColor: "green",
        },
        {
          driverName: "司机名称",
          identityCard: "身份证",
          codeColor: "green",
        },
        {
          driverName: "司机名称",
          identityCard: "身份证",
          codeColor: "green",
        },
      ],
      page: {
        pageSize: 100,
        pageNum: 1,
      },
    };
  },
  computed: {
    optionSingleHeight() {
      return {
        singleHeight: 50,
        // waitTime: 2500,
      };
    },
  },
  created() {
    // 获取车辆到港分析接口
    this.getList();
  },
  methods: {
    // 获取车辆到港分析接口
    async getList() {
      let result = {
        pageSize: this.page.pageSize,
        pageNum: this.page.pageNum,
      };
      let res = await getOrderList(result);
      this.listData = res.rows;
      // console.log(res);
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
    margin-top: 0.4rem;
    .content_title {
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      font-size: 0.24rem;
      color: #fff;
      margin-bottom: 0.2rem;
      .content_title_list {
        // width: 16.67%;
        width: 33.33%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .content_box {
      height: 9rem;
      .seamless_warp {
        height: 100%;
        overflow: hidden;
        color: #fff;
        .list {
          .list_item {
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            font-size: 0.24rem;
            height: 2.1rem;
            > span {
              // width: 16.67%;
              width: 33.33%;
              display: flex;
              align-items: center;
              justify-content: center;
              .code_color {
                width: 0.5rem;
                height: 0.5rem;
                border-radius: 50%;
              }
            }
          }
        }
      }
    }
  }
}
</style>