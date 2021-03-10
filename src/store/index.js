import Vue from 'vue';
import Vuex from 'vuex';
// import authMap from '../utils/authz';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userName: '',
    userRole: '',
    authlist: [],
    isLogin: false,
  },
  mutations: {
    changeStateToLogin() {

    },
  },
  actions: {
  },
  modules: {
  },
});
