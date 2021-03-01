import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'

import './style.css'

Vue.config.productionTip = false

import http from './http'
Vue.prototype.$http = http//添加到vue原型上 就可以在任意处访问这个请求接口

// 用于解决无法上传图片的问题（之前只给每次axios请求添加了该请求头）
// 上传图片使用的elementui使用ajax请求库进行请求 所以没有使用axios 故没有被添加请求头
Vue.mixin({//此处相当于 在所有的页面都添加了该methods 可以在任意处使用
  methods: {
    getAuthHeaders() {
      return {
        Authorization: `Bearer ${ sessionStorage.token || ''}`
      }
    }
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
