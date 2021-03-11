/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';
import authMap from '../utils/auth';

Vue.use(Vuex);
const defaultUserMessage = {
  username: '',
  userRole: '',
  authlist: [],
  isLogin: false,
};
export default new Vuex.Store({
  state: {
    ...defaultUserMessage,
  },
  getters: {
    authlist(state) {
      return state.authlist;
    },
    userRole(state) {
      return state.userRole;
    },
    isLogin(state) {
      return state.isLogin;
    },
  },
  mutations: {
    changeStateToLogin(state, { username, role }) {
      state.username = username;
      state.userRole = role;
      state.authlist = authMap.get(role);
      state.isLogin = true;
    },
    loginOut(state) {
      const newState = Object.assign(state, defaultUserMessage);
      state = newState;
    },
  },
  actions: {
  },
  modules: {
  },
});
