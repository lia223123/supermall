<template>
  <div class="wrapper" ref="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: "Scroll",
  props:{
    probeType:{
      type: Number ,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default: false
    }
  },
  data(){
    return {
      scroll:null
    }
  },
  mounted() {
    //1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper,{
      click:true,
      probeType:this.probeType,
      pullUpLoad:this.pullUpLoad
    })

    //2.监听滚动的位置
    this.scroll.on('scroll',(position) =>{
      this.$emit('scroll',position)
    })

    //3.上拉加载
    this.scroll.on('pullingUp',()=>{
      this.$emit('pullingUp')
    })


  },
  methods:{
    scrollTo(x, y, time=300){
      this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time)
    },
    refresh() {
      console.log('---');
      this.scroll && this.scroll.refresh && this.scroll.refresh()
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp && this.scroll.finishPullUp()
    },
    saveY(){
      return this.scroll && this.scroll.y
    }
  }
}
</script>

<style scoped>

</style>