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
    <div class="menu-title">
      <img class="logo" src="https://img.icons8.com/color/96/000000/avengers.png"/>
      <h4 v-show="!isCollapse">花栗鼠后台管理系统</h4>
    </div>
    <template v-for="(item, index) in menuData">
      <!-- <div v-if="" :key="index"> -->
        <!-- 不含子菜单 -->
        <el-menu-item v-if="!item.hidden && !item.children" :index="item.path" @click="clickMenu(item)" :key="index">
          <i :class="item.icon"></i>
          <span slot="title">{{item.label}}</span>
        </el-menu-item>
        <!-- 含子菜单 -->
        <el-submenu v-if="!item.hidden && item.children && item.children.length" :index="index+''" :key="index">
          <template slot="title">
            <i :class="item.icon"></i>
            <span slot="title">{{item.label}}</span>
          </template>
          <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" @click="clickMenu(child)">
            <span slot="title">{{child.label}}</span>
          </el-menu-item>
        </el-submenu>
      <!-- </div> -->
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
  mounted () {
    this.initRouteTab()
  },
  methods: {
    initRouteTab () {
      // 刷新时保留首页和当前页，首页在最前面
      this.$store.commit('add-tab', { route: '/', name: '首页' })
      if (this.$route.path !== '/') {
        this.$store.commit('add-tab', { route: this.$route.path, name: this.$route.name })
      }
      this.$store.commit('set-index', this.$route.path)
    },
    clickMenu (item) {
      this.$router.push({ path: item.path })
    }
  },
  data () {
    return {
      defaultOpenProps: ['1'],
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
.el-menu-vertical-demo {
  width: 200px;
  height: 100vh
}
.el-menu {
  border: none;
  .menu-title {
    display: flex;
    align-items: center;
    color: #fff;
    height: 60px;
    line-height: 60px;
    margin: 0 auto;
    padding: 0 20px;
    .logo {
      height: 32px;
      width: 32px;
    }
  }
}
</style>
