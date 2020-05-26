import { axiosG } from "@/api/request";

const pageFeedBack = "feedBack/pageFeedBack"; // 分页获得反馈

export const pageFeedBackApi = data => axiosG(pageFeedBack, data);
