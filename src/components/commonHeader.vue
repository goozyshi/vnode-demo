<template>
  <header>
    <div class="l-content">
      <el-button type="text" icon="el-icon-menu" @click="triggerCollapse" style="color: #fff"></el-button>
      <el-breadcrumb style="display: inline-block; margin-left: 20px" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="tab in breadcrumbList" :key="tab.path" :to="tab">
          {{ tab.name }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown trigger="click" size="mini">
        <span style="color: #fff" class="el-dropdown-link">
          <span style="margin-right: 5px">我的</span>
          <i class="el-icon-caret-bottom"/>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="refreshMe">个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>
<script>
import { getUserInfo } from '../config/http'
export default {
  computed: {
    isCollapse () {
      return this.$store.state.isCollapse
    },
    currentIndex () {
      return this.$store.state.tab.currentIndex
    },
    breadcrumbList () {
      return this.$store.state.breadcrumbList
    }
  },
  data () {
    return {}
  },
  methods: {
    triggerCollapse () {
      this.$store.commit('collapse-menu')
    },
    refreshMe () {
      getUserInfo({}).then()
    },
    logOut () {
      sessionStorage.removeItem('user_login_token')
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
      line-height: 60px;
      height: 60px;
      display: flex;
      align-items: center;
      /deep/ .el-breadcrumb__inner {
        color: #fff;
      }
    }
    .r-content {
      float: right;
    }
  }
</style>
