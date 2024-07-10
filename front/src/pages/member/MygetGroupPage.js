import React from "react";
import { Link } from "react-router-dom";
import { getKakaoLoginLink } from "../../api/kakaoAPI";
import BasicLayout from "../../layouts/BasicLayout";
import HeaderBack from "../../layouts/HeaderBack";
import BottomNav from "../../layouts/BottomNav";
import InfinityContentGetGroup from "../../layouts/InfinityContentGetGroup";

const MyGetGroupPage = () => {
  const kakaoLoginLink = getKakaoLoginLink();

  return (
    <BasicLayout>
      <HeaderBack imgSrc="/assets/imgs/icon/h1_Myget.png" />
      <div className="header_margin"></div>
      <div className="GetH1Wrap">
        <img className="GroupSum" src={process.env.PUBLIC_URL + "/assets/imgs/sample.png"} />
        <h2 className="GroupTitle">양식그룹</h2>
        <div className="GetEditWrap">
          <img className="GetEditBtn" src={process.env.PUBLIC_URL + "/assets/imgs/icon/btn_edit.png"} />
        </div>
      </div>
      <div className="MainH2Wrap">
        <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/h2_PlaceList.png"} />
      </div>
      <InfinityContentGetGroup />
      <div className="textBtnWrap">
        <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/btn_AddMore.png"} />
      </div>
      <div className="bottom_margin"></div>
      <BottomNav />
    </BasicLayout>
  );
};
export default MyGetGroupPage;
