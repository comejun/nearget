import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useCustomLogin from "../hooks/useCustomLogin";
import BasicLayout from "../layouts/BasicLayout";
import HeaderMain from "../layouts/HeaderMain";

const MainPage = () => {
  // 현재 로그인 된 회원의 이메일 가져오기
  const loginState = useSelector((state) => state.loginSlice);
  const { execLogout, moveToPath } = useCustomLogin();

  const handleClickLogout = () => {
    execLogout();
    moveToPath("/");
  };

  return (
    <BasicLayout>
      <HeaderMain />
      <div>
        MainPage
        {!loginState.email ? (
          <Link to="/member/login">go to Login</Link>
        ) : (
          <div onClick={handleClickLogout} className="MenuWrap">
            <Link>
              <h3>🔑 로그아웃</h3>
              <span></span>
            </Link>
          </div>
        )}
      </div>
    </BasicLayout>
  );
};
export default MainPage;
