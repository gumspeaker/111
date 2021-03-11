/**
 * 100权限码表示可以查询普通用户列表
 * 101权限码表示可以查询所有用户列表
 * 200表示可以查询每个每个api的api的峰值流量
 * 300表示可以增加普通用户
 * 301表示可以删除普通用户
 * 302表示可以修改用户
 * 303表示可以通过用户名查用户
 * */
const userPermission = ['100', '200'];
const adminPermission = ['100', '101', '200', '300', '301', '302', '303'];
export default new Map([['user', userPermission], ['admin', adminPermission]]);
