import React from "react";
import { useNavigate } from "react-router-dom";
import UseCustomMove from "../hooks/useCustomMove";

export default function HeaderBack({ imgSrc }) {
  const navigate = useNavigate();
  const { moveToMain } = UseCustomMove();

  const goBackOrToMain = () => {
    if (navigate.length > 2) {
      navigate(-1);
    } else {
      moveToMain();
    }
  };

  return (
    <header>
      <div className="headerWrap">
        {/* 메인페이지 헤더 */}
        <div className="headerBackContent" onClick={goBackOrToMain}>
          <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/ic_back.png"} alt="searchIcon" height="36px" />
        </div>
        <img className="headerh1Con" src={process.env.PUBLIC_URL + imgSrc} alt="searchIcon" />
      </div>
    </header>
  );
}
