import {axiosD, axiosF, axiosG, axiosP} from "./request";

const getUser = "admin/login/getUserInfo"; // 获取用户信息
const logout = "admin/login/logout"; // 退出登录
const updatePass = "admin/user/editPass"; // 修改密码
const editAvatar = "admin/user/editAvatar"; // 编辑头像
const getUserLog = "log/pageUserLog"; // 个人日志

export const getUserInfoApi = () => axiosG(getUser);
export const logoutApi = () => axiosD(logout);
export const updatePassApi = data => axiosP(updatePass, data);
export const editAvatarApi = data => axiosF(editAvatar, data);
export const getUserLogApi = () => axiosG(getUserLog);

