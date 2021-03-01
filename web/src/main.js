import Vue from 'vue'
import App from './App.vue'

import './style.scss'//npm i -D sass sass-loader  //npm install sass-loader@10.1.1
import router from './router'

Vue.config.productionTip = false

//vant
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

//axios
import axios from 'axios'
Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:3000/web/api'
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
