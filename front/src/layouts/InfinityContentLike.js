import {useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import useCustomMap from "../hooks/useCustomMap";
import {getLikeListDetail} from "../api/memberAPI";
import MiniPlaceCard from "../components/common/MiniPlaceCard";
import PlaceCard from "../components/common/PlaceCard";

export default function InfinityContentLike() {

  const loginState = useSelector((state) => state.loginSlice);
  const [nowMyLocation, setNowMyLocation] = useState()
  const {myLocation} = useCustomMap();
  const [likeList, setLikeList] = useState()

  // 처음 현위치 받아오면
  useEffect(() => {
    if (myLocation.isLoaded && myLocation.get) {
      setNowMyLocation(myLocation);
    }
  }, [myLocation.isLoaded,likeList]);

  useEffect(() => {
    if(loginState&&nowMyLocation){
      const fetchTLikeList = async () => {
        const likeListGet = await getLikeListDetail(loginState.email,nowMyLocation);
        setLikeList(likeListGet);
        console.log(likeListGet);
      };
      fetchTLikeList();
    }
  }, [loginState,nowMyLocation]);

  return (
    <div className="InfinityContentWrap">
      <div className="InfinityContent">
        <ul>
          {likeList && likeList.map((restaurant, index) => (
              <li key={restaurant.strId}> {/* restaurant.id가 고유 식별자라고 가정 */}
                <MiniPlaceCard likeList={likeList} restaurant={restaurant}/>
              </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
