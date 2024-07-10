import React from "react";
import CategoryFilter from "./CategoryFilter";
import {useDispatch} from "react-redux";
import {clickedMyLocationBtn} from "../slices/mapSlice";

export default function HeaderMap() {
    const dispatch = useDispatch();

    const handleMyLocationBtn = () => {
        dispatch(clickedMyLocationBtn());
    }
  return (
    <header>
      <div className="MainheaderWrap">
        {/* 메인페이지 헤더 */}
        <div className="headerSearchInput">
          <input type="text" name="search" maxLength="20" placeholder="검색어를 입력해주세요." />
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
