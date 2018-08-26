// import {
//   SHOW_FROML
// } from './mutations-types'
import {getStorage,setStorage} from '../config/mUtils'

export default{
  RECORD_RES(state,data){
    state.city = data.city;
    setStorage('res',data)   //本地存储当前城市天气结果
  },
  //记录点击res.index的索引
  RECORD_INDEX(state,index){
    state.index = index;
    setStorage('index',index)
  },
  // 是否显示新闻资讯
  SHOW_NEWS(state){
    state.showNews = !state.showNews;
  },
  IS_UPDATE(state,bol){
    state.forceUpadte = bol;
  },
  TERMINAL_WIDTH(state,width){
    state.terminalWidth = width;
  },
  TERMINAL_HEIGHT(state,height){
    state.terminalHeight = height;
  },
  RECORD_POSITION_Y(state,y){
    state.positionY = y;
  },

}
