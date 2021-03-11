import {
  update, detail, deleteRequest, patch,
} from '../utils/request';

export const userLogin = ({ username, password }) => update('/Api/user/login', { username, password });
export const userRegister = ({ username, password }) => update('/Api/user/Register', { username, password });
export const FindUserByName = (name) => detail('/Api/user/name', name);
export const FindAllUserByRole = (role) => detail('/Api/user/userList', role);
export const addUser = (userMessage) => update('/Api/user', userMessage);
export const deleteUser = (userMessage) => deleteRequest('/Api/user', userMessage);
export const patchUser = (userMessage) => patch('/Api/user', userMessage);
