import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './config/element.config'
import globalErrorHandler from "@/handler/globalErrorHandler"

Vue.config.productionTip = false
Vue.prototype.$throw = function(error){globalErrorHandler(error, this)}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
// TODO 添加全局异常处理