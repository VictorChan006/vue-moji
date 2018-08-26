<template>
  <transition>
    <div>
      <header-top title="空气质量" :showBack="true" :showMore='true'></header-top>
      <div class="wrapper" ref="wrapper">
         <div class="content">
            <section class="vux-1px-t top">
             <div class="clearfix">
               <div class="left">
                 <div class="clearfix"><span>{{res.aqi.aqi}}&nbsp;</span><span class="barge">{{res.aqi.quality}}</span></div>
                 <p>全国空气排量排名 ></p>
               </div>
               <span class="right">
                 <svg class="icon" aria-hidden="true">
                   <use xlink:href="#icon-locate"></use>
                 </svg> {{res.city}}
               </span>
             </div>
           </section>
           <section class="pollution">
             <header class="clearfix">
               <h4>&nbsp;主要污染物</h4>
               <a href="#">百科 <span class="triangle"></span></a>
             </header>
             <div class="content vux-1px-t">
               <ul class="clearfix">
                 <li v-for="item in pollutions">
                   <p>{{item.val}}</p>
                   <p class="muted" v-html="sub(item.name)"></p>
                 </li>
               </ul>
             </div>
           </section>
           <section class="chartbox" ref="chartbox">
             <div class="chart" ref="chart"></div>
           </section>
         </div>
      </div>
    </div>
  </transition>
</template>

<script>
import headerTop from '@/components/header/head'
import {Divider} from 'vux'
import {mapState} from 'vuex'
import {getStorage} from '@/config/mUtils'
import Mock from 'mockjs'
export default{
  data(){
    return{
      week:[],
      quality:[],
      sliderY:''
    }
  },
  computed:{
    ...mapState([
      "index",
      "terminalWidth",
      "terminalHeight"
    ]),
    res:function(){
      return JSON.parse(getStorage('res'))[this.index]
    },
    pollutions:function(){
      let res = this.res.aqi;
      return new Array({name:"SO2",val:res.so2},{name:"O3",val:res.o3},{name:"CO",val:res.co},{name:"NO2",val:res.no2},{name:"PM10",val:res.pm10},{name:"PM2.5",val:res.pm2_5})
    }
  },
  components:{
    headerTop,
    Divider
  },
  methods:{
    sub:function(str){
      let reg = /^PM/;
      if(reg.test(str)) return str;
      return str.replace(/(\d)/g, `<sub>$1</sub>`)
    },
    initSlider(){
      this.$nextTick(function(){
        let dom = this.$refs.wrapper;
        dom.style.width = this.terminalWidth+"px";
        dom.style.height = this.terminalHeight+"px";
        this.sliderY = new this.$BScroll(dom,{
          scrollY:true,
          scrollX:false,
          bounce:false,
        })
      })
    },
    initChart(){
      const arr = this.initData();
      const date = [];
      const aqi = [];
      const quality = [];
      arr.forEach((item,index)=>{
        date.push(item.week);
        aqi.push(item.aqi);
        quality.push(item.quality)
      })

      this.$nextTick(function(){
        this.initHeight(this.$refs.chartbox);
        setTimeout(()=>{
          const chart = this.$echarts.init(this.$refs.chart);
          chart.setOption({
            title:{
              subtext:"未来一周空气质量"
            },
            xAxis: {
              type: 'category',
              data: date
            },
            yAxis: {
                type: 'value'
            },
            series: [{
              data: aqi,
              type: 'bar',
            }]
          })
        },1000)
      })
    },
    initHeight(dom){
      let height = this.terminalHeight - dom.offsetTop
      if(height<200){
        dom.style.height = 200 + "px";
        console.log("太窄了")
      }
      else {
        dom.style.height = this.terminalHeight - dom.offsetTop + "px";
      }
    },
    initData(){
      let dayArr = this.res.daily;
      const week = [];
      const aqiArr = [];
      const arr = [];
      let obj = {};
      dayArr.forEach((item,index)=>{
        week.push(item.week)
      })
      for(let i = 0 ; i < 7 ; i ++){
        let random_aqi = Mock.mock({
        "number|1-200": 200
        })
        aqiArr.push(random_aqi.number);
      };
      for(let i = 0 ; i < 7 ; i ++){
        obj = {week:week[i],aqi:aqiArr[i],quality:""}
        arr.push(obj);
      }
      arr.forEach((item,index)=>{
        if(item.aqi<=50){
          item.quality="优"
        }
        if(item.aqi>50 && item.aqi <=100){
          item.quality="良"
        }
        if(item.aqi>100 && item.aqi <=150){
          item.quality="轻度污染"
        }
        if(item.aqi>150){
          item.quality="中度污染"
        }
      })
      return arr;
    }
  },
  created(){

  },
  mounted(){
    this.initSlider();
    this.initChart();
  }
}
</script>

<style lang="less" scoped>

.wrapper{
  overflow:hidden;
}
.top{
  background:white;
  color:white;
  padding:1rem;
  height:20rem;
  div{
    background:#00CBCC;
    height:100%;
    box-sizing:border-box;
    padding:1.2rem;
    .left{
      float:left;
      div{
        height:3.6rem;
        display:table;
        padding:0;
        span:nth-of-type(1){
          float:left;
          font-size:3.6rem;
          line-height:3.6rem;
        }
        span:nth-of-type(2){
          font-size:1.2rem;
          line-height:1.2rem;
          padding:0.2rem;
          margin-top:0.4rem;
          border-radius:0.2rem;
          float:left;
          background:#57BF3F;
        }
      }
      p{
        margin-top:-1rem;
      }
    }
    .right{
      float:right;
    }
  }
}
.pollution{
  padding:1rem;
  background:white;
  header{
    h4{
      border-left:1rem solid blue;
      float:left;
    }
    a{
      float:right;
      display:table;
      .triangle{
        display:inline-block;
        /* display:table-cell; */
        vertical-align:middle;
        width:0;
        height:0;
        border-right:solid 4px transparent;
        border-top:solid 4px transparent;
        border-bottom:solid 4px transparent;
        border-left:solid 4px black;
      }
    }
  }
  .content{
    margin-top:1rem;
    ul{
      display:flex;
      flex-wrap:nowrap;
      justify-content:space-between;
      overflow:hidden;
      padding:0.6rem 0;
      li{
        text-align:center;
        display:inline-block;
        width:20%;
        p:nth-of-type(1){
          font-size:1.6rem;
        }
        p:nth-of-type(2){
          font-size:1.4rem;
        }
      }
    }
  }
}

.chartbox{
  background:white;
  padding:1rem;
  margin-top:1.5rem;
  .chart{
   height:100%;
  }
}
</style>
