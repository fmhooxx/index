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

import 'leaflet/dist/leaflet.css'
// 引入Leaflet对象 挂载到Vue上，便于全局使用，也可以单独页面中单独引用
import * as L from 'leaflet'
import 'leaflet.pm'
import 'leaflet.pm/dist/leaflet.pm.css'

Vue.config.productionTip = false;
Vue.L = Vue.prototype.$L = L

/* leaflet icon */
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
})


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')