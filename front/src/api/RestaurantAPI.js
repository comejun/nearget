import { API_SERVER_HOST } from "../staticData";
import axios from "axios";

export const host = `${API_SERVER_HOST}/api/restaurant`;

// 음식점 조회 요청
export const getRestaurants = async (restaurantId) => {
    const response = await axios.get(`${host}/${restaurantId}`);
    console.log(response.data);
    return response.data;
};