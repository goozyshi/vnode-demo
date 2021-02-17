const express = require('express')
const userRouter = express.Router()

userRouter.post('/login', (req, res) => {
  const {userName, password} = req.body
  console.log(userName, password, '-----')
  res.send(`登录成功`)
})

userRouter.get('/info', (req, res) => {
  res.send(`用户信息`)
})

module.exports = userRouter