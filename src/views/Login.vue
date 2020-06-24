<template>
  <div>
    <h1>花里胡哨管理系统</h1>
    <el-form :model="userData" :rules="rules" ref="ruleForm">
      <el-form-item prop="userName">
        <el-input v-model="userData.userName"
          prefix-icon="el-icon-user"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="userData.password"
          prefix-icon="el-icon-lock"
          :type="isShow ? 'text' : 'password'"
          placeholder="请输入密码"
        >
          <i slot="suffix" class="el-input__icon el-icon-view"
            :style="{color: isShow ? '#409EFF' : '#dcdfe6'}"
            @click="isShow = !isShow"
          ></i>
        </el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" :loading="isLoging" @click="handleLogin">登录</el-button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isLoging: false,
      isShow: false,
      userData: {
        userName: 'admin',
        password: 'admin'
      },
      rules: {
        userName: [
          { required: true, message: '请输入用户', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleLogin () {
      const { userName, password } = this.userData
      this.$message.warning(`用户名： ${userName}; 密码：${password}`)
      this.isLoging = true
      setTimeout(() => {
        this.isLoging = false
      }, 2000)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
