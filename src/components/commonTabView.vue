<template>
  <div style="height: 100%;">
    <el-tabs v-if="tabOptions.length"
      class="content-wrap"
      v-model="currentIndex"
      type="border-card"
      @tab-click="tabClick"
      @tab-remove="tabRemove"
      >
      <el-tab-pane v-for="item in tabOptions"
        :closable="item.route !== '/'"
        :key="item.route"
        :label="item.name"
        :name="item.route"
      >
      <!-- routeView若写在 el-tab-pane 标签内，则标签创建时都会声明一个特定的routeview -->
      <!-- 这样，3个标签时则触发3次route-view的生命周期方法 -->
      <!-- 缓存组件 name 以 Keep 结尾的组件 -->
      <transition name="fade" mode="out-in">
        <keep-alive :include="/Keep$/">
          <router-view></router-view>
        </keep-alive>
      </transition>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
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
        this.getBreadCrumb(this.$route)
        return this.$store.state.tab.currentIndex
      },
      set (index) {
        this.$store.commit('set-index', index)
        this.getBreadCrumb(this.$route)
      }
    }
  },
  data () {
    return {}
  },
  methods: {
    tabClick (tab) {
      this.$router.push({ path: this.currentIndex })
    },
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
    },
    getBreadCrumb (route) {
      // 获取路由路径面包屑
      let matchList = route.matched.filter(m => m.path && m.name)
      if (matchList[0].path !== '/') {
        matchList = [{ path: '/', name: '首页' }].concat(matchList)
      }
      // const filter = matchList.filter(item => item.meta && item.meta)
      this.$store.commit('set-breadcrumb', matchList)
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
