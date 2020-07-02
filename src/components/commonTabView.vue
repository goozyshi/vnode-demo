<template>
  <div style="height: 100%;">
    <el-tabs v-if="visitedTabs.length"
      class="content-wrap"
      v-model="currentIndex"
      type="border-card"
      @tab-click="tabClick"
      @tab-remove="tabRemove"
      >
      <el-tab-pane v-for="item in visitedTabs"
        :closable="item.route !== '/'"
        :key="item.route"
        :label="item.name"
        :name="item.route"
      >
        <router-view></router-view>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
// TODO: 切换tab时存在多次请求
export default {
  watch: {
    '$route' (to) {
      let flag = false
      for (const op of this.visitedTabs) {
        if (op.route === to.path) {
          flag = true
          this.$store.commit('set-index', to.path)
          break
        }
      }
      if (!flag) {
        this.$store.commit('add-tab', { route: to.path, name: to.name })
        this.$store.commit('set-index', to.path)
      }
    }
  },
  computed: {
    isCollapse () {
      return this.$store.state.isCollapse
    },
    visitedTabs () {
      console.log(this.$store.state.tab.visitedTabs)
      return this.$store.state.tab.visitedTabs
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
    return {

    }
  },
  methods: {
    tabClick (tab) {
      const isSamePath = location.pathname === this.currentIndex
      !isSamePath && this.$router.replace({ path: this.currentIndex })
    },
    tabRemove (tabName) {
      if (tabName === '/') {
        return
      }
      this.$store.commit('delete-tab', tabName)
      if (this.currentIndex === tabName) {
        if (this.visitedTabs && this.visitedTabs.length) {
          this.$store.commit('set-index', this.visitedTabs[this.visitedTabs.length - 1].route)
          this.$router.replace({ path: this.currentIndex })
        } else {
          this.$router.replace({ path: '/' })
        }
      }
      console.log(tabName)
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
</style>
