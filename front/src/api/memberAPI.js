import { API_SERVER_HOST } from "../staticData";
import axios from "axios";

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
  const response = await axios.get(`${host}/${email}`);
  return response.data;
};

// API 회원 정보 수정
export const modifyMember = async (member) => {
  console.log(member);
  const response = await axios.put(`${host}/modify`, member);
  return response.data;
};

// 회원 탈퇴
// export const disableMember = async (email) => {
//   try {
//     const response = await axios.put(`${host}/${email}/disable`);
//     return response.data;
//   } catch (error) {
//     console.error("회원 탈퇴에 실패했습니다.", error);
//   }
// };
