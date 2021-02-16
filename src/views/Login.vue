<template>
  <div class="container--login">
    <h1 style="text-align: center">花栗鼠管理系统</h1>
    <el-form :model="userData" :rules="rules" ref="ruleForm">
      <el-form-item prop="userName">
        <el-input v-model="userData.userName" ref="login-usr"
          prefix-icon="el-icon-user"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="userData.password" ref="login-pwd"
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
    <el-button type="primary" @click="handleLogin" style="width: 100%">登录</el-button>
  </div>
</template>
<script>
import { loginExpServer, getUserInfo } from '@/config/http'
export default {
  watch: {
    isShow: {
      handler (val) {
        this.$nextTick(() => {
          val && this.$refs['login-pwd'].focus()
        })
      }
    }
  },
  data () {
    return {
      isCaps: false, // 是否大写
      isShow: false,
      userData: {
        userName: 'admin',
        password: ''
      },
      rules: {
        userName: [
          { required: true, message: '请输入用户', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.$store.commit('clear-tab')
    this.$nextTick(() => {
      // 字段为空自动聚焦
      !this.userData.password && this.$refs['login-pwd'].focus()
      !this.userData.userName && this.$refs['login-usr'].focus()
    })
  },
  methods: {
    handleLogin () {
      const { userName, password } = this.userData
      loginExpServer({ userName, password }).then(({ data: res }) => {
        if (res.errorCode === 0) {
          this.$router.push('/')
          this.$message.success('登录成功')
          getUserInfo({ userName }).then()
        } else {
          this.$message.error(res.errorMsg)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .container--login {
    width: 400px;
    margin-bottom: 200px;
  }
</style>
