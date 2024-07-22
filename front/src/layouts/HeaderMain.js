import React, {useState} from "react";
import {Link} from "react-router-dom";
import CategoryFilter from "./CategoryFilter";
import {useDispatch, useSelector} from "react-redux";
import {filterRestaurantsLocationList} from "../slices/categorySlice";
import {setSearchText} from "../slices/searchSlice";

export default function HeaderMain() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const dispatch = useDispatch();

    const {searchText} = useSelector((state) => state.searchSlice.searchText);
    const [stateSearchText, setStateSearchText] = useState()

    const clickedLogo = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
        const element = document.getElementById("SearchTopScroll");
        dispatch(setSearchText(""));
        setStateSearchText("");

        // 위치로 스크롤
        if (element) {
            window.scrollTo({
                top: element.offsetTop,
                behavior: "smooth",
            });
        }
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
        setStateSearchText(e.target.value);
    }
  };

  // 검색 버튼
  const searchFromList = () => {
    console.log("검색버튼 클릭");
    const todayGetContainer = document.querySelector("div.TodayGetContainer");
    const pricebyPlaceContainer = document.querySelector("div.PricebyPlaceContainer");

    if (todayGetContainer) {
      todayGetContainer.scrollLeft = 0;
    }

    if (pricebyPlaceContainer) {
      pricebyPlaceContainer.scrollLeft = 0;
    }
      console.log("검색버튼 클릭");
      dispatch(setSearchText(stateSearchText));
  };

    return (
        <header>
            <div className="MainheaderWrap" style={{display: isSearchOpen ? "none" : "flex"}}>
                {/* 메인페이지 헤더 */}
                <div className="headerLogoContent">
                    <Link to="/">
                        <img onClick={clickedLogo} src={process.env.PUBLIC_URL + "/assets/imgs/icon/Nearget_logo.png"} alt="logo"
                             height="18px"/>
                    </Link>
                </div>
                <div className="headerSearchContent" onClick={toggleSearch}>
                    <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/ic_search.png"} alt="searchIcon"
                         height="36px"/>
                </div>
            </div>

            <div className="MainSearchWrap" style={{display: isSearchOpen ? "flex" : "none"}}>
                <div className="SearchCloseContent" onClick={toggleSearch}>
                    <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/ic_back.png"} alt="searchIcon" height="36px"/>
                </div>
                <div className="SearchInputContent">
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

                    <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/ic_search_sm.svg"} onClick={searchFromList}/>
                </div>
            </div>
            <CategoryFilter/>
        </header>
    );
}
