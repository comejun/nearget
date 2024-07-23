import React from "react";
import { useNavigate } from "react-router-dom";
import UseCustomMove from "../hooks/useCustomMove";

export default function HeaderBack({ imgSrc }) {
  const navigate = useNavigate();
  const { moveToMain } = UseCustomMove();

  const goBackOrToMain = () => {

    //place 페이지에서 뒤로가기시 이전 페이지로 이동
    if (window.location.pathname === "/place/add") {
      moveToMain();

    }
    //main 페이지에서 뒤로가기시 메인페이지로 이동
    else {
      navigate(-1);

    }
  };

  return (
    <header>
      <div className="headerWrap">
        {/* 메인페이지 헤더 */}
        <div className="headerBackContent" onClick={goBackOrToMain}>
          <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/ic_back.png"} alt="searchIcon" height="36px" />
        </div>
        <img className="headerh1Con" src={process.env.PUBLIC_URL + imgSrc} />
      </div>
    </header>
  );
}
