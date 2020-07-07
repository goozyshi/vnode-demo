# 后台管理系统——动态tabs 实现SPA

> [【源码】https://github.com/goozyshi/vnode-demo](https://github.com/goozyshi/vnode-demo)

## 效果预览

![tabs](https://cdn.nlark.com/yuque/0/2020/gif/608421/1594087437335-54bbb1ec-a9dc-4b4d-b782-34b602396cc7.gif)

## 核心思路

> 这里的tabs可以理解为nav的另一种展现形式而已，其实说白了都是一个个router-link。
>
> 点击侧边栏的时候手动在vuex里面维护一个队列 前端再v-for 渲染出来而已。
>
> ——[【花裤衩】](https://segmentfault.com/u/panjiachen)

### 全局维护tabOptions

vuex实例中，创建一个 `tabOptions数组`，用于保存已打开的标签页。

默认保留【首页】，tabOptions 初始值为`[{route: '/', name: '首页'}]`

`currentIndex `则用来匹配当前路由所打开的tab标签。

用户退出时需清空数组。

```js
import { ADD_TAB, DELETE_TAB, SET_INDEX, CLEAR_TAB } from './mutations-type'
export default {
  nameSpace: true,
  state: {
    tabOptions: [{ route: '/', name: '首页' }],
    currentIndex: '/',
    breadcrumbList: []
  },
  mutations: {
    // 添加标签
    [ADD_TAB] (state, data) {
      state.tabOptions.push(data)
    },
    // 删除标签
    [DELETE_TAB] (state, route) {
      const index = state.tabOptions.findIndex(op => op.route === route)
      state.tabOptions.splice(index, 1)
    },
    // 激活标签
    [SET_INDEX] (state, index) {
      state.currentIndex = index
    },
    // 清空标签
    [CLEAR_TAB] (state) {
      state.tabOptions = []
    }
  },
  actions: {}
}

```

###  实现commonTabView组件

**template**

el-tab-pane 标签公用一个route-view视图，

`keep-alive` 加` include规则 `并对视图进行动态缓存。

需要缓存的页面，在其组件name以`Keep`结尾即可，如coverKeep。

```html
<template>
  <div style="height: 100%;">
    <el-tabs v-if="tabOptions.length"
      class="content-wrap"
      v-model="currentIndex"
      type="border-card"
      @tab-click="tabClick"
      @tab-remove="tabRemove"
      >
      <!-- 路由为'/'时不可关闭标签 -->
      <el-tab-pane v-for="item in tabOptions"
        :closable="item.route !== '/'"
        :key="item.route"
        :label="item.name"
        :name="item.route"
      ></el-tab-pane>
      <!-- 缓存组件 name 以 Keep 结尾的组件 -->
      <transition name="fade" mode="out-in">
        <keep-alive :include="/Keep$/">
          <router-view></router-view>
        </keep-alive>
      </transition>
    </el-tabs>
  </div>
</template>
```

**script**

对路由进行监听，

并对路由实现全匹配(`/detail?code=1 `和`/detail?code=2`为不同的页面），

根据路由`添加|激活`标签。

全匹配（/detail?code=1）：`路由fullPath` ； 不完全匹配（/detail）： `路由path`

实现tab标签点击、移除事件。

```js
<script>
export default {
  // immediate立即监听路由，进入页面即可触发监听事件
  watch: {
    $route: {
      immediate: true,
      handler (to) {
        const flag = this.tabOptions.findIndex(op => op.route === to.fullPath) > -1
        !flag && this.$store.commit('add-tab', { route: to.fullPath, name: to.name })
        this.$store.commit('set-index', to.fullPath)
      }
    }
  },
  computed: {
    tabOptions () {
      return this.$store.state.tab.tabOptions
    },
    currentIndex: {
      get () {
        return this.$store.state.tab.currentIndex
      },
      set (index) {
        this.$store.commit('set-index', index)
      }
    }
  },
  data () {
    return {}
  },
  methods: {
    // 点击tab
    tabClick (tab) {
      this.$router.push({ path: this.currentIndex })
    },
    // 移除tab
    tabRemove (tabName) {
      if (tabName === '/') {
        return
      }
      this.$store.commit('delete-tab', tabName)
      if (this.currentIndex === tabName) {
        if (this.tabOptions && this.tabOptions.length) {
          this.$store.commit('set-index', this.tabOptions[this.tabOptions.length - 1].route)
          this.$router.replace({ path: this.currentIndex })
        } else {
          this.$router.replace({ path: '/' })
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .content-wrap {
    height: 100%;
    padding: 0;
    overflow: hidden;
    /deep/ .el-tabs__content {
      overflow: scroll;
      height: 100%;
    }
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: all .2s ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }
</style>
```

### 左侧菜单栏

由于设置了路由监听，左侧菜单栏点击事件只需进行正常的路由跳转即可。

```js
// commonMenu.js   
clickMenu (item) {
    this.$router.push({ path: item.path })
}
```

## 面包屑导航

>  面包屑导航实现关键是 `this.$route.matched` 属性，它是一个数组，记录了路由的匹配过程。

vux 维护一个全局数组用来保存当前路由

```js
export default new Vuex.Store({
  state: {
    breadcrumbList: []
  },
  mutations: {
    [SET_BREADCRUMB] (state, data) {
      state.breadcrumbList = [...data]
    }
  }
})
```

将路由与面包屑映射

```js
    getBreadCrumb (route) {
      // 过滤掉空path、name的路由
      let matchList = route.matched.filter(m => m.path && m.name)
      // 添加保持首页在最前面
      if (matchList[0].path !== '/') {
        matchList = [{ path: '/', name: '首页' }].concat(matchList)
      }
      this.$store.commit('set-breadcrumb', matchList)
    }
```

渲染面包屑

```html
      <el-breadcrumb style="display: inline-block; margin-left: 20px"
                     separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="tab in breadcrumbList" :key="tab.path" :to="tab">
          {{ tab.name }}
        </el-breadcrumb-item>
      </el-breadcrumb>
```



## 遇坑填坑

### 1. 切换tab多次请求，次数和tab数量一致

【错误示范】

routeView若写在 el-tab-pane 标签内，则标签创建时都会声明一个特定的routeview。

这样，3个标签时则触发3次route-view的生命周期方法。

【TODO: 解释的不太好，后面遇到应该更新】

```html
<el-tabs>
  <el-tab-pane v-for="item in tabOptions"
    :closable="item.route !== '/'"
    :key="item.route"
    :label="item.name"
    :name="item.route"
  >
    <router-view></router-view>
  </el-tab-pane>
</el-tabs>
```

【正确写法】

让el-tab-pane公用一个tab内容进行展示。

```html
<el-tabs>
  <el-tab-pane v-for="item in tabOptions"
    :closable="item.route !== '/'"
    :key="item.route"
    :label="item.name"
    :name="item.route"
  ></el-tab-pane>
  <router-view></router-view>
</el-tabs>
```





### 2. 多次点击同一tab，控制台报错

这是由于没有处理路由跳转报错的原因（本例tab点击采用`push方式`）。

```js
// 单独处理异常
this.$router.push('/').catch(err => err)
```

或者全局设置【推荐】

在引入router时，统一处理push | repalce的错误

```js
import VueRouter from 'vue-router'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  // 路由出错不打印：例如重复路由跳转
  return originalPush.call(this, location).catch(err => err)
}
```

### 3. 监听的路由初始化时没有触发，须在生命周期手动触发

- handler方法和immediate属性

```js
  watch: {
    $route: {
      immediate: true,
      handler (to) {
        const flag = this.tabOptions.findIndex(op => op.route === to.fullPath) > -1
        !flag && this.$store.commit('add-tab', { route: to.fullPath, name: to.name })
        this.$store.commit('set-index', to.fullPath)
      }
    }
  },
```

初始化`tabOptions`保留首页

```js
tabOptions: [{ route: '/', name: '首页' }]
```

