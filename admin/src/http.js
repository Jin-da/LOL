import axios from 'axios'
import Vue from 'vue'
import router from './router'

const http = axios.create({
  baseURL: 'http://localhost:3000/admin/api'
})

//添加请求头 用于后端进行登录验证
http.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if(sessionStorage.token) {
    config.headers.Authorization = 'Bearer ' + sessionStorage.token//将用户token放入请求头
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

//全局拦截器
http.interceptors.response.use(res => {
  return res
}, err => {
  if (err.response.data.message) {
    Vue.prototype.$message({
      type: 'error',
      message: err.response.data.message
    })
    // 401时跳转到登录页
    if (err.response.status === 401) {
      router.push('/login')
    }
  }
  return Promise.reject(err)
})

export default http