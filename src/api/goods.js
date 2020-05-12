import {axiosD, axiosG, axiosK, axiosP} from "@/api/request";

const addGoods = "article/addGoods"; // 添加商品
const delGoods = "article/delGoods"; // 删除商品
const editGoods = "article/editGoods"; // 更改商品
const exchangeGoods = "article/exchangeGoods"; // 兑换商品
const getGoods = "article/getGoods"; // 通过id获得商品信息
const pageGoods = "article/pageGoods"; // 分页获得商品信息
const pageOrders = "article/pageOrders"; // 分页获得订单列表

export const addGoodsApi = data => axiosK(addGoods, data);
export const delGoodsApi = data => axiosD(delGoods, data);
export const editGoodsApi = data => axiosP(editGoods, data);
export const exchangeGoodsApi = data => axiosP(exchangeGoods, data);
export const getGoodsApi = data => axiosG(getGoods, data);
export const pageGoodsApi = data => axiosG(pageGoods, data);
export const pageOrdersApi = data => axiosP(pageOrders, data);
