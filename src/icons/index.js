// icons/index.js
// webpack 创建一个以svg 目录为上下文的require函数
import Vue from 'vue'
import SvgIcon from '../components/common/SvgIcon.vue'
// 注册svg 组件
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)