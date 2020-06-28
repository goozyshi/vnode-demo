<template>
  <el-menu
    :collapse="isCollapse"
    :default-active="$route.path"
    :default-openeds="defaultOpenProps"
    class="el-menu-vertical-demo"
    style="width: 100%"
    background-color="#24292e"
    text-color="#fff"
    active-text-color="#ffd04b"
    :collapse-transition="false"
  >
    <h3 style="color: #fff">
      <img class="logo" src="https://img.icons8.com/color/96/000000/avengers.png"/>
      <h4 v-show="!isCollapse" style="color: #fff">花栗鼠后台管理系统</h4>
    </h3>
    <template v-for="(item, index) in menuData">
      <div v-if="!item.hidden" :key="index">
        <!-- 不含子菜单 -->
        <el-menu-item v-if="!item.children" :index="item.path" @click="clickMenu(item)">
          <i :class="item.icon"></i>
          <span slot="title">{{item.label}}</span>
        </el-menu-item>
        <!-- 含子菜单 -->
        <el-submenu v-if="item.children && item.children.length" :index="index+''">
          <template slot="title">
            <i :class="item.icon"></i>
            <span slot="title">{{item.label}}</span>
          </template>
          <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" @click="clickMenu(child)">
            <span slot="title">{{child.label}}</span>
          </el-menu-item>
        </el-submenu>
      </div>
    </template>
  </el-menu>
</template>
<script>
export default {
  computed: {
    isCollapse () {
      // 从vuex中获取
      return this.$store.state.isCollapse
    }
  },
  methods: {
    clickMenu (item) {
      this.$router.push({ path: item.path })
    }
  },
  data () {
    return {
      defaultOpenProps: ['2'],
      menuData: [
        {
          path: '/',
          name: 'Home',
          label: '首页',
          icon: 'el-icon-s-home'
        },
        {
          path: '/book',
          name: 'book',
          label: '书籍',
          icon: 'el-icon-reading',
          children: [
            { path: '/cover', name: 'cover', label: '封面' },
            { path: '/codex', name: 'codex', label: '附录' }
          ]
        },
        {
          path: '/other',
          name: 'other',
          label: '其他',
          icon: 'el-icon-magic-stick',
          children: [
            { path: '/about', name: 'about', label: '关于' }
          ]
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.el-menu {
  height: 100%;
  border: none;
  h3 {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    height: 60px;
    line-height: 60px;
    margin: 0 auto;
    padding: 0 25px;
    .logo {
      height: 32px;
      width: 32px;
    }
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
