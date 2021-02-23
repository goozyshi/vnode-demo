// 封装 Result 响应返回
const { ERROR_CODE, SUCCESS_CODE, TOKEN_EXPIRE_CODE } = require('../utils/constant')

class Result {
  constructor (data = null, msg = '请求成功 OK', options) {
    this.code = SUCCESS_CODE
    this.msg = msg
    this.data = data
    this.options = options
  }
  expired (res) {
    this.code = TOKEN_EXPIRE_CODE
    this.json(res)
  }
  success (res) {
    this.code = SUCCESS_CODE
    this.json(res)
  }
  fail (res) {
    this.code = ERROR_CODE
    this.json(res)
  }
  json (res) {
    res.json(this.createJSON())
  }
  createJSON () {
    let base = {
      data: this.data,
      errorCode: this.code,
      errorMsg: this.msg
    }
    base = Object.assign(base, {... this.options})
    return base
  }
}

module.exports = Result