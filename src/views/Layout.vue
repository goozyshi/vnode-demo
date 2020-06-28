<template>
  <el-container >
    <el-aside width="auto" style="overflow: hidden">
      <common-aside></common-aside>
    </el-aside>
  <div style="width: 100%">
    <el-header style="background-color: #24292e">
      <common-header></common-header>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </div>
  </el-container>
</template>
<script>
import commonAside from '@/components/commonAside'
import commonHeader from '@/components/commonHeader'
export default {
  components: { commonAside, commonHeader },
  computed: {
    isCollapse () {
      return this.$store.state.isCollapse
    }
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
  .el-menu-vertical-demo {
    width: 200px;
    height: 100vh;
  }
</style>
