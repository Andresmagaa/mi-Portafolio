import Vue from 'vue'
import App from './App.vue'
import VCreditCard from 'v-credit-card'
import 'v-credit-card/dist/VCreditCard.css'

Vue.component('v-credit-card', VCreditCard)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
