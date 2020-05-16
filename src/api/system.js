import {axiosG, axiosP} from "@/api/request";

const exchange = "systemConfig/exchange"; // 兑换积分
const getUser = "systemConfig/getUser"; // 获得用户信息
const listScoreExchange = "systemConfig/listScoreExchange"; // 获得兑换列表（个人）
const pageScoreOrders = "systemConfig/pageScoreOrders"; // 分页获得兑换列表（后台）

export const exchangeApi = data => axiosP(exchange, data);
export const getUserApi = data => axiosG(getUser, data);
export const listScoreExchangeApi = data => axiosG(listScoreExchange, data);
export const pageScoreOrdersApi = data => axiosG(pageScoreOrders, data);
