import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import './assets/css/global.css'
//import { config } from 'vue/types/umd';

Vue.use(ElementUI)

//配置请求的根路径
axios.defaults.baseURL = 'http://1.15.74.74:8888/api/private/v1/'
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')

  return config
})
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
