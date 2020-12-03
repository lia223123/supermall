<template>
  <div id="home">
    <NavBar class="home-nav"><div slot="center">购物街</div></NavBar>
    <Scroll class="content"
            ref="scroll"
            :probe-type="3"
            :pull-up-load="true"
            @scroll="contentScroll"
            @pullingUp="pullingUp">
      <HomeSwiper :banners="banners"></HomeSwiper>
      <RecommendsView :recommends="recommends"></RecommendsView>
      <FeatureView></FeatureView>
      <TabControl class="tab-control"
                  :titles="['流行' , '新款', '精选']"
                  @tabClick="tabClick">
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
      isShowBackTop:true
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
      this.$refs.scroll.refresh()
    },
    //返回顶部
    backTop(){
      this.$refs.scroll.scrollTo(0, 0)
    },
    //监听滑动距离
    contentScroll(position){
      this.isShowBackTop = position.y < -1000
    },
    //上拉加载
    pullingUp(){
      this.getHomeGoods(this.goodsType)
      this.$refs.scroll.finishPullUp()
      this.$refs.scroll.refresh()
    },
    /**
    * 网络请求
    */
    getHomeMultidata(){
      getHomeMultidata().then(res =>{
        console.log(res.data);
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
      })
    }
  }
}
</script>

<style scoped>
.home-nav{
  background-color: var(--color-tint);
  color: white;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 9;
}
#home{
  /*padding-top: 44px;*/
  height: 100vh;
  position: relative;
}
.tab-control{
  position: sticky;
  top: 44px;
  z-index: 9;
}
.content{
  overflow: hidden;
  position: absolute;
  top:44px;
  bottom:49px;
  left: 0;
  right: 0;
}
</style>