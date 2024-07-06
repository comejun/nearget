import React from "react";
import { Link } from "react-router-dom";
import CategoryFilter from "./CategoryFilter";

export default function HeaderMain() {
  return (
    <header>
      <div className="headerWrap">
        {/* 메인페이지 헤더 */}
        <div className="headerLogoContent">
          <Link to="/">
            <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/Nearget_color.png"} alt="logo" height="18px" />
          </Link>
        </div>
        <div className="headerSearchContent">
          <Link to="/list">
            <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/ic_search.png"} alt="searchIcon" height="36px" />
          </Link>
        </div>
      </div>
      <CategoryFilter />
    </header>
  );
}
