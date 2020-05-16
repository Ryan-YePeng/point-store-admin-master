import {axiosD, axiosG, axiosK, axiosP} from "@/api/request";

const addScore = "score/addScore"; // 添加积分兑换
const delScore = "score/delScore"; // 删除积分兑换
const disableScore = "score/disableScore"; // 禁用积分兑换
const editScore = "score/editScore"; // 更改积分兑换
const enableScore = "score/enableScore"; // 启用积分兑换
const getScore = "score/getScore"; // 获得积分兑换
const listScore = "score/listScore"; // 获得积分兑换列表
const pageScore = "/score/pageScore"; // 获得积分兑换记录列表

export const addScoreApi = data => axiosK(addScore, data);
export const delScoreApi = data => axiosD(delScore, data);
export const disableScoreApi = data => axiosP(disableScore, data);
export const editScoreApi = data => axiosP(editScore, data);
export const enableScoreApi = data => axiosP(enableScore, data);
export const getScoreApi = data => axiosG(getScore, data);
export const listScoreApi = data => axiosG(listScore, data);
export const pageScoreApi = data => axiosG(pageScore, data);
