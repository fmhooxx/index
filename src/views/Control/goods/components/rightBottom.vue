<template>
  <div class="right_bottom_box">
    <div class="box_title">
      <commonTopText :commonTopText="'危险品堆场监测'"></commonTopText>
    </div>
    <div class="content">
      <div class="list">
        <div class="list_item" v-for="(item, index) in 4" :key="index">
          <div class="list_item_top">
            <span class="list_item_left_span"></span>
            <div>北仑港区</div>
            <span class="list_item_right_span"></span>
          </div>
          <div class="list_item_bottom">
            <div class="list_item_bottom_common">
              <div>危险物品占地比</div>
              <span class="color_one">70%</span>
            </div>
            <div class="list_item_bottom_common">
              <div>堆场温度</div>
              <span class="color_two">25℃</span>
            </div>
            <div class="list_item_bottom_common">
              <div>堆场湿度</div>
              <span class="color_three">40%rh</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.right_bottom_box {
  .box_title {
    color: #50f4c1;
  }
  .content {
    margin-top: 0.2rem;
    height: 100%;
    .list {
      height: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      > div {
        width: 49%;
        height: 46%;
        background: url("../../../../assets/image/Control/transparent_list.png");
        background-size: 100% 100%;
        background-color: #0a2874;
      }
      .list_item {
        display: flex;
        flex-direction: column;
        align-items: center;
        .list_item_top {
          width: 100%;
          height: 20%;
          display: flex;
          align-items: center;
          justify-content: center;
          > div {
            color: #00ffff;
            font-size: 0.3rem;
            margin: 0 0.3rem;
          }
          > span {
            width: 1rem;
            height: 0.1rem;
          }
          .list_item_left_span {
            background: linear-gradient(to left, #046bc0, #013c8c, #014594);
          }
          .list_item_right_span {
            background: linear-gradient(to right, #046bc0, #013c8c, #014594);
          }
        }
        .list_item_bottom {
          background: url("../../../../assets/image/Control/transparent_list_bottom.png");
          background-size: 100% 100%;
          width: 100%;
          height: 80%;
          background-color: #102260;
          font-size: 0.4rem;
          color: #4d8ab0;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          padding: 0 0.4rem;
          .list_item_bottom_common {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .color_one {
              color: #dd8e1d;
            }
            .color_two {
              color: #e7d908;
            }
            .color_three {
              color: #00d565;
            }
          }
        }
      }
    }
  }
}
</style>