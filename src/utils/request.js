/* eslint-disable no-param-reassign */
/* eslint-disable no-bitwise */
import { stringify } from 'qs';
import { _axios as axios } from '../plugins/axios';

export default function (url, options = {}) {
  const defaultMethod = 'post';
  const conf = { method: defaultMethod, ...options };
  const {
    method, mock, body, download,
  } = conf;
  // method = method.toLowerCase();
  const payload = ['post', 'put', 'patch'].includes(method) ? 'data' : 'params';
  // 如果是mock数据就在最后加上__mock__
  if (mock) url += `${~url.indexOf('?') ? '&' : '?'}__mock__`;

  const config = {
    ...conf,
    url,
    method,
    [payload]: body,
    ...options,
  };

  if (download) {
    window.open(`${url}?${stringify(body)}`);
    return Promise.resolve(true);
  }
  return axios.request(config);
}
