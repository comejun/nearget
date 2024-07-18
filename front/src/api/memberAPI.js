import { API_SERVER_HOST } from "../staticData";
import axios from "axios";
import jwtAxios from "../util/jwtUtil";

export const host = `${API_SERVER_HOST}/api/member`;

// API 로그인 요청
export const loginPost = async (loginParam) => {
  const header = { Headers: { "Content-Type": "x-www-form-urlencoded" } };
  const form = new FormData();
  form.append("username", loginParam.email);
  form.append("password", loginParam.password);

  const response = await axios.post(`${host}/login`, form, header);
  return response.data;
};

// API 회원 정보요청
export const getMember = async (email) => {
  const response = await jwtAxios.get(`${host}/${email}`);
  return response.data;
};

// API 회원 정보 수정
export const modifyMember = async (member) => {
  console.log(member);
  const response = await jwtAxios.put(`${host}/modify`, member);
  return response.data;
};

// 회원 탈퇴
export const disableMember = async (email) => {
  try {
    const response = await jwtAxios.put(`${host}/${email}/disable`);
    return response.data;
  } catch (error) {
    console.error("회원 탈퇴에 실패했습니다.", error);
  }
};

// 좋아요 가게 리스트 가져오기
export const getLikeList = async (email) => {
  try {
    const response = await jwtAxios.get(`${host}/${email}/like`);
    return response.data;
  } catch (error) {
    console.error("좋아요 리스트를 가져오는데 실패했습니다.", error);
  }
};

// 좋아요 가게 추가/삭제
export const modifyLikeList = async (email, restaurantId) => {
  console.log(email, restaurantId);
  try {
    const response = await jwtAxios.put(`${host}/${email}/like/${restaurantId}`);
    return response.data;
  } catch (error) {
    console.error("좋아요 리스트를 수정하는데 실패했습니다.", error);
  }
};
