import React from "react";
import { Link } from "react-router-dom";
import { getKakaoLoginLink } from "../../api/kakaoAPI";
import BasicLayout from "../../layouts/BasicLayout";
import HeaderBack from "../../layouts/HeaderBack";
import BottomBtn from "../../layouts/BottomBtn";

const GetPage = () => {
  const kakaoLoginLink = getKakaoLoginLink();

  return (
    <BasicLayout>
      <HeaderBack imgSrc="/assets/imgs/icon/h1_GetPlace.png" />
      <div className="header_margin"></div>
      <div className="placeContentWrap">
        <img src={process.env.PUBLIC_URL + "/assets/imgs/sample.png"} />
        <h3>양식</h3>
      </div>
      <div className="PlaceH2Wrap">
        <h2 className="GetPageMargin">라칸티나</h2>
      </div>
      <form>
        <div className="MyModifyInput">
          <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/h2_GetGroup.png"} />
          <select name="nickname">
            <option value="" selected disabled hidden>
              그룹을 선택해주세요.
            </option>
            <option value="01sample">sample</option>
          </select>
        </div>
        <div className="bottom_margin"></div>
        <BottomBtn btnTitle="Save" />
      </form>
    </BasicLayout>
  );
};
export default GetPage;
