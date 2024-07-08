import React from "react";
import { Link } from "react-router-dom";
import { getKakaoLoginLink } from "../../api/kakaoAPI";
import BasicLayout from "../../layouts/BasicLayout";
import HeaderBack from "../../layouts/HeaderBack";
import BottomBtn from "../../layouts/BottomBtn";

const ProfileEditPage = () => {
  const kakaoLoginLink = getKakaoLoginLink();

  return (
    <BasicLayout>
      <HeaderBack imgSrc="/assets/imgs/icon/h1_EditProfile.png" />
      <div className="header_margin"></div>
      <form>
        <div className="MyModifyImg">
          <span>Edit</span>
        </div>
        <div className="MyModifyInput">
          <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/h2_Nickname.png"} />
          <input type="text" name="nickname" maxLength="20" placeholder="닉네임을 입력해주세요." />
          <span></span>
        </div>
        <div className="textBtnWrap">
          <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/btn_DeleteID.png"} alt="deleteID" />
        </div>
      </form>
      <BottomBtn btnTitle="Save" />
    </BasicLayout>
  );
};
export default ProfileEditPage;
