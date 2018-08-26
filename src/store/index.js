import Vue from 'vue'
import Vuex from 'vuex'
import action from './action'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
  longitude: '', //当前经度
  latitude: '', //当前纬度
  date:'',  //当前日期
  index:0,  //初始化首页sliderY当前索引
  city:'',   //记录当前城市
  showNews:true,  //默认显示新闻
  forceUpdate:false, //首页使用了keep-alive缓存，但有时需要强制更新
  terminalWidth:0,  //记录终端的屏宽
  terminalHeight:0,  //记录终端的屏高
  positionY: 0,   //记录keepalive组件scrollY位置
}

export default new Vuex.Store({
  state,
  mutations,
  action
})
