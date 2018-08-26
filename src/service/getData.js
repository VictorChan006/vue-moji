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






