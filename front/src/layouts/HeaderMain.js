import React, { useState } from "react";
import { Link } from "react-router-dom";
import CategoryFilter from "./CategoryFilter";

export default function HeaderMain() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <header>
      <div className="MainheaderWrap" style={{ display: isSearchOpen ? "none" : "flex" }}>
        {/* 메인페이지 헤더 */}
        <div className="headerLogoContent">
          <Link to="/">
            <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/Nearget_logo.png"} alt="logo" height="18px" />
          </Link>
        </div>
        <div className="headerSearchContent" onClick={toggleSearch}>
          <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/ic_search.png"} alt="searchIcon" height="36px" />
        </div>
      </div>

      <div className="MainSearchWrap" style={{ display: isSearchOpen ? "flex" : "none" }}>
        <div className="SearchCloseContent" onClick={toggleSearch}>
          <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/ic_back.png"} alt="searchIcon" height="36px" />
        </div>
        <div className="SearchInputContent">
          <input type="text" name="search" maxLength="20" placeholder="검색어를 입력해주세요." />
          <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/ic_search_sm.svg"} />
        </div>
      </div>
      <CategoryFilter />
    </header>
  );
}
