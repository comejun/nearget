import useCustomMove from "../../hooks/useCustomMove";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getTodayRestaurant} from "../../api/RestaurantAPI";
import {modifyLikeList} from "../../api/memberAPI";

const PlaceCard = ({likeList, restaurant}) => {
    const loginState = useSelector((state) => state.loginSlice);
    const {moveToPlace} = useCustomMove();
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
    const [isLike, setIsLike] = useState()

    useEffect(() => {
        setIsLike(likeList ? likeList.some((like) => like === restaurant.strId) : false);
    }, []);

    console.log(isLike)

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
        <div className="scrollContent">
            <img onClick={() => moveToPlace(restaurant.strId)} className="scrollContentSum" src={restaurant.image}/>
            {loginState.email ? (
                <img onClick={()=>clickedLikeBtn(restaurant.strId)} className="scrollContentLike"
                     src={process.env.PUBLIC_URL + (isLike ? "/assets/imgs/icon/ic_like_ac.png" : "/assets/imgs/icon/ic_like_wh.png")}
                     alt="like"/>
            ) : (
                <></>
            )}
            <div className="itemTitle">
                <div>
                    <h3>{restaurant.name}</h3>
                    <span>
                        {/*정수로 출력*/}
                        {parseInt(restaurant.distance)}
                        <span>M</span>
                  </span>
                </div>
                <div>
                    <h4>{getCategoryValue(restaurant.category)}</h4>
                    <span>
                    <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/ic_like_sm.png"} alt="like"/>
                    <span>{restaurant.likeCount}</span>
                  </span>
                </div>
            </div>
        </div>
    )
}
export default PlaceCard