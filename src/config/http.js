import url from './url'
import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import router from '../router/index'

const instance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com' || process.env.baseURL,
  timeout: 5 * 1000
})
instance.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

// 请求拦截
instance.interceptors.request.use(
  config => {
    // 如果存在 token 则附带在 http header 中
    const token = sessionStorage.getItem('user_login_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 返回拦截
instance.interceptors.response.use(
  response => {
    const res = response.data
    if (res.errorCode === 0) {
      return response
    }
    if (res.errorCode === -2) {
      // token 过期
      MessageBox.confirm('Token 已失效，请重新登录', '通知', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        router.push('/login')
      })
    }
    return response
  },
  error => {
    let message = error.message || '请求失败'
    if (error.response && error.response.data) {
      const { data } = error.response
      message = data.msg
    }
    Message({
      message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

// 封装 GET | POST 方法
const _http = {
  get: (url, query) => instance.get(url, { params: query }),
  post: (url, params) => instance.post(url, params)
}

// 接口导出
export const getPoetry = (params) => _http.get(url.getPoetry, params)
export const loginExpServer = params => _http.post(url.postLogin, params)
export const getUserInfo = (params) => _http.get(url.getUserInfo, params)
