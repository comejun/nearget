import React, {useEffect, useState} from "react";
import {getKakaoLoginLink} from "../../api/kakaoAPI";
import BasicLayout from "../../layouts/BasicLayout";
import HeaderBack from "../../layouts/HeaderBack";
import InfinityContent from "../../layouts/InfinityContent";
import {useParams} from "react-router-dom";
import {getRestaurants} from "../../api/RestaurantAPI";
import LoadingPage from "../../components/common/LoadingPage";
import {getLikeList, modifyLikeList} from "../../api/memberAPI";
import {useSelector} from "react-redux";

const {kakao} = window;

const PlacePage = () => {
    const kakaoLoginLink = getKakaoLoginLink();
    const loginState = useSelector((state) => state.loginSlice);
    const {restaurantId} = useParams();
    const [restaurantData, setRestaurantData] = useState()
    const [isLike, setIsLike] = useState()
    const [likeList, setLikeList] = useState()


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
    }

    // 로그인시 좋아요 리스트 가져오기
    useEffect(() => {
        if(loginState.email){
            const fetchTLikeList = async () => {
                const likeListGet = await getLikeList(loginState.email);
                setLikeList(likeListGet);
            };
            fetchTLikeList();
        }
    }, [loginState.email]);

    useEffect(() => {
        setIsLike(likeList ? likeList.some((like) => like === restaurantData.strId) : false);
    }, []);

    useEffect(() => {
        const fetchRestaurant = async () => {
            const restaurant = await getRestaurants(restaurantId);
            setRestaurantData(restaurant);
            console.log("restaurant : ", restaurant);

        };

        fetchRestaurant();
    }, [restaurantId]);

    useEffect(() => {
        if (restaurantData) {
            const staticMapContainer = document.getElementById('miniMap');
            const staticMapOption = {
                center: new kakao.maps.LatLng(restaurantData.lat, restaurantData.lng),
                level: 2,
            };

            const map = new kakao.maps.StaticMap(staticMapContainer, staticMapOption);
        }
    }, [restaurantData]);

    const clickedLikeBtn = (strId) => {
        if (loginState.email) {
            const fetchLikeList = async () => {
                await modifyLikeList(loginState.email, strId);
            };
            fetchLikeList();
            setIsLike(!isLike);
        }
    }


    return (
        <BasicLayout>
            <HeaderBack imgSrc="/assets/imgs/icon/h1_Place.png"/>
            <div className="header_margin"></div>

            {restaurantData ? <>
                    <div className="placeContentWrap">
                        {/*<img src={process.env.PUBLIC_URL + "/assets/imgs/sample.png"}/>*/}
                        {restaurantData.image === "없음" || restaurantData.image === "이미지없음" ?
                            <img src={process.env.PUBLIC_URL + "/assets/imgs/sample.png"}/> :
                            <img src={restaurantData.image}/>}
                        {/*<img src={restaurantData.image}/>*/}
                        <h3>{getCategoryValue(restaurantData.category)}</h3>
                    </div>
                    <div className="PlaceH2Wrap">
                        <h2>{restaurantData.name}</h2>
                        {restaurantData.image !== "없음" && (
                            loginState.email ? (
                                <img onClick={() => clickedLikeBtn(restaurantData.strId)} className="scrollContentLike"
                                     src={process.env.PUBLIC_URL + (isLike ? "/assets/imgs/icon/ic_like_ac.png" : "/assets/imgs/icon/ic_like_bk.png")}
                                     alt="like"/>
                            ) : null
                        )}
                    </div>
                    {restaurantData.image === "없음" ? <></> :
                        <div className="PlaceLikeWrap">
                            <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/ic_like_sm.png"}/>
                            <span>{restaurantData.likeCount}</span>
                        </div>
                    }
                    <div>
                        {restaurantData.image === "없음" || restaurantData.phone === "" ?
                            <></>
                            : <div className="PlaceTextLi">
                                <p>{restaurantData.phone}</p>
                                <span>연락하기</span>
                            </div>
                        }
                        <div className="PlaceTextLi">
                            <p>{restaurantData.address}</p>
                            <span>주소복사</span>
                        </div>
                    </div>
                    <div className="whiteArea">
                        <div className="MainH2Wrap">
                            <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/h2_Menu.png"}/>
                        </div>

                        {
                            restaurantData.menuList.length > 0 ?
                                <div className="MenuWrap">

                                    {restaurantData.menuList.map((menu, index) => (
                                        <React.Fragment key={index}>
                                            <div className="MenuTextLi">
                                                <p>{menu.menuName}</p>
                                                <span>{menu.price}
                                                    <span>원</span>
                                                </span>
                                            </div>
                                        </React.Fragment>))
                                    }
                                </div>
                                : <div className="MenuWrap">메뉴 없음</div>
                        }

                        <div className="MainH2Wrap">
                            <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/h2_Map.png"}/>
                        </div>

                        <div className="PlaceMapArea" id="miniMap">

                        </div>

                        <div className="PlaceMapBtn">
                            <button>길찾기</button>
                        </div>
                        <div className="MainH2Wrap">
                            <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/h2_OtherPlace.png"}/>
                        </div>
                        <InfinityContent/>
                        <div className="bottom_margin"></div>
                    </div>

                    {
                        restaurantData.image === "없음" ?
                            <></>
                            :
                            <div className="bottomBtnWrap">
                                <div className="bottomBtnContent">
                                    <button>Get</button>
                                </div>
                            </div>
                    }
                </> :
                <LoadingPage/>
            }

        </BasicLayout>
    )
        ;
};
export default PlacePage;
