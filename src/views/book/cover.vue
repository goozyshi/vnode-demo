<template>
  <div>
    <el-input style="width: 30%" v-model="code" placeholder="请输入数字code" @input="i => icl(i)"></el-input>
    <div style="margin-top: 10px">
      <el-button type="primary" @click="$router.push({ path: '/detail', query: {code} })">跳转</el-button>
      <el-button type="text" @click="$router.push('/detail?code=1')">1</el-button>
      <el-button type="text" @click="$router.push('/detail?code=2')">2</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'coverKeep',
  data () {
    return {
      code: ''
    }
  },
  methods: {
    icl (i) {
      this.code = i.replace(/[^0-9]/g, '')
    }
  }
}
</script>

<style>

</style>
