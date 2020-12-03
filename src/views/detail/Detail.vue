<template>
  <div id="detail">
    <detail-nav-bar/>
    <detail-swiper :topImages="topImages"></detail-swiper>
  </div>
</template>

<script>
import DetailNavBar from "./children/DetailNavBar";

import DetailSwiper from "./children/DetailSwiper";

import {detail} from "../../network/detail";

export default {
  name: "Detail",
  data(){
    return {
      iid:null,
      topImages:null
    }
  },
  components:{
    DetailNavBar,
    DetailSwiper
  },
  created() {
    this.iid = this.$route.params.iid

    //网络请求轮播图片
    detail(this.iid).then(res=>{
      console.log(res);
      this.topImages = res.result.itemInfo.topImages
    })
  }
}
</script>

<style scoped>

</style>