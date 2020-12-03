<template>
  <div>
    <nav-bar>
      <div slot="left" @click="backClick" class="back">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center"  class="title">
        <div class="title-item"
             @click="itemClick(index)"
             v-for="(item,index) in title" :class="{active:currentIndex===index}">{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "../../../components/common/navbar/NavBar";
export default {
  name: "DetailNavBar",
  data(){
    return {
      title:['商品', '参数', '评论', '推荐'],
      currentIndex:0
    }
  },
  components:{
    NavBar
  },
  methods:{
    itemClick(index) {
      this.currentIndex = index
    },
    backClick() {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
  .back{
    margin-top: 7px;
  }
  .title{
    display: flex;
    font-size: 16px;
  }
  .title-item{
    flex: 1;
  }
  .active{
    color: var(--color-high-text);
  }

</style>