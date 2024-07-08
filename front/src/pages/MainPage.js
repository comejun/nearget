import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useCustomLogin from "../hooks/useCustomLogin";
import BasicLayout from "../layouts/BasicLayout";
import HeaderMain from "../layouts/HeaderMain";
import BottomNav from "../layouts/BottomNav";
import MainTodayGet from "../layouts/MainTodayGet";

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
      <div className="header_margin_main"></div>
      <div className="MainH2Wrap">
        <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/h2_Todaysget.png"} />
      </div>
      <MainTodayGet />
      <div className="MainH2Wrap">
        <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/h2_PricebyPlace.png"} />
      </div>
      <div className="MainH2Wrap">
        <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/h2_NearbyPlace.png"} />
      </div>
      <BottomNav />
    </BasicLayout>
  );
};
export default MainPage;
