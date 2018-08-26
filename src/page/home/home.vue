<template>
  <div id="main" ref="mainbox">
    <header-top :title='title' :showBack="false" :bgColor="bg" :showMore='true' @ievent='dataFrHead' style="width:100%;position:fixed;left:0;top:0;z-index:999;">
    </header-top>
    <actionsheet v-model="showMenu" :menus="menu" theme="android" @on-click-menu='jump'>
    </actionsheet>
    <p ref="loading" class="loading">
      <span>
        下拉刷新&nbsp;&nbsp;
      </span>
      <svg class="icon loadIcon" aria-hidden="true">
        <use xlink:href="#icon-load"></use>
      </svg>
    </p>
    <div ref="scrollY" class="scrollY">
      <div class="wrapper" ref="wrapper">
        <div class="content clearfix" ref="content">
          <home-main v-for="(item,dex) in res" :key="dex" :result="item" :chart="drawChart" :num="dex"></home-main>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headerTop from '@/components/header/head'
import homeMain from '@/components/main'
import {getStorage,setStorage,removeStorage,hasClass,addClass} from '@/config/mUtils'
import {getWeather} from '@/service/getData'
import {Actionsheet} from 'vux'
import {mapState,mapMutations} from 'vuex'

export default{
  data(){
    return{
      res:'',
      temp:'',
      title:'',
      showRefresh:false,
      showMenu:false,
      showMore:true,
      bg:'background-color:rgba(255,255,255,0)',
      menu: {
        share: '分享',
        manage: '城市管理',
        setting: '设置'
      },
      chartOffsetTop:'',  //通过子组件main.vue赋值
      dist:0,
      drawChart:false,
      finishRefresh:false,
      sliderY:'',
    }
  },
  computed:{
    ...mapState([
      "index",  //
      "showNews",
      "forceUpdate",
      "positionY"
    ]),
  },
  watch:{
    dist:function(newV,oldV){
      let dist = this.dist?this.dist:0;
      if(dist == 30 && oldV > newV){
        this.rotate();
      }
    },
  },
  components:{
    homeMain,
    headerTop,
    Actionsheet,
  },
  methods:{
    ...mapMutations([
      "RECORD_INDEX",
      "IS_UPDATE",
      "TERMINAL_WIDTH",
      "TERMINAL_HEIGHT",
      "RECORD_POSITION_Y"
    ]),
    dataFrHead(data){
      this.showMenu = data
    },
    show_menu(){
      this.showMenus = true;
    },
    initCity(){
      AMap.plugin('AMap.CitySearch',() =>{//异步加载插件,使用citysearch插件
        var position = new AMap.CitySearch();
        // citysearch插件getLocalCity方法(根据传入或自动获取的ip——‘status’,返回查询结果)
        position.getLocalCity((status,result)=>{
          if(status!=="complete"){
            alert("获取当前城市失败。请使用UC或QQ浏览器打开应用");
          }
          let currentCity = result.city;
          if(getStorage('res') === null){
            let timeStamp = new Date().getTime();
            getWeather(currentCity,timeStamp).then(response =>{
            //处理返回的数据中img地址有时带0前缀有时不带
              this.resFilter(response)
              let temp = new Array(response.result);
              setStorage('res',temp)
            }).catch(err =>{
              alert(`获取${currentCity}天气失败。:\n ${err}`)
            })
          }
          else{
            let timeStamp = new Date().getTime();
            getWeather(currentCity,timeStamp).then(response =>{
            //处理返回的数据中img地址有时带0前缀有时不带
              this.resFilter(response)
              let temp = JSON.parse(getStorage('res'));
              temp.splice(0,1,response.result);
              setStorage('res',temp)
            }).catch(err =>{
              alert(`获取天气失败。失败原因:\n ${err}`)
            })
          }
        })
      })
    },
    resFilter(data){
      if(data.result.img != '0'){
        data.result.img = data.result.img.replace('/^0/','')
      }
      data.result.daily.forEach(function(item){
        if(item.day.img != '0'){
          item.day.img = item.day.img.replace('/^0/','')
        }
        if(item.night.img !== '0'){
          item.night.img = item.night.img.replace('/^0/','')
        }
      })
      data.result.hourly.forEach(function(item){
        if(item.img != '0'){
          item.img = item.img.replace('/^0/','')
        }
      })
      return data;
    },
    initData(){
      this.res = JSON.parse(getStorage('res'));
      this.title = this.res[this.index].city;
      //记录设备屏宽高
      this.TERMINAL_WIDTH(document.documentElement.clientWidth);
      this.TERMINAL_HEIGHT(document.documentElement.clientHeight);
    },
    sliderWidth(){
      this.$nextTick(function(){
        let children = this.$refs.content.children;
        let width = 0;
        let sliderWidth = this.$refs.wrapper.clientWidth;
        for(let i = 0 ; i < this.res.length ; i ++){
          let child = children[i];
          addClass(child,"slideItem");
          child.style.width = sliderWidth + 'px';
          width += sliderWidth;
        }
        this.$refs.content.style.width = width + 'px';
      })
    },
    initSlider(){
      this.$nextTick(function(){
        //初始化内容高度
        const sliderX = new this.$BScroll(this.$refs.wrapper,{
          scrollX:true,
          scrollY:false,
          momentum:false,
          snap:true,
          snapLoop:false,
          click:true,
          eventPassthrough: "vertical"
        })
        //获取当前页索引
        this.getIndex(sliderX);
        //当index被改变时自动滚动到指定页，只当sliderX的content改变时执行
        sliderX.goToPage(this.index);

        /****************纵向滚动************/
        this.sliderY = new this.$BScroll(this.$refs.scrollY,{
          scrollY:true,
          scrollX:false,
          probeType:3,
          tap:true,
          momentum:false,
          pullDownRefresh: {
            threshold: 50,
            stop: 30
          },
          bounce: {
            top: true,
            bottom: false,
          },
        })
        this.sliderY.on("scroll",this.changeStyle);
        this.sliderY.on("pullingDown",this.reData);
      })
    },
    getIndex(obj){
      obj.on("scrollEnd",()=>{
        let index_ = obj.getCurrentPage().pageX;
        this.RECORD_INDEX(index_);
        this.$nextTick(function(){
          this.title = this.res[this.index].city;
        })
      })
    },
    changeStyle(obj){
      let clientHeight = document.documentElement.clientHeight;
      //记录滚动位置
      let dist = this.dist = obj.y;
      //向上滚动时改变内容与标题栏的样式
      if(dist>=-200&&dist<=0){
        let a = -dist/200;
        this.bg = `background-color:rgba(255,255,255,${a})`;
        this.$refs.wrapper.style.backgroundColor = `rgba(255,255,255,${a})`;
      }
      //下拉刷新样式变化
      if(dist>=0){
        this.changeOpacity();
      }
      // 异步加载canvas
      if(dist < clientHeight-this.chartOffsetTop-200){
        this.drawChart = true;
      }
    },
    changeOpacity(){
      //reload随动
      let dist = this.dist;
      this.$refs.loading.style.top = 6+dist+"px";
      if(dist===0){
        this.$refs.loading.querySelector('span').innerHTML = "下拉刷新";
      }
      if(dist>0&&dist<=30){
        let op = dist/30;
        this.$refs.loading.style.opacity = op;
      }
      if(dist>30&&dist>50){
        this.$refs.loading.querySelector('span').innerHTML = "下拉刷新";
        this.$refs.loading.style.opacity = 1;
      }
      if(dist>=50){
        this.$refs.loading.querySelector('span').innerHTML = "释放刷新";
        this.$refs.loading.style.opacity = 1;
      }

    },
    rotate(){
      this.$refs.loading.querySelector('span').innerHTML = "刷新中";
      let load = this.$refs.loading.querySelector('.loadIcon');
      let angle = 0;
      let timer = setInterval(()=>{
        angle += 60;
        load.style.transform = "rotatez("+angle+"deg)";
        if(this.finishRefresh){
          clearInterval(timer);
          this.$refs.loading.querySelector('span').innerHTML = "刷新成功";
        }
      },50)
    },
    async reData(){
      this.finishRefresh = false;
      let timeStamp = new Date().getTime();
      await getWeather(this.title,timeStamp).then(res=>{
        this.resFilter(res);
        let newWeather = res.result;
        let temp = JSON.parse(getStorage('res'));
        temp.splice(this.index,1,newWeather);
        setStorage("res",temp);
      }).catch(err =>{
        alert(`获取天气失败。失败原因:\n ${err}`)
      })
      //数据重载后通知sliderY重载已结束,延迟1秒执行
      setTimeout(()=>{
        this.finishRefresh = true;
        this.sliderY.finishPullDown();
      },1000)
    },
    jump(key,item){
      this.$router.push({ path: `/${key}`, query: { cityId: this.index }});
    },
  },
  beforeRouteLeave(to,from,next){
    if(!this.$route.meta.keepAlive){
      this.RECORD_POSITION_Y(this.dist);
      this.$route.meta.keepAlive = true;
    }
    next();
  },
  created(){
    this.initCity();
    this.initData();
    this.sliderWidth();
    this.initSlider();
  },
  mounted(){
    window.addEventListener('resize',this.sliderWidth);
  },
  activated(){

  },
  deactivated(){

  },
  beforeDestroy(){
    window.removeEventListener('resize',this.sliderWidth);
  }
}

</script>

<style lang="less" scoped>
//重写header定位
#main{
  height:100%;
  background-image: linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%);
  background-image: -webkit-linear-gradient(bottom, #fbc2eb 0%, #a6c1ee 100%);
  background-image: -o-linear-gradient(bottom, #fbc2eb 0%, #a6c1ee 100%);
  background-image: -moz-linear-gradient(bottom, #fbc2eb 0%, #a6c1ee 100%);
}
.transparent{
  background:transparent;
}
.loading{
  position:fixed;
  left:0;
  right:0;
  margin:0 auto;
  top:6px;
  opacity:0;
  text-align:center;
  span{
    vertical-align:middle;
    display:inline-block;
    font-size:14px;
  }
  .loadIcon{
    width:1.4rem;
    height:1.4rem;
    margin-top:3rem;
  }
}
.scrollY{
  height:100%;
}
.wrapper{
  /* height:100%; */
  overflow:hidden;
}

.slideItem{
  float:left;
  box-sizing:border-box;
}
</style>
