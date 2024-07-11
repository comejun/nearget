// email 에 해당하는 값이 있으면 -> 로그인 상태, 없으면 -> 비로그인 상태로 간주
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginPost } from "../api/memberAPI";
import { getCookie, removeCookie, setCookie } from "../util/cookieUtil";

const initState = {
  email: "",
};

// 쿠키 확인함수 추가
const getMemberCookie = () => {
  const memberInfo = getCookie("member");
  if (memberInfo && memberInfo.nickname) {
    // 한글깨짐 대비
    memberInfo.nickname = decodeURIComponent(memberInfo.nickname);
  }
  return memberInfo;
};

export const loginPostAsync = createAsyncThunk("loginPostAsync", (param) => {
  return loginPost(param);
});

const loginSlice = createSlice({
  name: "LoginSlice",
  initialState: getMemberCookie() || initState,
  reducers: {
    // 동기 작업 처리
    login: (state, action) => {
      console.log("login....reducers....");
      const data = action.payload;
      setCookie("member", JSON.stringify(data), 1);
      console.log(data);
      // 리덕스 스토어에 수정할 새로운 상태값 리턴
      return { email: data.email };
    },
    logout: (state) => {
      console.log("logout");
      removeCookie("member");
      return { ...initState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginPostAsync.fulfilled, (state, action) => {
        // 성공
        console.log("fulfilled");
        const payload = action.payload;
        // 정상 처리시에만 쿠키 생성
        if (!payload.error) {
          setCookie("member", JSON.stringify(payload), 1);
        }
        return payload;
      })
      .addCase(loginPostAsync.pending, (state, action) => {
        console.log("pending");
      })
      .addCase(loginPostAsync.rejected, (state, action) => {
        console.log("rejected");
      });
  },
});

// 액션크리에이터 외부로 내보내기
export const { login, logout } = loginSlice.actions;
// 리듀서 외부로 내보내기 -> configureStore에 등록
export default loginSlice.reducer;
