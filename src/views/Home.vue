<template>
  <div>
    <el-avatar :size="100" :src="userInfo.avatar"></el-avatar>
    <h1 >
      <span style="color: #c39b5e;">{{userInfo.nickname}}</span>
      ·{{roleOptions[userInfo.role]}}
    </h1>
    <p>{{userInfo.remark || ''}}</p>
    </div>
</template>
<script>
import { getUserInfo } from '@/config/http'

export default {
  data () {
    return {
      roleOptions: {
        admin: '管理员',
        guest: '游客'
      },
      userInfo: {}
    }
  },
  created () {
    this.request()
  },
  methods: {
    async request () {
      getUserInfo().then(({ data: res }) => {
        this.userInfo = res.data || {}
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
