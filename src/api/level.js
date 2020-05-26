import { axiosD, axiosG, axiosK, axiosP } from "@/api/request";

const addMemberLevel = "memberLevel/addMemberLevel"; // 添加会员等级
const delMemberLevel = "memberLevel/delMemberLevel"; // 删除会员等级
const editMemberLevel = "memberLevel/editMemberLevel"; // 更改会员等级
const listMemberLevel = "memberLevel/listMemberLevel"; // 获得会员等级列表

export const addMemberLevelApi = data => axiosK(addMemberLevel, data);
export const delMemberLevelApi = data => axiosD(delMemberLevel, data);
export const editMemberLevelApi = data => axiosP(editMemberLevel, data);
export const listMemberLevelApi = data => axiosG(listMemberLevel, data);
