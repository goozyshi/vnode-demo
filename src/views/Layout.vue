<template>
  <el-container >
    <el-aside width="auto" style="overflow: hidden">
      <common-menu></common-menu>
    </el-aside>
    <div style="width: 100%">
      <el-header style="background-color: #24292e">
        <common-header></common-header>
      </el-header>
      <el-main>
        <common-tab></common-tab>
      </el-main>
    </div>
  </el-container>
</template>
<script>
import commonMenu from '@/components/commonMenu'
import commonHeader from '@/components/commonHeader'
import commonTab from '@/components/commonTab'

export default {
  components: { commonMenu, commonHeader, commonTab },
  data () {
    return {
    }
  }
}
</script>
<style lang="scss" scoped>
  .el-menu-vertical-demo {
    width: 200px;
    height: 100vh;
  }
</style>
