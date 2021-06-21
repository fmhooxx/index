<template>
  <div class="right_bottom_box">
    <div class="box_title">
      <commonTopText :commonTopText="'预警中心'"></commonTopText>
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
              <span v-text="item.area"></span>
              <span v-text="item.bayonet"></span>
              <span v-text="item.car"></span>
              <span v-text="item.timer"></span>
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
export default {
  data() {
    return {
      // 头部数据
      tabList: [
        {
          text: "港区",
        },
        {
          text: "卡口",
        },
        {
          text: "车辆",
        },
        {
          text: "预警时间",
        },
        {
          text: "码色",
        },
      ],
      // 滚动数据
      listData: [
        {
          area: "北仑港区",
          bayonet: "卡口",
          car: "车辆",
          timer: "预警时间",
          codeColor: "green",
        },
        {
          area: "梅山港区",
          bayonet: "卡口",
          car: "车辆",
          timer: "预警时间",
          codeColor: "green",
        },
        {
          area: "镇海港区",
          bayonet: "卡口",
          car: "车辆",
          timer: "预警时间",
          codeColor: "green",
        },
        {
          area: "穿山港区",
          bayonet: "卡口",
          car: "车辆",
          timer: "预警时间",
          codeColor: "green",
        },
        {
          area: "穿山港区",
          bayonet: "卡口",
          car: "车辆",
          timer: "预警时间",
          codeColor: "green",
        },
        {
          area: "镇海港区",
          bayonet: "卡口",
          car: "车辆",
          timer: "预警时间",
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
      // console.log(res);
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
        // width: 33.33%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .content_box {
      height: 7rem;
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
              // width: 33.33%;
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