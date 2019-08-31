import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import ArgonDashboard from './plugins/argon-dashboard'
import VueApexCharts from 'vue-apexcharts'

Vue.config.productionTip = false
Vue.component('apexchart', VueApexCharts)
Vue.use(ArgonDashboard)
// Vue.use(ApexCharts)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


