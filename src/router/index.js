import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: '登录',
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
        name: '首页',
        component: () => import('../views/Home.vue')
      },
      {
        path: '/about',
        name: '关于',
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
        name: '封面',
        component: () => import('../views/book/cover.vue')
      },
      {
        path: '/codex',
        name: '附录',
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
