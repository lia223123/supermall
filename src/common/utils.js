export  function
//防抖函数
debounce(func,delay){
  let timer = null
  return function (...args){
    if(timer) clearTimeout(timer)
    timer = setTimeout(()=>{
      func.apply(this,args)
    },delay)
  }
}