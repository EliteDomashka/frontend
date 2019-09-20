import Vue from 'vue';
import Buefy from 'buefy';
import InfiniteLoading from 'vue-infinite-loading';
import VueScrollTo from 'vue-scrollto';
import VueScrollReveal from 'vue-scroll-reveal';
import vuedayjs from './helpers/vue-dayjs';
import App from './App.vue';

import './registerServiceWorker';
import './assets/scss/app.scss';
import Tasks from './pages/Tasks';
import Lessons from './pages/Lessons';

window.API_URL = 'https://backend.domashka.cloud/api/';
Vue.use(vuedayjs, {
  lang: 'uk',
});
Vue.use(Buefy);
Vue.use(InfiniteLoading);
Vue.use(VueScrollTo);
Vue.use(VueScrollReveal);


Vue.prototype.localStorage = window.localStorage;
Vue.config.productionTip = false;

Vue.component('Tasks', Tasks);
Vue.component('Lessons', Lessons);
new Vue({
  render: h => h(App),
}).$mount('#app');
