import React, { useEffect, useState } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import { modifyLikeList } from "../../api/memberAPI";
import { useSelector } from "react-redux";

const MiniPlaceCard = ({ restaurant, likeList }) => {
  const [isLike, setIsLike] = useState();
  const loginState = useSelector((state) => state.loginSlice);
  const { moveToPlace } = useCustomMove();
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

  const clickedLikeBtn = (strId) => {
    if (loginState.email) {
      const fetchLikeList = async () => {
        await modifyLikeList(loginState.email, strId);
      };
      fetchLikeList();
      setIsLike(!isLike);
    }
  };

  useEffect(() => {
    if (likeList) {
      setIsLike(likeList ? likeList.some((like) => like.strId === restaurant.strId) : false);
      console.log(likeList ? likeList.some((like) => like.strId === restaurant.strId) : false);
    }
  }, [likeList]);

  return (
    <div>
      <div className="InfinityContentSumDiv">
        <img onClick={() => moveToPlace(restaurant.strId)} className="InfinityContentSum" src={restaurant.image} />
      </div>
      {loginState.email ? (
        <img
          onClick={() => clickedLikeBtn(restaurant.strId)}
          className="scrollContentLike"
          src={process.env.PUBLIC_URL + (isLike ? "/assets/imgs/icon/ic_like_ac.png" : "/assets/imgs/icon/ic_like_wh.png")}
          alt="like"
        />
      ) : (
        <></>
      )}
      <div className="infinityItemTitle">
        <div>
          <h4>{getCategoryValue(restaurant.category)}</h4>
          <span>
            {/*정수로 출력*/}
            {parseInt(restaurant.distance) > 1000 ? (parseInt(restaurant.distance) / 1000).toFixed(2) : parseInt(restaurant.distance)}
            {parseInt(restaurant.distance) > 1000 ? <span>KM</span> : <span>M</span>}
          </span>
        </div>
      </div>
      <h3>{restaurant.name}</h3>
    </div>
  );
};
export default MiniPlaceCard;
