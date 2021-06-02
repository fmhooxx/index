import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home/Home.vue'
import personnel from '../views/Control/personnel/personnel.vue'
import vehicle from '../views/Control/vehicle/vehicle.vue'
import ships from '../views/Control/ships/ships.vue'
import earlyWarning from '../views/Control/earlyWarning/earlyWarning.vue'
import goods from '../views/Control/goods/goods.vue'
import peopleOutDetails from '../views/Control/personnel/peopleOutDetails.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/personnel',
    name: 'personnel',
    meta: {
      title: '人员管控'
    },
    component: personnel
  },
  {
    path: '/ships',
    name: 'ships',
    component: ships,
    meta: {
      title: '船只管控'
    },
  },
  {
    path: '/vehicle',
    name: 'vehicle',
    component: vehicle,
    meta: {
      title: '车辆管控'
    },
  },
  {
    path: '/earlyWarning',
    name: 'earlyWarning',
    component: earlyWarning,
    meta: {
      title: '预警中心'
    },
  },
  {
    path: '/goods',
    name: 'goods',
    component: goods,
    meta: {
      title: '货物管控'
    },
  },
  {
    path: '/peopleOutDetails',
    name: 'peopleOutDetails',
    component: peopleOutDetails,
    meta: {
      title: '人员进出详情'
    },
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router