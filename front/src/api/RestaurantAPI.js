import { API_SERVER_HOST } from "../staticData";
import axios from "axios";

export const host = `${API_SERVER_HOST}/api/restaurant`;

// 음식점 조회 요청
export const getRestaurants = async (restaurantId) => {
    const response = await axios.get(`${host}/${restaurantId}`);
    console.log(response.data);
    return response.data;
};

// 오늘의 음식점 조회 요청
export const getTodayRestaurant = async (myLocation) => {
    const LocationData = [myLocation.lat, myLocation.lng];
    console.log(LocationData)

    const response = await axios.post(`${host}/today`,LocationData);
    console.log(response.data);
    return response.data;
};

// 가격별 음식점 조회 요청
export const getPriceRestaurant = async (myLocation) => {
    const LocationData = [myLocation.lat, myLocation.lng];
    console.log(LocationData)

    const response = await axios.post(`${host}/price`,LocationData);
    console.log(response.data);
    return response.data;
};