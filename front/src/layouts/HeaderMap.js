import React, { useState } from "react";
import CategoryFilter from "./CategoryFilter";
import { useDispatch } from "react-redux";
import { clickedMyLocationBtn } from "../slices/mapSlice";

export default function HeaderMap() {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");

  const handleMyLocationBtn = () => {
    dispatch(clickedMyLocationBtn());
  };
  // 검색창 길이제한 // 특수문자 입력방지
  const handleInput = (e) => {
    let value = e.target.value;

    // 특정 특수문자가 포함되어 있는지 확인
    if (/[ \{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/g.test(value)) {
      alert("특수문자는 입력할 수 없습니다.");

      // 특수문자 제거
      value = value.replace(/[ \{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/g, "");
    }

    if (value.length > e.target.maxLength) {
      alert("입력한 텍스트가 너무 깁니다. 20자 이내로 입력해주세요.");
    } else {
      setSearchText(value);
    }
  };

  // 검색 버튼
  const searchFromList = () => {
    console.log("검색버튼 클릭");
    console.log(searchText);
  };

  return (
    <header>
      <div className="MainheaderWrap">
        {/* 메인페이지 헤더 */}
        <div className="headerSearchInput">
          <input
            type="text"
            name="search"
            maxLength="20"
            placeholder="검색어를 입력해주세요."
            value={searchText}
            onChange={handleInput}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchFromList();
              }
            }}
          />
          <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/ic_search_sm.svg"} />
        </div>
        <div className="headerLocationContent">
          <img onClick={handleMyLocationBtn} src={process.env.PUBLIC_URL + "/assets/imgs/icon/ic_location.png"} alt="searchIcon" height="36px" />
        </div>
      </div>
      <CategoryFilter />
    </header>
  );
}
