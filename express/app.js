// 中间件
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())

// 注册路由
const Router = require('./router/router')
app.get('/', (req, res) => {
  res.send('欢迎来到wzry')
})
app.use(Router)
app.get('/error', (req, res) => {
  throw new Error('something error')
})

// 异常处理
const errorHandler = (err, req, res, next) => {
  console.log(`errorHandler: ${err}`)
  res.status(500)
  res.send('服务器正在维护……')
}
app.use(errorHandler)

// 服务器监听
const server = app.listen(5000, () => {
  const { address, port } = server.address()
  console.log(`express server is runing at ${address}:${port}`)
})