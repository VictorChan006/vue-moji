<template>
  <div>
    <header-top title='设置'></header-top>
     <group>
      <cell v-for="(city,index) in res" :key="index" :title="city.city">
        <svg v-if="index==0" slot='after-title' class='icon icon_locate' aria-hidden="true">
          <use xlink:href="#icon-locate"></use>
        </svg>
        <inline-x-switch v-once="native" :key="index"></inline-x-switch>
      </cell>
    </group>
  </div>
</template>

<script>
import headerTop from '@/components/header/head'
import {Group,Cell,InlineXSwitch} from 'vux'
import {getStorage} from '../../config/mUtils'

export default{
  data(){
    return{
      native:true,
      res:''
    }
  },
  components:{
    headerTop,Group,Cell,InlineXSwitch
  },
  methods:{
    init(){
      this.res =  JSON.parse(getStorage('res'));
    }
  },
  mounted(){
    this.init()
  }
}
</script>

<style scoped>
.icon_locate{
  fill:red;
}
</style>
