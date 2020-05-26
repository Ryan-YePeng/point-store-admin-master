import { axiosF } from "./request";

/**
 * @module 图片
 * */
const uploadPicture = "file/uploadPictureFile";
export const uploadPictureApi = data => axiosF(uploadPicture, data);
