<template>
  <header>
    <div class="l-content">
      <a href="#"> <i class="el-icon-menu" style="color: #fff" @click="triggerCollapse"></i> </a>
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
    }
  },
  data () {
    return {}
  },
  methods: {
    triggerCollapse () {
      this.$store.commit('collapseMenu')
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
