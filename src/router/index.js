import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout.vue'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  // 路由出错不打印：例如重复路由跳转
  return originalPush.call(this, location).catch(err => err)
}

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
      }
    ]
  },
  {
    path: '/book',
    name: '书籍',
    component: Layout,
    redirect: '/cover',
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
      },
      {
        path: '/detail',
        name: '详情页',
        component: () => import('../views/book/detail.vue')
      }
    ]
  },
  {
    path: '/other',
    name: '其他',
    label: '其他',
    redirect: '/about',
    component: Layout,
    children: [
      {
        path: '/about',
        name: '关于',
        component: () => import('../views/About.vue')
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
