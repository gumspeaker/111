import { update, detail } from '../utils/request';

export const userLogin = ({ username, password }) => update('/Api/user/login', { username, password });
export const userRegister = ({ username, password }) => update('/Api/user/Register', { username, password });
export const FindUserByType = (type) => detail('/Api/user/Register', type);
