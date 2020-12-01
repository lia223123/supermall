<template>
  <div id="home">
    <NavBar class="home-nav"><div slot="center">购物街</div></NavBar>
    <HomeSwiper :banners="banners"></HomeSwiper>
    <RecommendsView :recommends="recommends"></RecommendsView>
    <FeatrueView></FeatrueView>
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar";
import {getHomeMultidata} from "../../network/home";
import HomeSwiper from "./children/HomeSwiper";
import RecommendsView from "./children/RecommendsView";
import FeatrueView from "./children/FeatrueView";

export default {
  name: "Home",
  data(){
    return {
      banners:[],
      recommends:[],
      // keywords:[],
      // dKeyword:[]
    }
  },
  components:{
    NavBar,
    HomeSwiper,
    RecommendsView,
    FeatrueView
  },
  created() {
    getHomeMultidata().then(res =>{
      console.log(res.data);
      this.banners=res.data.banner.list;
      this.recommends=res.data.recommend.list;
      // this.keywords=res.data.keywords;
      // this.dKeyword=res.data.dKeyword;
    })
  }
}
</script>

<style scoped>
.home-nav{
  background-color: var(--color-tint);
  color: white;
}
</style>