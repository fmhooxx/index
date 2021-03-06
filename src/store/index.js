import Vue from 'vue'
import Vuex from 'vuex'
import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: getToken()
  },
  mutations: {},
  actions: {},
  modules: {}
})