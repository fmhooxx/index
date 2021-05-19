import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//引入echart：
import * as echarts from 'echarts'
//全局注册
Vue.prototype.$echarts = echarts

// 全局的头部组件
import commonTitle from './components/common/commonTitle.vue'
Vue.component("commonTitle", commonTitle)


import './util/rem'
import until from './util/until'
Vue.prototype.$until = until

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Element)

import './icons/index'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')