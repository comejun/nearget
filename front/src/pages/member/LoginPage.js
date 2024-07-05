import React from "react";
import { Link } from "react-router-dom";
import { getKakaoLoginLink } from "../../api/kakaoAPI";
import BasicLayout from "../../layouts/BasicLayout";

const LoginPage = () => {
  const kakaoLoginLink = getKakaoLoginLink();

  return (
    <BasicLayout>
      <div className="loginWrap">
        <h1 className="loginLogo">
          <img src="../assets/imgs/icon/Nearget_color.png" alt="kakaologo" />
        </h1>
        <p className="loginText">
          가까운 거리, 합리적인 선택 <br />
          맛집 리스트 서비스 "너겟"
        </p>
        <div className="bottomFix">
          <Link to={kakaoLoginLink} className="kakaoBtnWrap">
            <button className="kakaoBtn">
              <img src="../assets/imgs/icon/ic_kakaoLogin.png" alt="kakaologo" />
            </button>
          </Link>
          <Link to="/" className="toMainPage">
            로그인하지 않고 둘러보기
          </Link>
        </div>
      </div>
    </BasicLayout>
  );
};
export default LoginPage;
