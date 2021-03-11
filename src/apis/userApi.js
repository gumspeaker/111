import { update, detail } from '../utils/request';

export const userLogin = ({ username, password }) => update('/Api/user/login', { username, password });
export const userRegister = ({ username, password }) => update('/Api/user/Register', { username, password });
export const FindUserByName = (name) => detail('/Api/user/name', name);
