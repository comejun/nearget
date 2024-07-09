import React from "react";
import { Link } from "react-router-dom";
import { getKakaoLoginLink } from "../../api/kakaoAPI";
import BasicLayout from "../../layouts/BasicLayout";
import HeaderBack from "../../layouts/HeaderBack";
import BottomBtn from "../../layouts/BottomBtn";
import InfinityContent from "../../layouts/InfinityContent";

const PlacePage = () => {
  const kakaoLoginLink = getKakaoLoginLink();

  return (
    <BasicLayout>
      <HeaderBack imgSrc="/assets/imgs/icon/h1_Place.png" />
      <div className="header_margin"></div>
      <div className="placeContentWrap">
        <img src={process.env.PUBLIC_URL + "/assets/imgs/sample.png"} />
        <h3>양식</h3>
      </div>
      <div className="PlaceH2Wrap">
        <h2>라칸티나</h2>
        <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/ic_like_bk.png"} />
      </div>
      <div className="PlaceLikeWrap">
        <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/ic_like_sm.png"} />
        <span>9,999</span>
      </div>
      <div>
        <div className="PlaceTextLi">
          <p>02-111-1111</p>
          <span>연락하기</span>
        </div>
        <div className="PlaceTextLi">
          <p>서울 중구 을지로1가 50 삼정빌딩 지하 1층</p>
          <span>주소복사</span>
        </div>
      </div>
      <div className="whiteArea">
        <div className="MainH2Wrap">
          <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/h2_Menu.png"} />
        </div>
        <div className="MenuWrap">
          <div className="MenuTextLi">
            <p>토마토 소스 파스타</p>
            <span>
              8,000<span>원</span>
            </span>
          </div>
          <div className="MenuTextLi">
            <p>토마토 소스 파스타</p>
            <span>
              8,000<span>원</span>
            </span>
          </div>
          <div className="MenuTextLi">
            <p>토마토 소스 파스타</p>
            <span>
              8,000<span>원</span>
            </span>
          </div>
        </div>
        <div className="MainH2Wrap">
          <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/h2_Map.png"} />
        </div>
        <div className="PlaceMapArea">{/* 지도 들어갈 자리 */}</div>
        <div className="PlaceMapBtn">
          <button>길찾기</button>
        </div>
        <div className="MainH2Wrap">
          <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/h2_OtherPlace.png"} />
        </div>
        <InfinityContent />
        <div className="bottom_margin"></div>
      </div>

      <BottomBtn btnTitle="Get" />
    </BasicLayout>
  );
};
export default PlacePage;
