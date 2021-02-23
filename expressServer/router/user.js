const express = require('express')
const jwt = require('jsonwebtoken')
const userRouter = express.Router()
const Result = require('../models/index')
const { PWD_KEY, PRIVATE_KEY, JWT_EXPIRE } = require('../utils/constant')
const { md5, decodeJWT } = require('../utils/index')
const {sql_login, sql_getInfo} = require('../services/user_sql')

userRouter.post('/login', (req, res) => {
  let {userName, password} = req.body // body-parser 解析
  password = md5(`${password + PWD_KEY}`)
  sql_login(userName, password).then(user => {
    if (!user || user.length === 0) {
      new Result(null, '登录失败！请检查用户名和密码').fail(res)
    } else {
      // 生成 token
      const token = jwt.sign(
        { userName },
        PRIVATE_KEY,
        { expiresIn: JWT_EXPIRE } // 过期时间
      )
      new Result({token}, '登录成功！').success(res)
    }
  })
})

userRouter.get('/info', (req, res) => {
  const decoded = decodeJWT(req)
  if (decoded && decoded.userName) {
    sql_getInfo(decoded.userName).then(info => {
      if (!info || info.length === 0) {
        new Result(null, '查询用户信息失败').fail(res)
      } else {
        new Result(info, '查询成功').success(res)
      }
    })
  } else {
    new Result('用户信息解析失败').fail(res)
  }
})

module.exports = userRouter