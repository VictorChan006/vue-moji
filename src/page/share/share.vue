<template>
  <div v-if="res">
    <div v-if="show">
      <header-top title='分享' :showBack="true"></header-top>
      <div id="share" class="clearfix" :style="style">
        <ul class="title">
          <li>{{res.city}}</li>
          <li class="large">{{res.temp}}&deg;</li>
          <li class="desc">云淡风轻</li>
        </ul>
        <span class="date">{{res.date}}</span>
        <div id="main"><q>{{mood}}</q></div>
        <footer class="foot">Moji天气</footer>
      </div>
      <div class="refresh" @click='refresh'>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-refresh"></use>
        </svg>换句心情
      </div>
      <div class="public">
        <x-button action-type="button" link="" plain type="primary" class="custom-primary">发布</x-button>
      </div>
    </div>
  </div>
</template>

<script>
import headerTop from '@/components/header/head'
import Mock from 'mockjs'
import {getStorage} from '@/config/mUtils'
import {XButton,TransferDomDirective as TransferDom} from 'vux'

export default{
  directives: {
    TransferDom
  },
  data(){
    return{
      mood:'',
      res:false,
      show:false,
    }
  },
  computed:{
    style:function(){
      return {
        background:'#EA5F2D',
        backgroundClip:'content-box',
        color:'white',
        padding:'1rem 2rem',
        height:'70vh',
        position: 'relative',
      }
    }
  },
  components:{
    headerTop,
    XButton,
    TransferDom,
  },
  methods:{
    init(){
      let index = this.$route.query.cityId
      this.res = JSON.parse(getStorage('res'))[index]
    },
    dataFrMock(){
      this.mood = Mock.mock('@ctitle(40)')
    },
    refresh(){
      this.dataFrMock()
    },
    loading(){
      this.$vux.loading.show({
        text: 'Loading'
      })
      setTimeout(() => {
        this.$vux.loading.hide();
        this.show = true
      }, 500);
    },
  },
  mounted(){
    this.loading();
    this.init();
    this.dataFrMock();
  },
}
</script>

<style lang="less" scoped>

@import '~vux/src/styles/reset.less';

#share{
  .title{
    float:left;
    padding:1rem;
    font-size: 1.6rem;
    /* line-height: 2.3rem; */
    .large{
      margin:-0.8rem 0;
      font-size: 6rem;
      font-family:aria;
      line-height:8rem;
    }
    .desc{
      font-size: 1.6rem;
    }
  }
  span{
    float:right;
    margin-right:1rem;
    margin-top:1rem;
    color:#efefef;
  }
  #main{
    text-align:center;
    width: 50vw;
    position: absolute;
    bottom: 6rem;
    left: 0;
    right:0;
    margin: 0 auto;
  }
}


.foot{
  position: absolute;
  bottom: 2rem;
  left:0;
  right:0;
  margin: 0 auto;
  text-align:center;
  font-size: 0.8rem;
  color:#cccccc;
}
.refresh{
  text-align:center;
}
.public{
  width: 100%;
  background:white;
  padding:0.2rem;
  text-align:center;
  position: fixed;
  bottom: 0;
}
.custom-primary{
  margin:0 auto!important;
  width:60vw!important;
  border:none!important;
  border-radius: 50vh!important;
  background: blue!important;
  color: white!important;
  &:active {
    color: rgba(206, 60, 57, 0.6)!important;
    background-color: transparent;
  }
}
</style>
