<template>
  <div id="app" :style="{ height: windowHeight + 'px' }">
    <router-view :style="{ height: windowHeight + 'px' }" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          messageId: 1,
          content: "测试",
        },
        {
          messageId: 2,
          content: "测试",
        },
        {
          messageId: 3,
          content: "测试",
        },
        {
          messageId: 4,
          content: "测试",
        },
        {
          messageId: 5,
          content: "测试",
        },
        {
          messageId: 6,
          content: "测试",
        },
        {
          messageId: 7,
          content: "测试",
        },
        {
          messageId: 8,
          content: "测试",
        },
        {
          messageId: 9,
          content: "测试",
        },
        {
          messageId: 10,
          content: "测试",
        },
        {
          messageId: 11,
          content: "测试",
        },
        {
          messageId: 12,
          content: "测试",
        },
        {
          messageId: 13,
          content: "测试",
        },
        {
          messageId: 14,
          content: "测试",
        },
        {
          messageId: 15,
          content: "测试",
        },
        {
          messageId: 16,
          content: "测试",
        },
      ],
      windowHeight: document.documentElement.clientHeight,
      windowWidth: document.documentElement.clientWidth,
      //使用messageId作为弹窗的key，用来获取弹窗的实例，以对对应弹窗进行操作
      notifications: {},
    };
  },
  // <!--在watch中监听实时宽高-->
  watch: {
    windowHeight(val) {
      let that = this;
    },
  },
  mounted() {
    document.body.style.backgroundColor = "#020128";
    var that = this;
    window.onresize = () => {
      return (() => {
        window.fullHeight = document.documentElement.clientHeight;
        window.fullWidth = document.documentElement.clientWidth;
        that.windowHeight = window.fullHeight; // 高
        that.windowWidth = window.fullWidth; // 宽
      })();
    };
    // for (let i = 0; i < this.list.length; i++) {
    //   setTimeout(() => {
    //     this.openMessageTips(this.list[i]);
    //   }, 1000);
    // }
  },
  methods: {
    //关闭单个通知
    closeNotification(id, operateCode, message) {
      this.notifications[message.messageId].close();
      delete this.notifications[message.messageId];
    },
    //关闭所有通知
    closeAllNotification() {
      for (let key in this.notifications) {
        this.notifications[key].close();
        delete this.notifications[key];
      }
    },
    //打开一个新的通知
    openMessageTips(message) {
      let _this = this;
      this.closeAllNotification();
      let notify = this.$notify({
        title: "三高协诊消息",
        position: "bottom-right",
        showClose: false,
        dangerouslyUseHTMLString: true,
        message: this.$createElement("div", null, [
          this.$createElement("div", null, [
            this.$createElement("span", null, message.content),
          ]),
          this.$createElement("div", null, [
            this.$createElement(
              "button",
              {
                style: {
                  padding: "10px 18px",
                  margin: "10px 12px 0px 2px",
                  textAlign: "center",
                  textDecoration: "none",
                  display: "inline-block",
                  webkitTransitionDuration: "0.4s",
                  transitionDuration: "0.4s",
                  cursor: "pointer",
                  backgroundColor: "white",
                  color: "black",
                  border: "2px solid #e7e7e7",
                },
                on: {
                  mouseout: function (e) {
                    e.target.style.backgroundColor = "white";
                  },
                  mouseover: function (e) {
                    e.target.style.backgroundColor = "#e7e7e7";
                  },
                  click: _this.closeNotification.bind(_this, 1, 1, message),
                },
              },
              "查看"
            ),
            this.$createElement(
              "button",
              {
                style: {
                  padding: "10px 18px",
                  margin: "10px 2px 0px 12px",
                  textAlign: "center",
                  textDecoration: "none",
                  display: "inline-block",
                  webkitTransitionDuration: "0.4s",
                  transitionDuration: "0.4s",
                  cursor: "pointer",
                  backgroundColor: "white",
                  color: "black",
                  border: "2px solid #e7e7e7",
                },
                on: {
                  //鼠标移出的回调
                  mouseout: function (e) {
                    e.target.style.backgroundColor = "white";
                  },
                  //鼠标移入的回调
                  mouseover: function (e) {
                    e.target.style.backgroundColor = "#e7e7e7";
                  },
                  click: _this.closeNotification.bind(_this, 1, 2, message),
                },
              },
              "稍后提醒（五分钟后）"
            ),
          ]),
        ]),
        duration: 0,
      });
      //将messageId和通知实例放入字典中
      this.notifications[message.messageId] = notify;
    },
    open(item) {
      this.$notify({
        title: "HTML 片段",
        dangerouslyUseHTMLString: true,
        message: item.content,
        duration: 0,
      });
    },
  },
};
</script>

<style lang="less">
#app {
  height: 100%;
}
/deep/.el-notification {
  margin: 0.5rem 0 !important;
}
@import url("./assets/css/style.css");
</style>
