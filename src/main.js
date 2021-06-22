import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import axios from 'axios';
import VueGoogleCharts from 'vue-google-charts';


// Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.use(VueGoogleCharts);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');