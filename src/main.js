import Vue from 'vue';
import './plugins/axios';
import { Button } from 'ant-design-vue';
import Authorized from './components/Authorized.vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'ant-design-vue/lib/date-picker/style/css';

Vue.use(Authorized);
Vue.use(Button);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
