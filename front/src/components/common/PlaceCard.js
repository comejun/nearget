import React from 'react'
import useCustomMove from "../../hooks/useCustomMove";

const PlaceCard = ({restaurant}) => {
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
    return (
        <div className="scrollContent" onClick={() => moveToPlace(restaurant.strId)}>
            <img className="scrollContentSum" src={restaurant.image}/>
            <img className="scrollContentLike" src={process.env.PUBLIC_URL + "/assets/imgs/icon/ic_like_wh.png"}/>
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