import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'  
import login from '@/views/login'


Vue.use(VueRouter)

const routers = [
  {
    path: '/',
    redirect: '/home'
  },

  {
    path: '/login',
    component: login
  },

  {
    path: '/home',
    component: Home
  }
];

const router = new VueRouter({
  routers
})

export default router 