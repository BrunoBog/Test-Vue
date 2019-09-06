import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import ArgonDashboard from './plugins/argon-dashboard'
import Axios from 'axios'
import config from './configs'

Vue.config.productionTip = false
Vue.use(ArgonDashboard)

Vue.prototype.$http = Axios;
Vue.prototype.$config = config;
localStorage.setItem('config', config);

  Vue.prototype.$http.defaults.headers.common['Authorization'] = "Bearer "  + localStorage.getItem('token');
  Vue.prototype.$http.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

new Vue({
  router,
  store,
  config,
  render: h => h(App)
}).$mount('#app')

