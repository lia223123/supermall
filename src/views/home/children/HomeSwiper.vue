<template>
  <div>
  <swiper>
    <swiper-item v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" @load="swiperImageLoad">
      </a>
    </swiper-item>
  </swiper>
  </div>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper';
export default {
  name: "HomeSwiper",
  components:{
    Swiper,SwiperItem
  },
  props:{
    banners:{
      type:Array,
      require:true
    }
  },
  methods:{
    swiperImageLoad(){
      this.$emit('swiperImageLoad')
    }
  }
}
</script>

<style scoped>

</style>