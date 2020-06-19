<template>
  <div class="hello">
    <el-button type="primary" @click="request">发起请求</el-button>
  </div>
</template>

<script>
import { getPosts, postTodos } from '@/config/http'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },

  data () {
    return {
      loading: false
    }
  },
  created () {
    this.$on(['getName', 'getAge'], (res) => console.log('1: ', res))
    this.$on('getName', (res) => console.log('2 : ', res))
  },
  methods: {
    handleName () {
      this.$emit('getName', { name: 'ds', age: 2 })
    },
    handleAge () {
      this.$emit('getAge', { name: 'ds', age: 2 })
    },
    async request () {
      const [postRes, postErr] = await this.$defer(getPosts())
      console.log(postRes, postErr)
      // if (postErr) throw new Error('获取post失败')
      postTodos({ todo: 1 }).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
