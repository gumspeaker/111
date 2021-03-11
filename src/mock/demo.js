// import Mock from 'mockjs';

// const userList = Mock.mock({
//   'list|20': [{
//     name: '@cname', // 中文名
//     account: '@word', // 英文单词
//     phone: /1[3-9][0-9]{9}/, // 正则模式
//     deptName: Mock.mock('@cword(2,4)'), // 随机2-4字中文单词
//     id: '@guid', // guid
//   }],
// });
const userList = [
  { username: 'xzh', password: '123', role: 'admin' },
  { username: 'xzh1', password: '123', role: 'user' },
  { username: 'admin', password: 'admin', role: 'admin' },

];
const TopFlowByTime = {
  TopTime: '18',
  TopFlow: 1000,
};
export default [
  {
    url: '/Api/user/login',
    type: 'post',
    // 可以是function也可以是其他数组
    // res.body就是我们传入到接口的数据，我们可以在这里做些逻辑操作
    response: ({ body }) => {
      const userInformation = userList.find((item) => item.username === body.username
        && item.password === body.password);
      const data = userInformation || '登录账号密码错误';
      // 使用return返回前端需要的数据
      return {
        code: 200,
        message: '操作成功',
        data,
      };
    },
  }, {
    url: '/Api/user/Register',
    type: 'post',
    response() {
      return {
        code: 200,
        message: '操作成功',
        data: '操作成功',
      };
    },
  },
  {
    url: '/Api/flow/Top',
    type: 'get',
    response() {
      return {
        code: 200,
        message: '操作成功',
        data: TopFlowByTime,
      };
    },
  },
  {
    url: '/Api/user/userList',
    type: 'get',
    // 可以是function也可以是其他数组
    // res.body就是我们传入到接口的数据，我们可以在这里做些逻辑操作
    response: ({ query }) => {
      console.log(query);
      const { role } = query;

      const data = [];
      if (role === 'admin') {
        data.push(...userList);
      } else if (role === 'user') {
        // 使用return返回前端需要的数据
        data.push(...userList.filter((i) => i.role === 'user'));
      }
      return {
        code: 200,
        message: '操作成功',
        data,
      };
    },
  },
  // 多个接口
];
