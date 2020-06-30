<template>
  <div>
    <el-tabs v-if="visitedTabs.length"
      v-model="currentIndex"
      type="card"
      closable
      @tab-click="tabClick"
      @tab-remove="tabRemove"
      >
      <el-tab-pane v-for="item in visitedTabs"
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

</style>
