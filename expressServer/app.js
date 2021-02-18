const express = require('express')
const app = express()
const router = require('./router')
const cors = require('cors')
const bodyParser = require('body-parser')


// 中间件
app.use(cors())
app.use(bodyParser.json())
app.use('/', router)

// 启动服务, 监听 5000 端口
const server = app.listen(5000, () => {
  let {address, port} = server.address()
  if (address === '::') {
    address = 'localhost'
  }
  console.log(`express server is running on http://${address}:${port}`)
})