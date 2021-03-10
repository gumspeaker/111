import fetch from './fetch';
// 增
export function update(api, params) {
  return fetch(api, {
    body: params,
    // 这里注意一下，这是xxx-www-form-data的格式，如果日后要使用json格式的context-type就得把stringify去掉
  });
}
// 删
export function deleteRequest(api, params) {
  return fetch(api, {
    method: 'delete',
    body: params,
  });
}
// 改
export function patch(api, params) {
  return fetch(api, {
    method: 'patch',
    body: params,
  });
}
// 查
export function detail(api, params) {
  return fetch(api, {
    method: 'get',
    body: params,
  });
}
