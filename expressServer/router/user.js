const express = require('express')
const userRouter = express.Router()
const Result = require('../models/index')
const { PWD_KEY } = require('../utils/constant')
const { md5 } = require('../utils/index')

const {sql_login, sql_getInfo} = require('../services/user_sql')

userRouter.post('/login', (req, res) => {
  let {userName, password} = req.body // body-parser 解析
  password = md5(`${password + PWD_KEY}`)
  console.log(password)
  sql_login(userName, password).then(user => {
    console.log(user)
    if (!user || user.length === 0) {
      new Result(null, '登录失败！请检查用户名和密码').fail(res)
    } else {
      const token = 'sdazcxzczxc'
      new Result({token}, '登录成功！').success(res)
    }
  })
})

userRouter.get('/info', (req, res) => {
  let { userName } = req.query
  sql_getInfo(userName).then(info => {
    if (!info || info.length === 0) {
      new Result(null, '查询用户信息失败').fail(res)
    } else {
      new Result(info, '查询成功').success(res)
    }
  })
})

module.exports = userRouter