import Vue from 'vue';
import './plugins/axios';
import {
  Button, Input, Checkbox, FormModel, Icon, Card, message, List, Table, Popconfirm,
} from 'ant-design-vue';
import Permission from './components/Permission.vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'ant-design-vue/lib/date-picker/style/css';
import mockXHR from './mock/index';

// if (process.env.NODE_ENV === 'development') {
// }
mockXHR();
Vue.use(Permission)
  .use(Button)
  .use(Input)
  .use(Checkbox)
  .use(FormModel)
  .use(Card)
  .use(List)
  .use(Table)
  .use(Popconfirm)
  .use(Icon);
Vue.config.productionTip = false;
Vue.prototype.$message = message;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
