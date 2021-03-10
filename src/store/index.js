/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';
import authMap from '../utils/auth';

Vue.use(Vuex);
const defaultUserMessage = {
  userName: '',
  userRole: '',
  authlist: [],
  isLogin: false,
};
export default new Vuex.Store({
  state: {
    ...defaultUserMessage,
  },
  mutations: {
    changeStateToLogin(state, { userName, role }) {
      state.userName = userName;
      state.userRole = role;
      state.authlist = authMap.get(role);
      state.isLogin = true;
    },
    loginOut(state) {
      state.userName = '';
      state.userRole = '';
      state.authlist = [];
      state.isLogin = false;
    },
  },
  actions: {
  },
  modules: {
  },
});
