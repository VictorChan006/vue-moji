<template>
  <div id="calendar">
    <header-top :title='date' :showBack="true"></header-top>
    <div class="calendar">
      <inline-calendar :show-next-month='false' :hide-header='true'></inline-calendar>
    </div>
    <div id="rcmlist">
      <h5 class="header">今日推荐</h5>
      <div class="recommand" v-for="(item,index) in list" :key="index">
        <div class="box" @click="goTo(item.url)">
          <div class="img">图片占位符</div>
          <div class="content">
            <h5>{{item.title}}</h5>
            <p class="muted">{{item.desc}}</p>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import headerTop from '@/components/header/head'
// import {mapState} from 'vuex'
import {InlineCalendar,Panel,Divider} from 'vux'
import {getStorage} from '@/config/mUtils'

export default{
  data(){
    return{
      demo1:'',
      readonly:false,
      date:'',
      list: [{
        title: '每日早睡提醒',
        desc: '坚持早睡，9大好处回馈你的身体',
        url: '/component/cell'
      }, {
        title: '标题二',
        desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
        url:'/component/radio',
      }],
    }
  },
  computed:{
  },
  components:{
    headerTop,
    InlineCalendar,
    Panel,
    Divider
  },
  methods:{
    init(){
      let date = new Date();
      this.date = [date.getFullYear(),date.getMonth()+Number(1),date.getDate()].join("-")
    }
  },
  created () {

  },
  mounted(){
    this.init()
  }
}
</script>

<style lang="less" scoped>
.calendar{
  margin-top:0.8rem;
}
#rcmlist{
  margin-top:1rem;
  padding: 1rem 1rem 0;
  background:white;
  .header{
    color:#666666;
    padding-bottom:0.8rem;
    border-bottom:1px solid #eeeeee;
  }
  .recommand{
  .box{
    padding: 1rem 0;
    display:flex;
    border-bottom: 1px solid #eeeeee;
    .img{
      /* width:28%;
      height:28%; */
      text-align:center;
      width:60px;
      height:60px;
      background:green;
      margin-right:0.6rem;
    }
    .content{
      position:relative;
      width:72%;
      h5{
        font-size:1.6rem;
      }
      p{
        position:absolute;
        bottom:0;
      }
    }
  }
}
}

</style>
