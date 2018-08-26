<template>
  <div v-if='current'>
    <div v-transfer-dom>
      <alert v-model="show" title="您好！">删除城市成功</alert>
    </div>
    <header-top title='城市管理' :showBack="true"></header-top>
    <group>
      <cell v-if='native' :title='current.city' :inline-desc='desc'>
        <span slot='icon'>
          <img class='icon-md' :src='"../../assets/weathercn/"+current.img+".png"' alt="">
        </span>
        <svg slot='after-title' class='icon icon_locate' aria-hidden="true">
          <use xlink:href="#icon-locate"></use>
        </svg>
        <inline-x-switch v-model="native"></inline-x-switch>
      </cell>
      <cell v-if='!native' title="自动定位">
        <svg slot='icon' class='icon icon_none' aria-hidden="true">
          <use xlink:href="#icon-none"></use>
        </svg>
        <svg slot='after-title' class='icon icon_locate' aria-hidden="true">
          <use xlink:href="#icon-locate"></use>
        </svg>
        <inline-x-switch v-model="native"></inline-x-switch>
      </cell>
    </group>

    <group v-for='(city,index) in cities' :key='index' v-if='cities.length'>
      <cell :title='city.city'>
        <span slot='icon'>
          <img class='icon-md' :src='"../../assets/weathercn/"+city.img+".png"' alt="">
        </span>
        <span slot='inline-desc'>{{city.weather}} {{city.temp}}&deg;</span>
        <div>
          <x-icon type="ios-close-empty" class="cell-x-icon" size="30" @click.native="del(index)"></x-icon>
        </div>
      </cell>
    </group>
    <x-icon class="plus" type="ios-plus" size="64" @click.native="add"></x-icon>
  </div>
</template>

<script>
import headerTop from '../../components/header/head'
import {getStorage,setStorage,removeStorage} from '../../config/mUtils'
import {Panel,Group,InlineXSwitch,Cell,Alert,TransferDomDirective as TransferDom} from 'vux'
import {mapMutations} from 'vuex'

export default{
  directives:{
    TransferDom
  },
  data(){
    return{
      cities:'',
      current:null,
      native:true,
      change:false,
      show:false
    }
  },
  computed:{
    desc(){
      return this.current.weather+' '+this.current.temp+'°';
    },
  },
  components:{
    headerTop,
    Panel,
    Group,
    InlineXSwitch,
    Cell,
    Alert
  },
  beforeRouteLeave(to, from, next){
    if(to.path == "/home"&&this.change){
      to.meta.keepAlive = false;
    }
    next()
  },
  methods:{
    ...mapMutations([
      'RECORD_INDEX'
    ]),
    init(){
      this.cities = JSON.parse(getStorage('res')).slice(1)
      this.current = JSON.parse(getStorage('res'))[0];
    },
    add(){
      this.$router.push('/search')
    },
    // 点击消除按钮时
    async del(index){
      let temp = await JSON.parse(getStorage('res'));
      temp.splice(index+Number(1),1);
      setStorage('res',temp);
      this.RECORD_INDEX(0);
      this.init();
      this.change = true;
      this.show = true;
    }
  },
  created(){
    this.init()
  },
  mounted(){

  }
}
</script>

<style scoped>
.icon-md{
  width: 30px;
  margin-right: 1rem;
}
.icon_locate{
  color: red;
  width: 1.5rem;
  height: 1.5rem
}
.icon_none{
  width: 30px;
  height: 30px;
  margin-right: 1rem;
  color:blue;
}
/*.vux-x-icon {
  fill: gray;
  display: block;
}*/
.plus{
  position: fixed;
  bottom: 1rem;
  left: 0;
  right: 0;
  margin: 0 auto
}
</style>
