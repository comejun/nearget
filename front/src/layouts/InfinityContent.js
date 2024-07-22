import React, { useEffect, useState } from "react";
import useCustomMap from "../hooks/useCustomMap";
import { useSelector } from "react-redux";
import { getNeatListDetail } from "../api/RestaurantAPI";
import MiniPlaceCard from "../components/common/MiniPlaceCard";
import { getLikeList, getLikeListDetail } from "../api/memberAPI";

export default function InfinityContent() {
  const [likeList, setLikeList] = useState();
  const loginState = useSelector((state) => state.loginSlice);
  const category = useSelector((state) => state.categorySlice.category);
  const [nowMyLocation, setNowMyLocation] = useState()
  const {myLocation} = useCustomMap();
  const [nearByList, setNearByList] = useState()

  const searchText = useSelector((state) => state.searchSlice.searchText);

  useEffect(() => {
    console.log(searchText);
  }, [searchText]);


  // 처음 현위치 받아오면
  useEffect(() => {
    if (myLocation.isLoaded && myLocation.get) {
      setNowMyLocation(myLocation);
    }
  }, [myLocation.isLoaded, nearByList]);

  useEffect(() => {
    if (category && nowMyLocation) {
      const fetchNeatDetailList = async () => {
        let nearListGet = await getNeatListDetail(nowMyLocation,category);
        if(!(searchText===""||searchText===undefined||searchText===null)){
          nearListGet = nearListGet.filter((restaurant) => {
                return restaurant.name.includes(searchText);
            });
        }
        setNearByList(nearListGet);
      };

      fetchNeatDetailList();
    }
  }, [category,nowMyLocation,searchText]);

  // 로그인시 좋아요 리스트 가져오기
  useEffect(() => {
    if(loginState.email&&nowMyLocation){
      const fetchTLikeList = async () => {
        const likeListGet = await getLikeListDetail(loginState.email, nowMyLocation);
        setLikeList(likeListGet);
      };
      fetchTLikeList();
    }
  }, [loginState, nowMyLocation]);

  return (
    <div className="InfinityContentWrap">
      <div className="InfinityContent">
        <ul>
          {nearByList &&
            nearByList.map((restaurant, index) => (
              <li key={restaurant.strId}>
                {" "}
                {/* restaurant.id가 고유 식별자라고 가정 */}
                <MiniPlaceCard likeList={likeList} restaurant={restaurant} />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
