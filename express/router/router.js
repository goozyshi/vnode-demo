const express = require('express')
const boom = require('boom')
const userRouter = require('./user')
const { CODE_ERROR } = require('../util/constant')
// 注册路由
const router = express.Router()

router.get('/', (req, res) => {
  res.send('欢迎来到router.js')
})
// user 路由
router.use('/user', userRouter)

// 异常处理
// boom中间件处理404错误
router.use((req, res, next) => {
  console.log(req.host)
  const interfaceMsg = `接口${req.originalUrl}不存在`
  next(boom.notFound(interfaceMsg))
})
// 自定义处理异常
router.use((err, req, res, next) => {
  const { message, output: { statusCode, payload: { error } } } = err
  const msg = message || '服务器出现错误'
  const status = statusCode || 500
  const errorMsg = error || message
  res.status(status).json({
    code: CODE_ERROR,
    msg,
    status,
    errorMsg
  })
})

module.exports = router
