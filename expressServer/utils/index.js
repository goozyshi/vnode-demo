const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const { PRIVATE_KEY } = require('./constant')
const md5 = (str) => crypto.createHash('md5').update(String(str)).digest('hex')

const decodeJWT = (req) => {
  const authorization = req.get('Authorization')
  let token = ''
  if (authorization.indexOf('Bearer') >= 0) {
    token = authorization.replace('Bearer ', '')
  } else {
    token = authorization
  }
  return jwt.verify(token, PRIVATE_KEY)
}

module.exports = {
  md5,
  decodeJWT
}