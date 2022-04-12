import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './config/element.config'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
// TODO 添加全局异常处理