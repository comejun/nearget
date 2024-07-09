import React from "react";
import { Link } from "react-router-dom";
import CategoryFilter from "./CategoryFilter";

export default function HeaderMap() {
  return (
    <header>
      <div className="MainheaderWrap">
        {/* 메인페이지 헤더 */}
        <div className="headerSearchInput">
          <input type="text" name="search" maxLength="20" placeholder="검색어를 입력해주세요." />
          <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/ic_search_sm.svg"} />
        </div>
        <div className="headerLocationContent">
          <Link to="/list">
            <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/ic_location.png"} alt="searchIcon" height="36px" />
          </Link>
        </div>
      </div>
      <CategoryFilter />
    </header>
  );
}
