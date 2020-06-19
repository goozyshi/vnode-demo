import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$defer = (promise) => {
  return promise
    .then(data => ([data, undefined]))
    .catch(error => Promise.resolve([undefined, error]))
}

// $defer 函数接受一个 Promise 对象作为参数，并总是 resolve 它，以 [data | undefined, undefined | error] 的形式返回结果。
// 如果 Promise resolve 了，handle 函数返回 [data, undefined]；
// 如果 Promise reject 了，handle 函数返回 [undefined, Error]。
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
