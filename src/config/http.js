import axios from 'axios'
import url from './url'
import { Message } from 'element-ui'

// 初始化axios实例: 超时15s，基准地址
const instance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 15 * 1000
})
// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

// 请求拦截
instance.interceptors.request.use(
  config => {
    // 用 sessionStorage 存取 token 值
    // vuex 中 state 的值会在页面刷新后重置，不好用
    const token = sessionStorage.getItem('token') || ''
    if (!token) {
      // 没有token，请求获取后携带于请求头header['token]中
      return new Promise((resolve, reject) => {
        const AUTH_URL = 'https://www.baidu.com'
        const sign = 'db59af7ce14048acba1c9ea6e9ac1601' // 签名, 一般是 md5 转化后的哈希值
        axios.post(AUTH_URL, { sign }).then(res => {
          if (res.errorCode) {
            sessionStorage.setItem('token', res.data) // 存入token
            config.headers.token = res.data
            resolve(config)
          } else {
            Message.warning('网络错误，请重试')
            reject(new Error('获取token失败：' + res.errorMsg))
          }
        })
      })
    } else {
      config.headers.token = token
      return config
    }
  }
)
// 返回拦截： token过期校验等
instance.interceptors.response.use(
  response => {
    const { errorCode, errorMsg } = response.data
    // 假设-1的errorCode为token过期标识
    if (errorCode === '-1') {
      Message.warning('token已过期，请刷新重试')
      sessionStorage.removeItem('token')
      throw new Error(`token过期：${errorMsg}`)
    }
    return response
  },
  error => {
    Message.error('网络错误，请稍后再试')
    return Promise.reject(error)
  }
)

// GET | POST 方法
const _http = {
  get: (url, query) => instance.get(url, { params: query }),
  post: (url, params) => instance.post(url, params)
}

// 接口导出
export const getPosts = (params) => _http.get(url.getPosts, params)
export const postTodos = (params) => _http.post(url.postTodos, params)
