<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  watch: {
    $route (to, from) {
      const token = sessionStorage.getItem('user_login_token')
      const redirect = to.fullPath || '/'
      if (to.path !== '/login' && !token) {
        this.$router.push({ path: '/login', query: { redirect } })
      }
    }
  }
}
</script>

<style lang="scss">
html, body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
::-webkit-scrollbar, ::-webkit-scrollbar-thumb {
  width: 10px;
  height: 10px;
  border-radius: 8px;
}
::-webkit-scrollbar-thumb {
  background-color: #dfe6eb;
}
</style>
