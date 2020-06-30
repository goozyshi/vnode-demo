<template>
  <div>
    <h2>{{poetryContent}}</h2>
    <el-tag effect="dark">今日</el-tag>
    </div>
</template>
<script>
import { getPoetry } from '@/config/http'

export default {
  data () {
    return {
      poetryContent: ''
    }
  },
  created () {
    this.request()
  },
  methods: {
    async request () {
      const [poetryRes, poetryErr] = await this.$defer(getPoetry())
      if (poetryErr) throw new Error('获取今日诗词API接口失败')
      console.log(poetryRes.data)
      // 试下vue的新写法
      this.poetryContent = poetryRes?.data?.data?.content
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
