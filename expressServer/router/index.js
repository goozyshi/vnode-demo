const express = require('express')
const router = express.Router()
const userRouter = require('./user')
const boom = require('boom')

router.get('/', (req, res) => {
  res.send(`欢迎来到对抗路`)
})

router.use('/user', userRouter)

// 使用 boom 中间件处理异常路由
router.use((req, res, next) => {
  next(boom.notFound(`接口不存在哦`))
})

module.exports = router
