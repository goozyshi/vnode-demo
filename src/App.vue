<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
body {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #24292e;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
