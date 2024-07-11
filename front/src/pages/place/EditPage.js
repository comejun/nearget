import React from "react";
import { getKakaoLoginLink } from "../../api/kakaoAPI";
import BasicLayout from "../../layouts/BasicLayout";
import HeaderBack from "../../layouts/HeaderBack";

const AddPage = () => {
  const kakaoLoginLink = getKakaoLoginLink();

  return (
    <BasicLayout>
      <HeaderBack imgSrc="/assets/imgs/icon/h1_EditGet.png" />
      <div className="header_margin"></div>
      <form>
        <div className="GetH1Wrap">
          <img className="GroupSum" src={process.env.PUBLIC_URL + "/assets/imgs/sample.png"} />
          <h3 className="GroupTitleEdit">Edit</h3>
        </div>
        <div className="MyModifyInput">
          <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/h2_GetName.png"} />
          <input type="text" name="nickname" maxLength="20" placeholder="닉네임을 입력해주세요." />
          <span></span>
        </div>
        <div className="bottom_margin"></div>

        <div className="bottomBtnWrap">
          <div className="bottomBtnContent">
            <button>Save</button>
          </div>
        </div>
      </form>
    </BasicLayout>
  );
};
export default AddPage;
