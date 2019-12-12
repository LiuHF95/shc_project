// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import store from './store'
import axios from 'axios'
import qs from 'qs'
import "./assets/reset.css" //引入公共样式
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import echarts from 'echarts'
// import { Message } from 'element-ui'

Vue.config.productionTip = false

Vue.prototype.$echarts = echarts

Vue.prototype.$http = axios

Vue.prototype.$qs = qs

Vue.use(ElementUI)

Vue.use(Vuex)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  // Message,
  components: { App },
  template: '<App/>'
})
