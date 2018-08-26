<template>
  <div>
    <header-top title='news' :showBack="true" :showMore='false'>
    </header-top>
    <router-link></router-link>
    <router-view ref="newsContainner"></router-view>
  </div>
</template>

<script>
import headerTop from '@/components/header/head'
import {loadNews} from '@/service/getData'

export default{
  data(){
    return{

    }
  },
  components:{
    headerTop,
  },
  methods:{
    initNews(){
      let url = this.$route.query.url;
      this.$router.push(url)
    }
  },
  created(){
  },
  mounted(){
    this.initNews();
  }
}
</script>

<style scoped>

</style>
