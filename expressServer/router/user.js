const express = require('express')
const userRouter = express.Router()
const Result = require('../models/index')

const {sql_login, sql_getInfo} = require('../services/user_sql')

userRouter.post('/login', (req, res) => {
  const {userName, password} = req.body // body-parser 解析
  sql_login(userName, password).then(user => {
    console.log(user)
    if (!user || user.length === 0) {
      new Result(user, '登录失败，查询不到该用户').fail(res)
    } else {
      new Result(user, '登录成功！').success(res)
    }
  })
})

userRouter.get('/info', (req, res) => {
  let { userName } = req.query
  console.log(userName, '.....')
  sql_getInfo(userName).then(info => {
    if (!info || info.length === 0) {
      new Result(null, '查询用户信息失败').fail(res)
    } else {
      new Result(info, '查询成功').success(res)
    }
  })
})

module.exports = userRouter