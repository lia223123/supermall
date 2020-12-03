import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const home = () => import('../views/home/Home')
const category = () => import('../views/category/Category')
const cart = () => import('../views/cart/Cart')
const profile = () => import('../views/profile/Profile')
const detail = () => import('../views/detail/Detail')
const routes = [
  {
    path:'',
    redirect:'home'
  },
  {
    path:'/home',
    component:home
  },
  {
    path:'/category',
    component:category
  },
  {
    path:'/profile',
    component:profile
  },
  {
    path:'/cart',
    component:cart
  },
  {
    path:'/detail/:iid',
    component:detail
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
