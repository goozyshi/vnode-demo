import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    children: [
      // 子标签页都需要放到统一的父组件内
      {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue')
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('../views/About.vue')
      }
    ]
  },
  {
    path: '/book',
    name: 'book',
    component: Layout,
    children: [
      // 子标签页都需要放到统一的父组件内
      {
        path: '/cover',
        name: 'cover',
        component: () => import('../views/book/cover.vue')
      },
      {
        path: '/codex',
        name: 'codex',
        component: () => import('../views/book/codex.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
