import React from "react";
import { Link } from "react-router-dom";

export default function HeaderBack({ imgSrc }) {
  return (
    <header>
      <div className="headerWrap">
        {/* 메인페이지 헤더 */}
        <div className="headerBackContent">
          <Link to="/list">
            <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/ic_back.png"} alt="searchIcon" height="36px" />
          </Link>
        </div>
        <img className="headerh1Con" src={process.env.PUBLIC_URL + imgSrc} alt="searchIcon" />
      </div>
    </header>
  );
}
