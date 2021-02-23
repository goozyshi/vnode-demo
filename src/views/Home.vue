<template>
  <div>
    <h2>用户信息</h2>
    <el-avatar size="medium" :src="userInfo.avatar"></el-avatar>
    <el-form>
      <el-form-item label="姓名">{{userInfo.username}}</el-form-item>
      <el-form-item label="id">{{userInfo.id}}</el-form-item>
      <el-form-item label="昵称">{{userInfo.nickname}}</el-form-item>
    </el-form>
    </div>
</template>
<script>
import { getUserInfo } from '@/config/http'

export default {
  data () {
    return {
      poetryContent: '',
      userInfo: {}
    }
  },
  created () {
    this.request()
  },
  methods: {
    async request () {
      getUserInfo().then(({ data: res }) => {
        console.log(res, '====')
        this.userInfo = res.data || {}
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
