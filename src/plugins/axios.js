/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import Vue from 'vue';
import axios from 'axios';
import store from '../store/index';
// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const config = {
  baseURL: 'http://39.101.192.76:8099',
  timeout: 60 * 1000, // Timeout
  withCredentials: true,
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  (_config) => {
    const token = store.state.myToken;
    // console.log(token)
    if (token != null) {
      _config.headers.Authorization = token; // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return _config;
  },
  (error) => {
    console.log(error);
    Promise.reject(error);
  },
);

// Add a response interceptor
_axios.interceptors.response.use(
  (res) => {
    // console.log(res)
    const code = res.data.Rspmsg || res.status;
    if (code === 401) {
      return Promise.reject(new Error('error'));
    }
    if (code !== 200) {
      // Notification.error({
      //   title: res.data.msg
      // })
      return Promise.reject((new Error('error')));
    }
    return res;
  },
  (err) => {
    const { config } = err;
    const errres = err.response;
    const errType = errres ? errres.status : 0;
    // 收集错误信息
    switch (errType) {
      case 400:
        err.message = '请求无效';
        break;

      case 401:
        err.message = '由于长时间未操作，登录已超时，请重新登录';
        break;

      case 403:
        err.message = '拒绝访问';
        break;

      case 404:
        err.message = `请求地址出错: ${errres.config.url}`;
        break;

      case 405:
        err.message = '未授权';
        break;

      case 408:
        err.message = '请求超时';
        break;

      case 500:
        err.message = '服务器内部错误';
        break;

      case 501:
        err.message = '服务未实现';
        break;

      case 502:
        err.message = '网关错误';
        break;

      case 503:
        err.message = '服务不可用';
        break;

      case 504:
        err.message = '网关超时';
        break;

      case 505:
        err.message = 'HTTP版本不受支持';
        break;

      default:
        err.message = '网络波动，请重试';
    }
    if (!config || !config.retry) return Promise.reject(err);
    console.log(`error ${err}`);
    return Promise.reject(err);
  },
);
export { _axios };
// eslint-disable-next-line no-unused-vars
Plugin.install = function install(Vue, options) {
  Vue.axios = _axios;

  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      },
    },
    $axios: {
      get() {
        return _axios;
      },
    },
  });
};

Vue.use(Plugin);

export default Plugin;
