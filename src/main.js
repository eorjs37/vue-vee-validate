import Vue from 'vue'
import App from './App.vue'
import { router } from './router/index';
import './plugins/VeeValidate';


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
