const express = require('express')
const router = express.Router()
const userRouter = require('./user')
const Result = require('../models/index')
// const jwtAuth = require('./jwt')
const boom = require('boom')

// router.use(jwtAuth)

router.get('/', (req, res) => {
  res.send(`欢迎来到对抗路`)
})

router.use('/user', userRouter)

router.use((err, req, res, next) => {
  if (err.name === 'TokenExpiredError') {
    new Result(null, 'token失效', {
      error: err.status,
      errorMsg: err.name
    }).expired(res.status(err.status || 200))
  } else {
    new Result(null, '系统错误', {
      errorMsg: err.name,
      error: err.status || 500
    })
  }
})

// 使用 boom 中间件处理异常路由
router.use((req, res, next) => {
  next(boom.notFound(`接口不存在哦`))
})

module.exports = router
