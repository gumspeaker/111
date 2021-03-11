/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */
import Mock from 'mockjs';
import demoApi from './demo';

const mocks = [
  {
    intercept: true, // 你可能需要一个开关，来使模拟请求与真实请求并存
    fetches: demoApi,
  },
];
// 抄来一个解析地址栏参数解析函数
export function param2Obj(url) {
  const search = url.split('?')[1];
  if (!search) {
    return {};
  }
  return JSON.parse(
    `{"${decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')
      .replace(/\+/g, ' ')
    }"}`,
  );
}
export default function mockXHR(...arg) {
  // Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send;
  // Mock.XHR.prototype.send = function send() {
  //   if (this.custom.xhr) {
  //     this.custom.xhr.withCredentials = this.withCredentials || false;

  //     if (this.responseType) {
  //       this.custom.xhr.responseType = this.responseType;
  //     }
  //   }
  //   this.proxy_send(...arg);
  // };
  // mock执行函数
  function XHR2ExpressReqWrap(respond) {
    return (options) => {
      let result = null;
      if (respond instanceof Function) {
        const { body, type, url } = options;
        console.log(url);
        result = respond({
          method: type,
          body: JSON.parse(body),
          query: param2Obj(url),
        });
      } else {
        result = respond;
      }
      // console.log(result);
      return Mock.mock(result);
    };
  }

  for (const i of mocks) {
    if (i.intercept) {
      for (const fetch of i.fetches) {
        Mock.mock(new RegExp(fetch.url), fetch.type || 'get', XHR2ExpressReqWrap(fetch.response));
      }
    }
  }
}
