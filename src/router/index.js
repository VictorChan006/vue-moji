
import App from '../App'
const home = () => import(/* webpackChunkName: "home" */'@/page/home/home')
const calendar = () => import(/* webpackChunkName: "calendar" */'@/page/calendar/calendar')
const condition = () => import(/* webpackChunkName: "condition" */'@/page/condition/condition')
const share = () => import(/* webpackChunkName: "share" */'@/page/share/share')
const manage = () => import(/* webpackChunkName: "manage" */'@/page/manage/manage')
const search = () => import(/* webpackChunkName: "search" */'@/page/search/search')
const setting = () => import(/* webpackChunkName: "setting" */'@/page/setting/setting')
const warning = () => import(/* webpackChunkName: "warning" */'@/page/warning/warning')
const aircondition = () => import(/* webpackChunkName: "aircondition" */'@/page/aircondition/aircondition')
// const news = () => import(/* webpackChunkName: "news" */'@/page/news/news')

export default [{
  path: '/',
  component: App,
  children:[
    {
      path: '',
      redirect: '/home'
    },{
      path:'/home',
      component: home,
      meta:{
        keepAlive:true
      }
    },{
      path:'/calendar',
      component: calendar
    },{
      path:'/condition',
      component: condition
    },{
      path:'/share',
      component: share
    },{
      path:'/manage',
      component: manage
    },{
      path:'/search',
      component: search
    },{
      path:'/setting',
      component: setting,
    },{
      path:'/warning',
      component: warning
    },{
      path:'/aircondition',
      component: aircondition
    },
    // {
    //   path:'/news',
    //   component: news,
    // }
  ]

}]
