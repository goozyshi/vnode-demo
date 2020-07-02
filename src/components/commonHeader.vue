<template>
  <header>
    <div class="l-content">
      <el-button type="text" icon="el-icon-menu" @click="triggerCollapse" style="color: #fff"></el-button>
      <!-- <el-breadcrumb style="display: inline-block; margin-left: 20px" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="currentIndex">封面</el-breadcrumb-item>
      </el-breadcrumb> -->
    </div>
    <div class="r-content">
      <el-dropdown trigger="click" size="mini">
        <span style="color: #fff" class="el-dropdown-link">
          <span style="margin-right: 5px">我的</span>
          <i class="el-icon-caret-bottom"/>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="$router.push('/')">个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>
<script>
export default {
  computed: {
    isCollapse () {
      return this.$store.state.isCollapse
    },
    currentIndex () {
      return this.$store.state.tab.currentIndex
    }
  },
  data () {
    return {}
  },
  methods: {
    triggerCollapse () {
      this.$store.commit('collapse-menu')
    },
    logOut () {
      this.$router.push('/login')
    }
  }
}
</script>
<style lang="scss" scoped>
  header {
    line-height: 60px;
    .l-content {
      float: left;
    }
    .r-content {
      float: right;
    }
  }
</style>
