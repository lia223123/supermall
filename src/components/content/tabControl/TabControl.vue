<template>
  <div class="TabControl">
    <div class="TabControl-item"
         v-for="(item,index) in titles"
         :class="{active:index===currentIndex}"
         @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props:{
    titles:{
      type:Array,
      default() {
        return [];
      }
    }
  },
  data(){
    return{
      currentIndex:0
    }
  },
  methods:{
    itemClick(index){
      this.currentIndex=index
      this.$emit('tabClick',index)
    }
  }

}
</script>

<style scoped>
.TabControl{
  text-align: center;
  display: flex;
  background-color: #fff;
  padding: 5px;
}
.TabControl-item{
  flex: 1;
  font-size: 14px;
}
.active{
  color: var(--color-high-text);
}
span{
  padding: 5px;
}
.TabControl-item.active span{
  border-bottom: 3px solid var(--color-tint);
}
</style>