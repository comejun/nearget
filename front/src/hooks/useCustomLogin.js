import { useDispatch, useSelector } from "react-redux";
import { loginPostAsync, logout } from "../slices/loginSlice";
import { createSearchParams, useNavigate } from "react-router-dom";

const useCustomLogin = () => {
  const dispatch = useDispatch(); // 리덕스 state 값 변경해라~

  const navigate = useNavigate(); // 페이지 이동 시

  // 예외 처리 함수 (토큰 문제 등)
  const exceptionHandle = (ex) => {
    console.log("exceptionHandle..........................");
    console.log(ex);

    // 에러 객체와 data 속성의 존재를 확인
    if (ex && ex.response && ex.response.data) {
      const errorMsg = ex.response.data.error;
      // 쿼리스트링 구조 문자열로 만들어주는 함수
      const errorStr = createSearchParams({ error: errorMsg }).toString();
      if (errorMsg === "REQUIRE_LOGIN") {
        alert("로그인이 필요합니다.");
        navigate({ pathname: "/login", search: errorStr });
        return;
      }
      if (ex.response.data.error === "ERROR_ACCESS_DENIED") {
        alert("해당 메뉴를 사용할 수 있는 권한이 없습니다.");
        navigate({ pathname: "/", search: errorStr });
        return;
      }
    } else {
      console.error("Invalid error object:", ex);
    }
    // ....나머지 예외 처리
  };
  // 로그인 상태 값 : 리덕스 지정한 슬라이스 state값 가져와라~

  const loginState = useSelector((state) => state.loginSlice);
  // 로그인 여부

  const isLogin = loginState.email ? true : false;
  // 로그인 함수

  const execLogin = async (loginParam) => {
    const action = await dispatch(loginPostAsync(loginParam));
    return action.payload;
  };
  // 로그아웃 함수

  const execLogout = async () => {
    dispatch(logout());
  };
  // 페이지 이동 함수

  const moveToPath = (path) => {
    navigate({ pathname: path }, { replace: true });
  };
  // 로그인 페이지로 이동 (뒤로가기 내용 지우면서)

  const moveToLogin = () => {
    navigate({ pathname: "/member/login" }, { replace: true });
  };
  // 예외 처리 함수 (토큰 문제 등)

  return {
    loginState,
    isLogin,
    execLogin,
    execLogout,
    moveToPath,
    moveToLogin,
    exceptionHandle,
  };
};
export default useCustomLogin;
