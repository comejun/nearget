import React, { useState } from "react";
import { Link } from "react-router-dom";
import CategoryFilter from "./CategoryFilter";
import { useDispatch } from "react-redux";
import { filterRestaurantsLocationList } from "../slices/categorySlice";

export default function HeaderMain() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    setSearchText(""); // 텍스트 지우기
    const element = document.getElementById("SearchTopScroll");

    // 위치로 스크롤
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      });
    }
  };

  // 검색창 길이제한
  const handleInput = (e) => {
    if (e.target.value.length > e.target.maxLength) {
      alert("입력한 텍스트가 너무 깁니다. 20자 이내로 입력해주세요.");
    } else {
      setSearchText(e.target.value);
    }
  };

  // 검색 버튼
  const searchFromList = () => {
    dispatch(filterRestaurantsLocationList(searchText));
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
          <input type="text" name="search" maxLength="20" placeholder="검색어를 입력해주세요." value={searchText} onChange={(e) => setSearchText(e.target.value)} />

          <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/ic_search_sm.svg"} onClick={searchFromList} />
        </div>
      </div>
      <CategoryFilter />
    </header>
  );
}
