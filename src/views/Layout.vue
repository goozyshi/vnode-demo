<template>
  <el-container>
    <el-aside width="auto">
      <common-menu></common-menu>
    </el-aside>
    <div class="app-main">
      <el-header class="app-header">
        <common-header></common-header>
      </el-header>
      <el-main class="app-wrap">
        <common-tab-view></common-tab-view>
      </el-main>
    </div>
  </el-container>
</template>
<script>
import commonMenu from '@/components/commonMenu'
import commonHeader from '@/components/commonHeader'
import commonTabView from '@/components/commonTabView'

export default {
  components: { commonMenu, commonHeader, commonTabView },
  data () {
    return {}
  }
}
</script>
<style lang="scss" scoped>
  .app-main {
    display: flex;
    flex: 1;
    flex-shrink: 0;
    flex-direction: column;
    height: 100vh;
    .app-header {
      background-color: #24292e;
    }
    .app-wrap {
      padding: 5px;
    }
  }
</style>
