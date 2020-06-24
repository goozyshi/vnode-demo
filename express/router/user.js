const express = require('express')

const userRouter = express.Router()

userRouter.get('/info', (req, res, next) => {
  res.json('this is userRouter')
})

module.exports = userRouter
