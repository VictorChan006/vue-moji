<template>
<div>
  <x-header :title='title' :style='bgColor' :left-options="{showBack: showBack}" :right-options="{showMore:showMore}" @on-click-more="show_menu">
    <slot name='overwrite-title'></slot>
  </x-header>

</div>
</template>

<script>
//该组件为100%高布局，可以解决部分键盘输入的问题，但是同时会在safari中出现向下滚动时无法自动隐藏url工具栏和底部栏的问题。
import { XHeader} from 'vux'
// import {mapMutations} from 'vuex'
export default{
  data () {
    return {
      showMenus: false,
      bool: false,
      cityname:"龙华区",
    }
  },
  props:['title','showMore','bgColor','showBack'],
  components:{
    XHeader,

  },

  mounted(){
    this.send()
  },
  methods:{
    send(){
      this.$emit('ievent',this.showMenus)
    },
    show_menu(){
      this.showMenus = true;
      this.send()
    }
  }
}
</script>

<style>

</style>
