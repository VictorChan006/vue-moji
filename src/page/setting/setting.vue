<template>
  <div>
    <header-top title='设置' :showBack="true"></header-top>
    <div class="setting">
      <group>
        <cell title="预警管理" is-link link="/warning"></cell>
        <x-switch title="本地资讯" :value="info" @on-change="SHOW_NEWS"></x-switch>
        <x-switch title="精选内容推送" v-model="push"></x-switch>
      </group>
    </div>
  </div>
</template>

<script>
import headerTop from '@/components/header/head'
import {Group,Cell,XSwitch} from 'vux'
import {mapState,mapMutations} from 'vuex'

window.oldShowNews = false;

export default{
  data(){
    return{
      push:true,
    }
  },
  computed:{
    ...mapState([
      "showNews",
    ]),
    info:function(){
      return this.showNews
    }
  },
  beforeRouteLeave(to, from, next){
    if(to.path == "/home"&&window.oldShowNews!==this.showNews){
      to.meta.keepAlive = false;
      console.log("解除keepalive")
    }
    next()
  },
  components:{
    headerTop,Group,Cell,XSwitch
  },
  methods:{
    ...mapMutations([
      "SHOW_NEWS",
    ]),
    recordShowNews(){
    window.oldShowNews = this.showNews;
    }
  },

  mounted(){
    this.recordShowNews()
  }
}
</script>

<style scoped>
.setting{
  padding:0 0.8rem;
}
</style>
