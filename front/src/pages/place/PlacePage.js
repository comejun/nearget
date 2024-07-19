import React, { useEffect, useState } from "react";
import BasicLayout from "../../layouts/BasicLayout";
import HeaderBack from "../../layouts/HeaderBack";
import InfinityContent from "../../layouts/InfinityContent";
import { useParams } from "react-router-dom";
import { getRestaurants } from "../../api/RestaurantAPI";
import LoadingPage from "../../components/common/LoadingPage";
import { getLikeList, modifyLikeList } from "../../api/memberAPI";
import { useSelector } from "react-redux";
import UseCustomMove from "../../hooks/useCustomMove";

const { kakao } = window;

const PlacePage = () => {
  const loginState = useSelector((state) => state.loginSlice);
  const { restaurantId } = useParams();
  const { moveToGet } = UseCustomMove();
  const [restaurantData, setRestaurantData] = useState();
  const [refresh, setRefresh] = useState(false);
  const [likeList, setLikeList] = useState();
  const getCategoryValue = (category) => {
    if (category === "WESTERN") {
      return "양식";
    }
    if (category === "CAFE") {
      return "카페";
    }
    if (category === "KOREAN") {
      return "한식";
    }
    if (category === "CHINESE") {
      return "중식";
    }
    if (category === "JAPANESE") {
      return "일식";
    }
    if (category === "FASTFOOD") {
      return "패스트푸드";
    }
    if (category === "PUB") {
      return "술집";
    }
    if (category === "STREET") {
      return "분식";
    }
  };

  // 카카오지도 열기
  const openKakaoMap = () => {
    const confirmOpen = window.confirm("카카오지도를 여시겠습니까?");
    if (confirmOpen) {
      const encodedLocation = encodeURIComponent(restaurantData.address);
      const kakaoMapUrl = `https://map.kakao.com/?q=${encodedLocation}`;
      window.open(kakaoMapUrl, "_blank");
    }
  };

  const fetchLikeList = async () => {
    console.log("좋아요 리스트 가져오기");
    const likeListGet = await getLikeList(loginState.email);
    setLikeList(likeListGet);
  };

  // 로그인시 좋아요 리스트 가져오기
  useEffect(() => {
    if (loginState.email) {
      fetchLikeList();
    }
  }, [loginState.email,refresh]);

  useEffect(() => {
    const fetchRestaurant = async () => {
      const restaurant = await getRestaurants(restaurantId);
      setRestaurantData(restaurant);
    };
    fetchRestaurant();

  }, [restaurantId,refresh]);

  useEffect(() => {
    if (restaurantData) {
      const staticMapContainer = document.getElementById("miniMap");
      const staticMapOption = {
        center: new kakao.maps.LatLng(restaurantData.lat, restaurantData.lng),
        level: 1,
      };

      const map = new kakao.maps.StaticMap(staticMapContainer, staticMapOption);
    }
  }, [restaurantData]);

  const clickedLikeBtn = async (strId) => {
    if (loginState.email) {
      const fetchchangeLike = async () => {
        await modifyLikeList(loginState.email, strId);
        console.log("좋아요 변경");
        setRefresh(!refresh);
      };
      await fetchchangeLike();
    }
  };

  const getLikeIconSrc = (likeList) =>{
    if(restaurantData){
      console.log("좋아요 확인");
      const isLike = likeList ? likeList.some((like) => like === restaurantData.strId) : false;
      console.log(isLike);
      const basePath = process.env.PUBLIC_URL + "/assets/imgs/icon/";
      return isLike ? basePath + "ic_like_ac.png" : basePath + "ic_like_bk.png";
    }
  }

  return (
    <BasicLayout>
      <HeaderBack imgSrc="/assets/imgs/icon/h1_Place.png" />
      <div className="header_margin"></div>

      {restaurantData ? (
        <>
          <div className="placeContentWrap">
            <div className="imagesWrapper">
              {restaurantData.image === "없음" || restaurantData.image === "이미지없음" ? <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/NoImg.png"} /> : <img src={restaurantData.image} />}
            </div>
            <h3>{getCategoryValue(restaurantData.category)}</h3>
          </div>
          <div className="PlaceH2Wrap">
            <h2>{restaurantData.name}</h2>
            {restaurantData.image !== "없음" &&
              (loginState.email ? (
                <img
                  onClick={() => clickedLikeBtn(restaurantData.strId)}
                  className="scrollContentLike"
                  src={getLikeIconSrc(likeList)}
                  alt="like"
                />
              ) : null)}
          </div>
          {restaurantData.image === "없음" ? (
            <></>
          ) : (
            <div className="PlaceLikeWrap">
              <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/ic_like_sm.png"} />
              <span>{restaurantData.likeCount}</span>
            </div>
          )}
          <div>
            {restaurantData.image === "없음" || restaurantData.phone === "" ? (
              <></>
            ) : (
              <div className="PlaceTextLi">
                <p>{restaurantData.phone}</p>
                <span onClick={() => (window.location.href = `tel:${restaurantData.phone}`)}>연락하기</span>
              </div>
            )}
            <div className="PlaceTextLi">
              <p>{restaurantData.address}</p>
              <span
                onClick={() => {
                  navigator.clipboard.writeText(restaurantData.address);
                  alert("주소가 복사되었습니다.");
                }}
              >
                주소복사
              </span>
            </div>
          </div>
          <div className="whiteArea">
            <div className="MainH2Wrap">
              <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/h2_Menu.png"} />
            </div>

            {restaurantData.menuList.length > 0 ? (
              <div className="MenuWrap">
                {restaurantData.menuList.map((menu, index) => (
                  <React.Fragment key={index}>
                    <div className="MenuTextLi">
                      <p>{menu.menuName}</p>
                      <span>
                        {menu.price}
                        <span>원</span>
                      </span>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            ) : (
              <div className="MenuWrap">메뉴 없음</div>
            )}

            <div className="MainH2Wrap">
              <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/h2_Map.png"} />
            </div>

            <div className="PlaceMapArea" id="miniMap">
              <h3>
                <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/ic_mark.svg"} />
              </h3>
            </div>

            <div className="PlaceMapBtn">
              <button onClick={openKakaoMap}>길찾기</button>
            </div>
            <div className="MainH2Wrap">
              <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/h2_OtherPlace.png"} />
            </div>
            <InfinityContent />
            <div className="bottom_margin"></div>
          </div>

          {restaurantData.image === "없음" ? (
            <></>
          ) : (
            <div className="bottomBtnWrap">
              <div className="bottomBtnContent">
                <button onClick={() => moveToGet(restaurantData.strId)}>Get</button>
              </div>
            </div>
          )}
        </>
      ) : (
        <LoadingPage />
      )}
    </BasicLayout>
  );
};
export default PlacePage;
