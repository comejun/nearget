import React from "react";
import { Link } from "react-router-dom";
import { getKakaoLoginLink } from "../../api/kakaoAPI";
import BasicLayout from "../../layouts/BasicLayout";
import HeaderBack from "../../layouts/HeaderBack";

const ProfilePage = () => {
  const kakaoLoginLink = getKakaoLoginLink();

  return (
    <BasicLayout>
      <HeaderBack imgSrc="/assets/imgs/icon/h1_Profile.png" />
      <div className="header_margin"></div>
      <div className="ProfileWrap">
        <div className="PoImgWrap"></div>
        <div className="PoTextWrap">
          <h3>라칸티나</h3>
          <p>lakanti@naver.com</p>
        </div>
        <div className="PoEditWrap">
          <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/btn_edit.png"} />
        </div>
      </div>
      <div className="ProfileListWrap">
        <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/h2_MyLike.png"} />
        <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/ic_aro.png"} />
      </div>
      <div className="ProfileListWrap">
        <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/h2_MyGet.png"} />
        <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/ic_aro.png"} />
      </div>
      <div className="textBtnWrap">
        <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/btn_LogOut.png"} alt="deleteID" />
      </div>
    </BasicLayout>
  );
};
export default ProfilePage;
