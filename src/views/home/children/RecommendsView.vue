<template>
  <div class="recommends">
    <div v-for="item in recommends" class="recommends-item">
      <a :href="item.link">
        <img :src="item.image">
        <span>{{item.title}}</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendsView",
  props:{
    recommends:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>
.recommends{
  display: flex;
  padding-top: 10px;
  padding-bottom: 30px;
  border-bottom: 3px solid #474444;
}
.recommends-item{
  flex: 1;
  text-align: center;
}
.recommends-item img{
  height: 65px;
  width: 65px;
  margin-bottom: 5px;
}
.recommends-item span{
}
</style>