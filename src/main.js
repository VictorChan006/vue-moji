// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import routes from './router'
import './config/rem'
import echarts from 'echarts'
import {mapMutations} from 'vuex'
import store from './store/'
import  { LoadingPlugin } from 'vux'
import BScroll from 'better-scroll'

Vue.use(LoadingPlugin)

Vue.use(VueRouter)

Vue.prototype.$echarts = echarts
Vue.prototype.$BScroll = BScroll

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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
