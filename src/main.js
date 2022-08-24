import Vue from 'vue'
import App from './App.vue'

import Router from 'vue-router';
import router from './router/index';
import Vuelidate from 'vuelidate'
import Toasted from 'vue-toasted'
// import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'

// import 'bootstrap/dist/js/bootstrap'

import 'bootstrap/js/dist/dropdown'


import '@fortawesome/fontawesome-free'

Vue.use( Router );
Vue.use(Vuelidate);

Vue.use(Toasted, {
  duration: 2000,
  theme: 'outline',
  colour: 'green',
  iconPack: 'material'
});

Vue.config.productionTip = false

new Vue({
  // store,
  render: h => h(App),
  router
}).$mount('#app')
