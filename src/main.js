import Vue from 'vue'
import App from './App.vue'

import Router from 'vue-router';
import router from './router/index';
import Vuelidate from 'vuelidate'
import Toasted from 'vue-toasted'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/js/dist/dropdown'
import 'bootstrap/js/dist/collapse'
import 'bootstrap/js/dist/modal'

Vue.use(Router);
Vue.use(Vuelidate);

Vue.use(Toasted, {
  duration: 2000,
  theme: 'outline',
  iconPack: 'fontawesome',
  position: 'top-right',
});


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
