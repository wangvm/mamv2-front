import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './config/element.config'
import globalErrorHandler from "@/handler/globalErrorHandler"

Vue.config.productionTip = false
Vue.prototype.$throw = function(error){globalErrorHandler(error, this)}

Vue.directive("loadmore", {
  bind(el, binding, vnode) {
      const SELECTWRAP = el.querySelector(
          ".el-select-dropdown .el-select-dropdown__wrap"
      );
      SELECTWRAP.addEventListener("scroll", function () {
          const CONDITION = this.scrollHeight - this.scrollTop <= this.clientHeight;
          if (CONDITION) {
              binding.value();
          }
      });
  },
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')