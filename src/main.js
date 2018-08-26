// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
// import Home from './components/HelloFromVux'
import routes from './router'
import './config/rem'  //vux已内置rem尺寸解决方案？
import echarts from 'echarts'
// import VueAMap from 'vue-amap'
import {mapMutations} from 'vuex'
import store from './store/'
import  { LoadingPlugin } from 'vux'
import BScroll from 'better-scroll'

Vue.use(LoadingPlugin)

Vue.use(VueRouter)
// Vue.use(VueAMap)
Vue.prototype.$echarts = echarts
Vue.prototype.$BScroll = BScroll


// VueAMap.initAMapApiLoader({
//   key: '8180f19318a0e33ebf7e76b06ded699a',
//   // plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
//   // 默认高德 sdk 版本为 1.4.4
//   v: '1.4.7'
// });

// const routes = [{
//   path: '/',
//   component: Home
// }]

const router = new VueRouter({
  routes,
  strict: process.env.NODE_ENV !== 'production',
  scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop;
      }
        return { x: 0, y: to.meta.savedPosition || 0 }
    }
  }
})

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
