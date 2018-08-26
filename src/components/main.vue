<template>
  <div v-if="res" ref="main">
    <div id="mainContent" ref="mainContent">
      <div id="weather">
        <div class="now"><span>{{res.weather}}&nbsp;</span><img :src='"../assets/weathercn/"+res.img+".png"' height="24" width="24" alt=""></div>
        <div class="temp">{{res.temp}}&deg;</div>
        <div id="wind">
          <span class="wind">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-fengxiang1"></use>
            </svg>{{res.winddirect}}{{res.windpower}}
          </span>
          <span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-shidu1"></use>
            </svg>湿度{{res.humidity}}%
          </span>
        </div>
        <span id="air"  ref="air"  @click="$router.push({path:'aircondition',query:{cityId:index}})">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-kongqiqingxin"></use>
          </svg> {{res.aqi.aqi}} {{res.aqi.quality}} &gt;
        </span>
      </div>
      <div id="hourly" ref="wrapper">
        <div class="content" ref="hour">
          <ul>
            <li>短时预报</li>
            <li>
              <svg class="icon" style="color:#5087C3" aria-hidden="true">
                <use xlink:href="#icon-shizhong"></use>
              </svg>
            </li>
            <li>{{res.hourly[0].weather}}</li>
            <li v-if="res.hourly[0].weather=='晴'||'多云'">请放心出行</li>
            <li v-else>雨天记得带伞哦</li>
          </ul>
          <ul v-for='hour in res.hourly'>
            <li>{{hour.time}}</li>
            <li><img :src='"../assets/weathercn/"+hour.img+".png"' alt="天气图标" class="weather-icon"></li>
            <li>{{hour.weather}}</li>
            <li>{{hour.temp}}&deg;</li>
          </ul>
        </div>
      </div>
      <div id="daily">
        <divider>一周天气预报</divider>
        <ul v-for='week in res.daily'>
          <li>{{week.week}} {{week.date|noneYear}}</li>
          <li class="daily-icon"><img :src='"../assets/weathercn/"+week.day.img+".png"' alt="天气图标" class="weather-icon"><span>&nbsp;&nbsp;{{week.day.weather}}</span></li>
          <li>{{week.night.templow}}&deg;~{{week.day.temphigh}}&deg;</li>
        </ul>
      </div>
      <div id="sun">
        <divider>温馨提示</divider>
        <div ref="tip" id="tip">
          <div class="text">
            <div>今天白天到夜间，{{res.weather}},{{res.winddirect}}{{res.windpower}},最高气温{{res.temphigh}}&deg;。
              <span v-if='res.temphigh>30'>天气很热，记得多喝水</span>
            </div>
            <footer class="muted">
              <span>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-wendu"></use>
                </svg>{{res.temp}}&deg;C&nbsp; </span>
              <span>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-qiya"></use>
                </svg>{{res.pressure}}hPa
              </span>
            </footer>
          </div>
          <div class="chart">
            <canvas ref="base" class="base"></canvas>
            <canvas ref="dot" class="dot"></canvas>
          </div>
        </div>
      </div>
      <grid :cols="4" id='index' :show-lr-borders="false">
        <grid-item link='/calendar' class="grid-center">
          <div slot='label' class="title">
            <div>
              {{date}}<p class="muted">{{res.week}}</p>
            </div>
          </div>
          <svg slot='icon' class="icon icon-grid" style="fill:red" aria-hidden="true">
            <use xlink:href="#icon-rili"></use>
          </svg>
        </grid-item>
        <grid-item v-for="(iTem,inDex) in res.index" :key="inDex" @click.native="jump(inDex)" class="grid-center">
          <div slot='label' class="title">{{iTem.iname}}
            <p class="muted">{{iTem.ivalue}}</p>
          </div>
          <svg v-for='(item,index) in icons' v-if='index===inDex' slot='icon' class="icon icon-grid" :style="iconColor(index)" aria-hidden="true">
            <use :xlink:href="item"></use>
          </svg>
        </grid-item>
      </grid>
    </div>
    <div id="news" v-if="showNews&&newsList">
      <h4 class="title">&nbsp;本地资讯</h4>
      <div class="vux-1px-t divide"></div>
      <article v-for="(item,index) in newsList" :key="index">
        <div class="new" @click="goTo(item.url)">
          <img :src="item.thumbnail_pic_s" alt="新闻图片"/>
          <div class="content">
            <h5>{{item.title}}</h5>
            <p class="muted">{{item.author_name}}&nbsp;{{item.date}}</p>
          </div>
        </div>
      </article>
      <footer @click="initNews">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-refresh"></use>
        </svg>
        <span> 换一换</span>
      </footer>
    </div>
    <div class="muted foot">数据支持：杭州网尚科技有限公司</div>
  </div>
</template>
<style>

</style>

<script>
import {Flexbox,FlexboxItem,Divider,Grid,GridItem,Actionsheet,InlineLoading,Panel} from 'vux'
import {hasClass,addClass,removeClass} from '@/config/mUtils'
import {mapMutations,mapState} from 'vuex'
import {getNews} from '@/service/getData'

export default{
  data(){
    return{
      res: this.result,
      index:this.num,
      icons:['#icon-kongqizhiliang','#icon-yundongzhishu','#icon-ziwaixian','#icon-ganmaozhishu','#icon-xichezhishu','#icon-kongqizhiliang','#icon-chuanyizhishu'],
      showMenu:false,
      newsList: [],
      rise:'',
      set:'',
      obj:null,
      isButton:true,
    }
  },
  props:['result','num','chart'],
  computed:{
    ...mapState([
      "showNews"
    ]),
    date(){
     return this.res.date.replace(/(\d){4}-/, "")
    },
    week(){
      return this.res.week
    },
  },
  watch:{
    chart:function(){
      setTimeout(this.dayOrnight(),1000)
    },
  },
  filters:{
    noneYear(data){
      return data.replace(/(\d){4}-/, "")
    }
  },

  components:{
    Flexbox,
    FlexboxItem,
    Divider,
    Grid,
    GridItem,
    InlineLoading,
    Panel
  },
  methods:{
    ...mapMutations([
      'RECORD_RES',
      // 'RECORD_INDEX'
    ]),
    iconColor(index){
      let arr = ["blue","red","green"];
      let num = index%3;
      let color = arr[num];
      return {
        fill:`${color}`
      }
    },
    // 异步加载的canvas
    drawAxis(){
      this.$nextTick(function(){
        const cv = this.$refs.base;
        let width = cv.width;
        let height = cv.height;
        let [time1,time2] = [this.res.daily[0].sunrise,this.res.daily[0].sunset];
        this.rise = time1;
        this.set = time2;
        let [array1,array2] = [time1.split(":"),time2.split(":")];
         //圆心与半径
        let [centerX,centerY,r] = [150,120,100];
        let [x1,y1,x2,y2] = [centerX-r-20,120,centerX+r+20,120];

        this.obj = {center:{x:centerX,y:centerY},r:r,from:{x:x1+20,y:y1},size:{
          width:width,height:height}}

        const ctx = cv.getContext("2d");
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.moveTo(x1-20,y1);
        ctx.lineTo(x2+20,y2);
        ctx.stroke();
        ctx.beginPath();
        ctx.lineWidth = 1;
        var grd = ctx.createLinearGradient(0,0,300,150)
        ctx.strokeStyle = grd;
        grd.addColorStop(0,"white");
        grd.addColorStop(0.5,"red");
        grd.addColorStop(1,"black");
        ctx.arc(centerX,centerY,r,Math.PI,2*Math.PI,false);
        ctx.stroke();
        ctx.beginPath();
        ctx.lineWidth = 0.5;
        ctx.font = "1.6rem Aria";
        ctx.textAlign = "center";
        ctx.fillText(time1,centerX-r,y1+20);
        ctx.fillText(time2,centerX+r,y2+20);
        ctx.save();
      })
    },
    dayOrnight(){
      if(this.res){
        let now = new Date();
        let rise = this.rise;
        let set = this.set;
        let riseH = Number(rise.substring(0,2));
        let setH = Number(set.substring(0,2));
        let riseM = Number(rise.substring(3,5));
        let setM = Number(set.substring(3,5));
        let params = {now,riseH,setH,riseM,setM}

        let nowM = now.getHours()*60+now.getMinutes();
        let start = riseH*60 + riseM
        let end = setH*60 + setM;
        if(nowM>=start&&nowM<=end){
          this.drawSun(params)
        }
      }
    },
    drawSun(param){
      this.$nextTick(function(){
        let min = 0;
        if(param.now.getMinutes()<10){
          min = "0"+param.now.getMinutes()
        }
        else{
          min = param.now.getMinutes()
        }
        let now = param.now.getHours()+ ':' + min
        let sum = param.setH*60 + param.setM - param.riseH*60 - param.riseM;
        let Len = param.now.getHours()*60 + param.now.getMinutes() - param.riseH*60 - param.riseM;

        //实时x坐标与弧度
        let x3 = this.obj.from.x + Len/sum*2*this.obj.r;
        let y3 = 120 - Math.sqrt((this.obj.r*this.obj.r)-((x3-this.obj.center.x)*(x3-this.obj.center.x)));
        let Ang = 2*Math.PI - Math.abs(Math.acos((x3-this.obj.center.x)/this.obj.r))

        // 上层dom
        const backDom = this.$refs.dot;
        const backCtx = backDom.getContext('2d');
        let width = backDom.style.width = this.obj.size.width;
        let height = backDom.style.height = this.obj.size.height;

        //起点
        let start = Math.PI;

        let bol = true;
         //防止上一个圆路径还没画完就又调用画路径函数
        const timer = setInterval(()=>{
          if(bol){
            drawPath(start)
          }
        },16)

        const drawPath = (angle)=>{
          bol = false;
          if(angle >= Math.PI && angle <= 2*Math.PI){
            backCtx.clearRect(0,0,width,height)
            let r1 = 6;
            backCtx.fillStyle = "#ffff00";
            backCtx.shadowColor = "black";
            backCtx.shadowBlur = 10;
            backCtx.beginPath();
            backCtx.arc(this.obj.center.x + Math.cos(angle)*this.obj.r,this.obj.center.y + Math.sin(angle)*this.obj.r,r1,0,2*Math.PI);
            backCtx.fill();
          }
          start += 0.01;
          bol = true;
          if(start > Ang){
            clearInterval(timer);
            setTimeout(()=>{
              const cv = this.$refs.base;
              const ctx = cv.getContext("2d");
              ctx.strokeStyle = "#666666"
              ctx.beginPath();
              ctx.moveTo(x3,y3);
              ctx.lineTo(x3,this.obj.center.y);
              ctx.stroke();
              ctx.restore();
              ctx.fillText(now,x3+25,y3-5)
            },500)
          }
        };
      })
    },
    jump(index){
      this.$router.push({path:'/condition',query:{item:index}})
    },
    // 初始化better-scroll插件
    initSlider(){
      this.$nextTick(function(){
        //实例化BScroll
        let scrollHourly = new this.$BScroll(this.$refs.wrapper,{
          stopPropagation:true,
          scrollX: true,
          eventPassthrough:"vertical"
        });
      })
    },
    initNews(){
      getNews().then(res=>{
        let len = res.result.data.length;
        const arr = [];
        let index = '';
        //随机选取5项从服务器返回的news，当作当前页的新闻内容
        for(let i = 0 ; i < len ; i++){
          index = Math.floor(Math.random()*30);
          //如果arr已经包含以下项，则跳过该项
          if(arr.indexOf(res.result.data[index]) !== -1){
            continue;
          }
          arr.push(res.result.data[index]);
          if(arr.length == 5){
            break;
          }
        }
        this.newsList = arr;
      })
    },
    handleScroll(){
      this.$nextTick(function(){
        let top = this.$refs.tip.offsetTop;
        this.$parent.chartOffsetTop = top;
      })
    },
    changeBg(e){
      e = e || event;
      e.target.style.background = "blue"
    },
    goTo(url){
      window.location.href=url;
    }
  },
  created(){
    this.initNews();
    this.handleScroll();
  },
  mounted(){
    this.initSlider();
    this.drawAxis();
  },
  activated(){
    // this.isButton = true;
  },
  deactivated(){
    // this.isButton = false;
  },
  beforeDestroy(){
  }
}

</script>

<style lang="less" scoped>
#amapContainer {
  width: 400px;
  height: 200px;
}

#weather {
  text-align: center;
  padding-top:8rem;
  font-weight: bold;
  .now{
    display: table;
    margin:0 auto;
    span{
      display:table-cell;
      vertical-align:middle;
    }
    img{
      display:table-cell;
      vertical-align:middle;
    }
  }
  .temp{
    font-family:aria;
    font-size:6.4rem;
  }
  #wind{
    margin-top: -1.2rem;
    font-weight:normal;
    .wind{
      margin-right: 2rem;
    }
  }
  #air{
    display:inline-block;
    padding:0 1rem;
    margin:0.8rem auto;
    font-size: 1.6rem;
    line-height:2.4rem;
    /* width: 25%; */
    border: 1px black solid;
    border-radius: 1.2rem;
  }
}
#hourly{
  width: 94%;
  margin:6rem auto 1rem;
  overflow: hidden;
  .content{
    margin-left:1rem;
    width: 500%;
    display: -webkit-flex;
    display:-moz-flex;
    display:-ms-flex;
    display:-o-flex;
    display:flex;
    justify-content: space-between;
    ul{
      li{
        text-align: center;
      }
    }
  }
}
.weather-icon{
  height: 1.8rem;
}
#daily{
  padding:2rem;
  ul{
    display:flex;
    margin-bottom: 1rem;
    justify-content: space-between;
    .daily-icon{
      display:table;
      img,span{
        display:table-cell;
        vertical-align:middle;
      }
    }
  }
  ul:nth-of-type(1){
    margin-top:1rem;
  }
}
#sun{
  padding:0 1.5rem;
  #tip{
    display:table;
    box-sizing:border-box;
    width:100%;
    .text,.chart{
      display:table-cell;
      vertical-align:middle;
    }
    .chart{
    width: 50%;
    height: 100px;
    position: relative;
      canvas{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }
      .base{
        z-index: 9;
      }
      .dot{
        z-index: 10;
        background: transparent;
      }
    }
  }
}
#index{
  background-color: white;
  margin-top:1.5rem;
  .grid-center {
    display: block;
    text-align: center;
    color: #666;
    border:1px solid #eeeeee;
    .icon-grid{
      font-size: 2rem;
    }
  }
}
#index .title{
  font-size:1.4rem;
  font-weight:bold;
}
#news{
  margin-top:1rem;
  padding: 1rem;
  .divide{
    margin:1rem 0;
  }
  h4{
    border-left:1rem solid blue;
  }
  article{
    display:block;
    .new{
      padding: 1rem 0;
      display:flex;
      border-bottom: 1px solid #eeeeee;

      img{
        width:28%;
        height:28%;
        margin-right:0.6rem;
      }
      .content{
        position:relative;
        width:72%;
        h5{
          font-size:1.4rem;
        }
        p{
          position:absolute;
          bottom:0;
        }
      }
    }
  }
  footer{
    text-align:center;
    font-size:1.6rem;
    padding:1rem 0;
    svg{
      width:1.6rem;
      height:1.6rem;
    }
  }
}
.foot{
  text-align:center;
  padding:1rem 0;
  background:#eeeeee;
}
.btn{
  background:blue;
  transition:all 0.5s ease;
}
</style>
