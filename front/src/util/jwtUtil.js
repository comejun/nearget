// 로그인 상태에서 요청 보낼떄 사용
import axios from "axios";
import { getCookie, setCookie } from "./cookieUtil";
import { API_SERVER_HOST } from "../staticData";

// 로그인 상태에서 요청보낼때 사용
const jwtAxios = axios.create();

// 토큰 갱신 함수
const refreshJWT = async (accessToken, refreshToken) => {
  const host = API_SERVER_HOST;
  const header = { headers: { Authorization: `Bearer ${accessToken}` } };
  const response = await axios.get(`${host}/api/member/refresh?refreshToken=${refreshToken}`, header);
  console.log("**************************");
  console.log(response.data);
  return response.data;
};

// request 전
const beforeReq = (config) => {
  console.log("beforeReq");

  const memberInfo = getCookie("member"); // member쿠키 꺼내기
  // 쿠키 없을때 예외 발생
  if (!memberInfo) {
    console.log("Member Cookie Not Found!");
    return Promise.reject({
      response: { data: { error: "REQUIRE_LOGIN" } },
    });
  }
  // 쿠키가 있을 경우 실행되는 코드들
  const { accessToken } = memberInfo; // accessToken 꺼내기
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
};

// request 실패
const requestFail = (err) => {
  console.log("requestFail");
  return Promise.reject(err);
};

// response 전
const beforeRes = async (res) => {
  console.log("before return response....");

  // console.log(res);
  const data = res.data; // API 서버에서 보내준 응답 데이터
  if (data && data.error === "ERROR_ACCESS_TOKEN") {
    const memberCookie = getCookie("member");
    const result = await refreshJWT(memberCookie.accessToken, memberCookie.refreshToken);
    console.log("refreshed token : ", result);

    // 쿠키의 토큰 값 갱신
    memberCookie.accessToken = result.accessToken;
    memberCookie.refreshToken = result.refreshToken;
    setCookie("member", JSON.stringify(memberCookie), 1);

    // 원래 처음 요청한 정보 꺼내서, Access, Refresh Token 갱신 뒤 재 요청
    const originalRequest = res.config;
    originalRequest.headers.Authorization = `Bearer ${result.accessToken}`;
    return await axios(originalRequest);
  }

  return res;
};

// response 실패
const responseFail = (err) => {
  console.log("responseFail");
  return Promise.reject(err);
};

jwtAxios.interceptors.request.use(beforeReq, requestFail);
jwtAxios.interceptors.response.use(beforeRes, responseFail);

export default jwtAxios;
