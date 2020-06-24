<template>
  <div class="container">
    <login></login>
  </div>
</template>
<script>
import Login from '@/views/Login'
export default {
  components: { Login },
  data () {
    return {
      value: ''
    }
  }
}
</script>
<style lang="scss" scoped>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: center;
  }
</style>
