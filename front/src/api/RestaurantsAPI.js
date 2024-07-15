import { API_SERVER_HOST } from "../staticData";
import axios from "axios";

export const host = `${API_SERVER_HOST}/api/place`;

// 등록 요청
export const postAdd = async (RestaurantsGroup) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } };
  const response = await axios.post(`${host}/add`, RestaurantsGroup, header);
  return response.data;
};
