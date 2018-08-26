<template>
  <div>
    <header id="top">
      <x-icon type="ios-arrow-back" size="30" @click="$router.go(-1)"></x-icon>
      <div class="search">
        <search
          @on-change="getResult"
          @result-click="resultClick"
          :results="results"
          v-model="value"
          @on-submit="onSubmit"
          ref="search">
        </search>
      </div>
    </header>
    <section class='cities'>
      <divider class='muted'>热门城市</divider>
      <flexbox :gutter='0' wrap='wrap' justify='space-around'>
        <flexbox-item :span="1/4" v-for='city in hotCities' :key='city'><div class="flex-demo" @click="add(city)">{{city}}</div></flexbox-item>
      </flexbox>
      <div class="warn">由于使用的是免费的API，目前能查询到的城市只有：北京，上海，天津，重庆，香港</div>
    </section>
    <div v-transfer-dom style="height:100%">
      <alert ref="alert" v-model="showAlert" title="提示" style="top:50%!important;">您选择的城市已存在！</alert>
    </div>
  </div>
</template>
<style>

</style>

<script>
import headerTop from '@/components/header/head'
import {Search,Divider,Flexbox,FlexboxItem,TransferDomDirective as TransferDom,Alert} from 'vux'
import {getStorage,setStorage,removeStorage} from '../../config/mUtils'
import {getWeather} from '../../service/getData'
import {mapMutations} from 'vuex'

export default{
  directives:{
    TransferDom
  },
  data(){
    return{
      hotCities:['上海','北京','香港','南京','苏州','深圳','成都','重庆','天津','武汉','西安','广州'],
      value: '',
      showAlert:false,
      results:[]
    }
  },
  components:{
    headerTop,
    Search,
    Divider,
    Flexbox,
    FlexboxItem,
    Alert
  },
  beforeRouteLeave(to, from, next){
    if(to.path == "/home"){
      to.meta.keepAlive = false;
    }
    next()
  },
  methods:{
    ...mapMutations([
      "RECORD_INDEX"
    ]),
    setFocus () {
      this.$refs.search.setFocus()
    },
    resultClick (item) {
      window.alert('you click the result item: ' + JSON.stringify(item))
    },
    getResult (val) {
      this.results = val ? this.pushResult(val) : []
    },
    pushResult(val){
      let rs = []
      for (let i = 0; i < 20; i++) {
        rs.push({
          title: `${val} result: ${i + 1} `,
          other: i
        })
      }
      return rs
    },
    onSubmit () {
      this.$refs.search.setBlur()
      this.$vux.toast.show({
        type: 'text',
        position: 'top',
        text: 'on submit'
      })
    },
    async add(data){
      if(data==='北京'||data==='上海'||data==='天津'||data==='重庆'||data==='香港'){
        let temp = JSON.parse(getStorage('res'));
        let bol = temp.every((item)=>{
          return item.city !== data
        })
        if(bol){
          let timeStamp = new Date().getTime();
          await getWeather(data,timeStamp).then(res => {
            if(res.result.img !== '0'){
              res.result.img = res.result.img.replace('/^0/','')
            }

            res.result.daily.forEach(function(item){
              if(item.day.img !== '0'){
                item.day.img = item.day.img.replace('/^0/','')

              }
              if(item.night.img !== '0'){
                item.night.img = item.night.img.replace('/^0/','')
              }
            })
            res.result.hourly.forEach(function(item){
              if(item.img !== '0'){
                item.img = item.img.replace('/^0/','')
              }
            })
            let response = res.result;
            temp.push(response);
            setStorage('res',temp);
          })
          //增加了城市之后回首页，并定位到新添加城市索引页
          let leng = JSON.parse(getStorage('res')).length;
          this.RECORD_INDEX(leng-1);
          this.$router.push('/home');
        }
        else{
          this.showAlert = true;
        }
      }
    },
  },
  mounted(){

  }
}
</script>

<style lang="less" scoped>
#top{
    padding: 8px 0;
    display: flex;
    align-items: center;
    flex-wrap:nowrap;
    .search{
      flex-grow: 1;
    }
  }
.cities{
  padding-top: 1rem;
  background-color: white;
}
.flex-demo {
  width: 80%;
  text-align: center;
  border:1px solid #999;
  border-radius: 50vw;
  background-clip: padding-box;
  margin: 0.5rem auto;
}
.weui-search-bar{
  padding:0!important;
}

/*.weui-search-bar__label{
  border:none!important;
  border-image: none!important;
  background-clip: content-box!important;
  border-radius: 0!important;
}*/

.weui-search-bar__form::after{
  border:none!important;
}
.warn{
  margin-top: 1rem;
  color:green;
  padding:0 1rem;
}
</style>
