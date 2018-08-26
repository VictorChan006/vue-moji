# vue-moji

> 基于vue全家桶的天气应用。

## 说明

接触vue一年多了，随着学习的深入，越发地喜爱这款渐进式的MVVM框架，于是决定从头到尾撸一个vue项目，以此来巩固自己所学。喜欢vue而在学习vue全家桶的童鞋，如果正苦于不知从何处实践，可以将此项目作为小小的参考。

本项目使用vue自家的UI框架vux直接生成模板，与用vue-cli生成的项目模板大同小异，不同的是vux模板自动加入了vux的配置。有能力的童鞋也可以参照文档自己折腾一下[vux](https://doc.vux.li/zh-CN/install/npm.html) 。

### 1. 关于数据请求的说明

>在异步请求方面采用了W3C标准最新的fetch API，为解决其兼容性，参考借用了[vue-elem](https://github.com/bailicangdu/vue2-elm) 项目的fetch封装。fetch原理与vue的Axios插件差不多，不过还是建议大家学一下原生的[fetch API](https://www.w3cschool.cn/fetch_api/)，毕竟原生的，才是最强大的！
>另外，数据API请求方面引用阿里云市场提供的免费天气API与新闻API，而有些简单的数据直接用[Mock.js](http://mockjs.com/)来在线模拟。对于不是很复杂的项目，基本已经能满足需求了，毕竟抓包还是挺费时间的（对于我来说）！！通过指定的数据API跨域请求与在线模拟生成，我们已实现了前后端分离的高效开发。

### 2. 关于图标icon的说明

>本项目中用到的天气相关的图标皆来自魅族手机自带的天气软件，而其它功能性图标采用当下最流行iconfont解决文案，本人具体用的是国内的 [阿里的矢量图标库存](http://www.iconfont.cn/)，图标的库存也是蛮惊人的。具体的操作方法可以看看我写的一篇文章。[在线制作文字图标]()

### 3. 关于项目中插件的说明

>#### Echarts

>>Echarts是百度推出的一款数据可视化插件，其底层基于canvas或SVG，在互联网+与大数据的背景下，掌握数据可视化工具显得尤其重要。

>#### better-scroll

>>better-scroll是一款重点解决移动端（已支持 PC）各种滚动场景需求的插件。它的核心是借鉴的 iscroll 的实现，它的 API 设计基本兼容 iscroll，在 iscroll 的基础上又扩展了一些 feature 以及做了一些性能优化。better-scroll 是基于原生 JS 实现的，不依赖任何框架。当然了，如果你有足够的时间，也可以直接用W3C标准化的触摸事件来一步步地实现

这是本人第一次尝试从头到尾完整地整理发布一个项目，由于学识有限，项目中难免有疏忽或不妥之处，还请各位慷慨指出，小弟将不甚感激！

## 技术栈

* vuex2.0
* vux2.0
* vue-router
* fetch
* Mock.js
* better-scroll
* Echarts
* webpack
* ES6/7
* less
* svg

## 项目运行

>注意：由于涉及大量的 ES6/7 等新属性，node 需要 6.0 以上版本

### 安装
	
	# clone repository
	git clone https://github.com/VinsonChan/vue-moji.git
	
	# enter project
	cd vue-moji

	# install dependencies
	npm install

### 运行

	# serve with hot reload at localhost:8080
	npm run dev

## 实现功能

*[x] 自动IP定位当前城市并发送天气API请求

*[x] 主页城市页多页横切

*[x] 主页下拉刷新数据

*[x] 城市管理，添加与删除

*[x] 本地存储localstorage。将请求结果存储于本场设备，实现离线访问

*[x] 应用缓存keepalive。主页开启vue路由缓存，减少不必要的网络请求

*[x] 设置页含资讯开关，设置新闻模块显示与否

*[x] 一周天气预报，当天24短时预报

*[x] 根据主页城市页生成分享页

*[x] 根据当天天气状况智能提醒，并动态展示日出日落图

*[] 点击分享按钮时调用第三方应用的分享功能，尚未完成

## 效果截图

### 主页效果图

![index](https://github.com/VinsonChan/ImageCache/raw/moji/moji/1index.gif)
![slider](https://github.com/VinsonChan/ImageCache/raw/moji/moji/3slideX.gif)

### 添加、删除城市

![addCity](https://github.com/VinsonChan/ImageCache/raw/moji/moji/2addCity.gif)
![rmCity](https://github.com/VinsonChan/ImageCache/raw/moji/moji/4removCity.gif)

### 异步加载日出图

![sunRise](https://github.com/VinsonChan/ImageCache/raw/moji/moji/5sunrise.gif)

### 新闻资讯开关

![news](https://github.com/VinsonChan/ImageCache/raw/moji/moji/7news.gif)

### 分享页与空气质量页

![share](https://github.com/VinsonChan/ImageCache/raw/moji/moji/8share.gif)
![airCondition](https://github.com/VinsonChan/ImageCache/raw/moji/moji/6air.gif)
