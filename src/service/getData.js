import fetch from '../config/fetch'
import {getStore} from '../config/mUtils'
// import axios from 'axios'

//跨域获取天气状况
export const getWeather = (city,time) => fetch('/weather/query',{
  city:city,
  timeStamp:time
});
//跨域获取新闻列表
export const getNews = () => fetch('/toutiao/index',{
  type:"shehui"
})
//新闻链接内容
// export const loadNews = url => fetch("http://mini.eastday.com/mobile/180813111656382.html")





