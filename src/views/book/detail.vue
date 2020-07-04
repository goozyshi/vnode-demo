<template>
  <div>
    <h1>{{`标题${code}`}}</h1>
    <el-table
      :data="tableData"
      height="70vh"
      border
      style="width: 100%"
    >
      <el-table-column
        label="序号"
        type="index"
        width="55">
      </el-table-column>
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  computed: {
    code () {
      return this.$route.query?.code
    },
    tableData () {
      const count = (this.$route.query?.code || 0) - 0
      return new Array(count).fill({
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      })
    }
  },
  data () {
    return {
    }
  }
}
</script>
