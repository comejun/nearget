import React from "react";
import { Link } from "react-router-dom";
import { getKakaoLoginLink } from "../../api/kakaoAPI";
import BasicLayout from "../../layouts/BasicLayout";
import HeaderBack from "../../layouts/HeaderBack";
import BottomNav from "../../layouts/BottomNav";
import InfinityContentGet from "../../layouts/InfinityContentGet";

const MyGetPage = () => {
  const kakaoLoginLink = getKakaoLoginLink();

  return (
    <BasicLayout>
      <HeaderBack imgSrc="/assets/imgs/icon/h1_Myget.png" />
      <div className="header_margin"></div>
      <InfinityContentGet />
      <div className="textBtnWrap">
        <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/btn_AddGet.png"} />
      </div>
      <div className="bottom_margin"></div>
      <BottomNav />
    </BasicLayout>
  );
};
export default MyGetPage;
