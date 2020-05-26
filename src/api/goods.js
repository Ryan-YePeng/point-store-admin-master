import { axiosD, axiosG, axiosK, axiosP } from "@/api/request";

const addGoods = "goods/addGoods"; // 添加商品
const delGoods = "goods/delGoods"; // 删除商品
const editGoods = "goods/editGoods"; // 更改商品
const exchangeGoods = "goods/exchangeGoodsByUserNumber"; // 兑换商品
const getGoods = "goods/getGoods"; // 通过id获得商品信息
const pageGoods = "goods/pageGoods"; // 分页获得商品信息
const pageOrders = "goods/pageOrders"; // 分页获得订单列表
const successExchange = "goods/successExchange"; // 交易成功

export const addGoodsApi = data => axiosK(addGoods, data);
export const delGoodsApi = data => axiosD(delGoods, data);
export const editGoodsApi = data => axiosP(editGoods, data);
export const exchangeGoodsApi = data => axiosK(exchangeGoods, data);
export const getGoodsApi = data => axiosG(getGoods, data);
export const pageGoodsApi = data => axiosG(pageGoods, data);
export const pageOrdersApi = data => axiosG(pageOrders, data);
export const successExchangeApi = data => axiosP(successExchange, data);
