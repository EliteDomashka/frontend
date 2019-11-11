import Vue from 'vue';
import Buefy from 'buefy';
import InfiniteLoading from 'vue-infinite-loading';

import VueScrollTo from 'vue-scrollto';
import VueOffline from 'vue-offline';

import axios from 'axios';
import App from './App.vue';
import './registerServiceWorker';
import './buefy';
import './assets/scss/app.scss';

import router from './router';
import store from './store';
import vuedayjs from './helpers/vue-dayjs';

require('./icons');

axios.defaults.baseURL = 'https://backend.domashka.cloud/api/';
Vue.prototype.$axios = axios;


Vue.use(Buefy, {
  defaultIconComponent: 'vue-fontawesome',
  defaultIconPack: 'fas',
});
Vue.use(VueScrollTo);
Vue.use(InfiniteLoading);
Vue.use(VueOffline, {
  mixin: true,
  storage: false,
});
Vue.use(vuedayjs, {
  lang: 'uk',
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
