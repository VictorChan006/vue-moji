<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
//引入1px
@import '~vux/src/styles/1px.less';
//vux主题重写
@import './style/theme.less';
//自定义的css reset
@import './style/myReset.less';

//阿里在线iconfont symbol引入法的通用css
.icon {
  width: 1.2em; height: 1.2em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
#app{
  height:100%;
}
.muted{
  color:#666666;
  font-size:1.2rem;
}
.clearfix::after,{
  content: ".";
  clear: both;
  display: block;
  height: 0;
  visibility:hidden;
}
// 阻止选中文字
*{
  -moz-user-select: -moz-none;
  -moz-user-select: none;
  -o-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

//按钮点击效果~~波浪样式

.btn{
   position: absolute;
   width: 10px;
   height: 10px;
   transition: all 0.6s ease-in;
   background-color: white;
   opacity: .2;
   border-radius: 35px;
}
</style>
