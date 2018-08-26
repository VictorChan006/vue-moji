<template>
  <div v-if="res">
    <header-top :showBack="true" :title='res.index[$route.query.item].iname' :showMore='false'></header-top>
    <div class="index">
      <article>
        <h2>{{res.index[$route.query.item].ivalue}}</h2>
        <p>{{res.index[$route.query.item].detail}}</p>
      </article>
      <br/>
      <br/>
      <br/>
      <footer>
        <h4>{{res.city}}</h4>
        <p class="muted">天气状况 {{index.ivalue}}<br/>温度范围 {{res.templow}}&deg;~{{res.temphigh}}&deg;<br/>风力风向 {{res.winddirect}} {{res.windpower}}</p>
      </footer>
    </div>
  </div>
</template>

<script>
import headerTop from '../../components/header/head'
import {mapState} from 'vuex'
import {getStorage,removeStorage} from '../../config/mUtils'

export default{
  data(){
    return{
      res:''
    }
  },
  computed:{
    ...mapState([
      "index"
    ])
  },
  components:{
    headerTop,
  },
  methods:{
    init(){
      this.res = JSON.parse(getStorage('res'))[this.index]
    }
  },
  created () {

  },
  mounted(){
    this.init();
  }
}
</script>

<style>
.index{
  background:url('http://placeholder.qiniudn.com/120x120/3cc51f/ffffff') no-repeat bottom right;
  background-color: white;
  padding:1rem;
  margin-top: 1rem
}
</style>
