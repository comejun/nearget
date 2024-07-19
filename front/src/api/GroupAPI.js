import { API_SERVER_HOST } from "../staticData";
import axios from "axios";

export const host = `${API_SERVER_HOST}/api/group`;

// 등록 요청
export const postAdd = async (RestaurantsGroup) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } };
  const response = await axios.post(`${host}/add`, RestaurantsGroup, header);
  return response.data;
};

// 그룹 수정 요청
export const postEditGroup = async (editData) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } };
  const response = await axios.post(`${host}/edit`, editData, header);
  return response.data;
};

// 그룹 삭제 요청
export const deleteGroup = async (groupId) => {
  const response = await axios.delete(`${host}/delete/${groupId}`);
  return response.data;
};

// 그룹안에 음식점 등록 요청
export const addGroupData = async (addData) => {
  const response = await axios.post(`${host}/groups/adddata`, addData);
  return response.data;
};

// 그룹 목록 조회 요청
export const getGroupsList = async (email) => {
  const response = await axios.get(`${host}/groups?email=${email}`);
  return response.data;
};

// 그룹 조회 요청
export const getGroup = async (groupId) => {
  const response = await axios.get(`${host}/group/${groupId}`);
  return response.data;
};

// 그룹 안의 리스트 조회 요청
export const getGroupList = async (groupId) => {
  const response = await axios.get(`${host}/group/${groupId}/list`);
  return response.data;
};
