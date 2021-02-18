const mysql = require('mysql')
const {host, user, password, database} = require('./config')
const {DEBUG_MODE: debug} = require('../utils/constant')

const connect = () => mysql.createConnection({host, user, password, database})

const querySQL = sql => {
  const myConnect = connect()
  debug && console.log(sql)
  return new Promise((resolve, reject) => {
    try {
      myConnect.query(sql, (err, res) => {
        if (err) {
          debug && console.log(`查询失败：${JSON.stringify(err)}`)
          reject(err)
        } else {
          debug && console.log(`查询成功`)
          resolve(res)
        }
      })
    } catch(e) {
      reject(e)
    } finally {
      // 使用完毕后需要调用 end 关闭连接，否则内存泄漏
      myConnect.end()
    }
  })
}

module.exports = {
  querySQL
}