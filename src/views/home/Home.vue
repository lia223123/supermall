<template>
  <div id="home">
    <NavBar class="home-nav"><div slot="center">购物街</div></NavBar>
    <TabControl :titles="['流行' , '新款', '精选']"
                @tabClick="tabClick"
                ref="TabControl2"
                v-show="isTabControl"
                class="tab-control">
    </TabControl>
    <Scroll class="content"
            ref="scroll"
            :probe-type="3"
            :pull-up-load="true"
            @scroll="contentScroll"
            @pullingUp="pullingUp">
      <HomeSwiper :banners="banners" @swiperImageLoad="swiperImageLoad"></HomeSwiper>
      <RecommendsView :recommends="recommends"></RecommendsView>
      <FeatureView></FeatureView>
      <TabControl :titles="['流行' , '新款', '精选']"
                  @tabClick="tabClick" ref="TabControl1">
      </TabControl>
      <GoodsList :goods="goodsList"></GoodsList>
    </Scroll>
    <BackTop @click.native="backTop" v-show="isShowBackTop"/>
  </div>

</template>

<script>
import NavBar from "../../components/common/navbar/NavBar";
import TabControl from "../../components/content/tabControl/TabControl";
import GoodsList from "../../components/content/goods/GoodsList";
import Scroll from "../../components/common/scroll/Scroll";
import BackTop from "../../components/content/backTop/BackTop";

import HomeSwiper from "./children/HomeSwiper";
import RecommendsView from "./children/RecommendsView";
import FeatureView from "./children/FeatrueView";

import {getHomeMultidata, getHomeGoods} from "../../network/home";
import {debounce} from "../../common/utils";

export default {
  name: "Home",
  components:{
    NavBar,
    HomeSwiper,
    RecommendsView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data(){
    return {
      banners:[],
      recommends:[],
      // keywords:[],
      // dKeyword:[],
      goods:{
        'pop':{page: 0, list: []},
        'new':{page: 0, list: []},
        'sell':{page: 0, list: []}
      },
      goodsType:'pop',
      isShowBackTop:true,
      isTabControl:false,
      b:true,
      saveY:0
    }
  },
  computed:{
    goodsList(){
      return this.goods[this.goodsType].list
    }
  },
  created() {
    this.getHomeMultidata()

    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')


  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh,200)
    //使用事件总线响应函数，图片加载完刷新
    this.$bus.$on('itemImageLoad',() =>{
      refresh()
    })

    //
  },
  activated() {
    this.$refs.scroll.scrollTo(0,this.saveY,0)
  },
  deactivated() {
    this.saveY = this.$refs.scroll.saveY()
  },
  methods:{
    /**
     * 点击事件
     */
    tabClick(index){
      switch (index) {
        case 0:
          this.goodsType='pop'
          break
        case 1:
          this.goodsType='new'
          break
        case 2:
          this.goodsType='sell'
          break
      }
      this.$refs.TabControl1.currentIndex = index
      this.$refs.TabControl2.currentIndex = index
    },
    //返回顶部
    backTop(){
      this.$refs.scroll.scrollTo(0, 0)
    },
    //监听滑动距离
    contentScroll(position){
      this.isShowBackTop = position.y < -1000
      this.isTabControl = position.y < -616
    },
    //上拉加载
    pullingUp(){
      this.getHomeGoods(this.goodsType)
    },
    //监听轮播图加载完图片
    swiperImageLoad(){
      if(this.b){
        console.log(this.$refs.TabControl1.$el.offsetTop);
        this.b=false
      }
    },
    /**
    * 网络请求
    */
    getHomeMultidata(){
      getHomeMultidata().then(res =>{
        this.banners=res.data.banner.list;
        this.recommends=res.data.recommend.list;
        // this.keywords=res.data.keywords;
        // this.dKeyword=res.data.dKeyword;
      })
    },
    getHomeGoods(type){
      const page=this.goods[type].page + 1
      getHomeGoods(type,page).then(res =>{
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page+=1
        this.$refs.scroll.finishPullUp()
      })
    }
  }
}
</script>

<style scoped>
.home-nav{
  background-color: var(--color-tint);
  color: white;
  /*position: fixed;*/
  /*left: 0;*/
  /*top: 0;*/
  /*right: 0;*/
  /*z-index: 9;*/
}
#home{
  /*padding-top: 44px;*/
  height: 100vh;
  position: relative;
}
.content{
  overflow: hidden;
  position: absolute;
  top:44px;
  bottom:49px;
  left: 0;
  right: 0;
}
.tab-control{
  position: relative;
  z-index: 9;
  background-color: white;
}
</style>