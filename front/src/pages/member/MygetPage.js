import React from "react";
import { Link } from "react-router-dom";
import { getKakaoLoginLink } from "../../api/kakaoAPI";
import BasicLayout from "../../layouts/BasicLayout";
import HeaderBack from "../../layouts/HeaderBack";

const MylikePage = () => {
  const kakaoLoginLink = getKakaoLoginLink();

  return (
    <BasicLayout>
      <HeaderBack imgSrc="/assets/imgs/icon/h1_Myget.png" />
      <div className="header_margin"></div>
    </BasicLayout>
  );
};
export default MylikePage;
