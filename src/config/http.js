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
    // todo: 请求携带token等
    return config
  }
)
// 返回拦截： token过期校验等
instance.interceptors.response.use(
  response => {
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
