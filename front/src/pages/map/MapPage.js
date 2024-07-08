import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useCustomLogin from "../../hooks/useCustomLogin";
import BasicLayout from "../../layouts/BasicLayout";
import HeaderMap from "../../layouts/HeaderMap";

const MapPage = () => {
  // 현재 로그인 된 회원의 이메일 가져오기
  const loginState = useSelector((state) => state.loginSlice);
  const { execLogout, moveToPath } = useCustomLogin();

  const handleClickLogout = () => {
    execLogout();
    moveToPath("/");
  };

  return (
    <BasicLayout>
      <HeaderMap />
      <div></div>
    </BasicLayout>
  );
};
export default MapPage;