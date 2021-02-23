
const { querySQL, queryOne } = require('../database/index')

// 查询用户登录信息
const sql_login = (username, password) => {
  const sql = `select * from login_user where username = '${username}' and password = '${password}'`
  return querySQL(sql)
}

// sql 查询获取用户信息
const sql_getInfo = (username) => {
  const sql = `select id, role, nickname, username, avatar, remark from login_user where username = '${username}'`
  return queryOne(sql)
}

module.exports = {
  sql_login,
  sql_getInfo
}