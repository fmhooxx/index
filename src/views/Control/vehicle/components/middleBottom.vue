<template>
  <div>
    <div class="box">
      <div class="box_title">
        <commonTopText :commonTopText="'车辆到港分析'"></commonTopText>
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
                <span v-text="item.mobile"></span>
                <span v-text="item.truckLicense"></span>
                <span v-text="item.appointSrTime"></span>
                <span>{{ item.isKeyPerson | isKeyPersons }}</span>
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
  </div>
</template>

<script>
import { getOrderList } from "@/api/Control/vehicle/index.js";
let that = "";
export default {
  data() {
    return {
      // 头部数据
      tabList: [
        {
          text: "注册司机名",
        },
        {
          text: "手机号",
        },
        {
          text: "车牌照",
        },
        {
          text: "预约时间",
        },
        {
          text: "重点人员",
        },
        {
          text: "码色",
        },
      ],
      // 滚动数据
      listData: [
        {
          driverName: "司机名称",
          mobile: "手机号码",
          truckLicense: "车牌号码",
          appointSrTime: "预约时间",
          isKeyPerson: 0,
          codeColor: "green",
        },
      ],
      page: {
        pageSize: 100,
        pageNum: 1,
      },
    };
  },
  filters: {
    isKeyPersons(val) {
      if (val == 1) {
        return "是";
      } else if (val == 0) {
        return "否";
      }
    },
  },
  computed: {
    optionSingleHeight() {
      return {
        singleHeight: 50,
        // waitTime: 2500,
      };
    },
  },
  beforeCreate() {
    that = this;
  },
  created() {
    // 获取车辆到港分析接口
    // this.getList();
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
      console.log(res);
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
        width: 16.67%;
        // width: 20%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .content_box {
      height: 10rem;
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
              width: 16.67%;
              // width: 20%;
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