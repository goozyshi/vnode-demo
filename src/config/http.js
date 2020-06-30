// 第三方中间件引入、部分所需组件
import url from './url'
import axios from 'axios'
// import { Message } from 'element-ui' // element消息组件，用于请求|返回时接口提示

// 初始化
// axios实例、基准地址、超时限制、请求头（一般post）
const instance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com' || process.env.baseURL,
  timeout: 15 * 1000
})
instance.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

// 封装 GET | POST 方法
const _http = {
  get: (url, query) => instance.get(url, { params: query }),
  post: (url, params) => instance.post(url, params)
}

// 接口导出
export const getPoetry = (params) => _http.get(url.getPoetry, params)
