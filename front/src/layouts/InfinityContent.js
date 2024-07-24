import React, { useEffect, useState } from "react";
import useCustomMap from "../hooks/useCustomMap";
import { useSelector } from "react-redux";
import { getNeatListDetail } from "../api/RestaurantAPI";
import MiniPlaceCard from "../components/common/MiniPlaceCard";
import { getLikeList, getLikeListDetail } from "../api/memberAPI";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingPage from "../components/common/LoadingPage";

export default function InfinityContent() {
  const [likeList, setLikeList] = useState();
  const loginState = useSelector((state) => state.loginSlice);
  const category = useSelector((state) => state.categorySlice.category);
  const [nowMyLocation, setNowMyLocation] = useState()
  const {myLocation} = useCustomMap();
  const [nearByList, setNearByList] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true);


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
      /*
      const fetchNeatDetailList = async () => {
        let nearListGet = await getNeatListDetail(nowMyLocation,category);
        if(!(searchText===""||searchText===undefined||searchText===null)){
          nearListGet = nearListGet.filter((restaurant) => {
                return restaurant.name.includes(searchText);
            });
        }
        setNearByList(nearListGet);
      };

      fetchNeatDetailList();*/

      window.scrollTo(0, 0);
      const loadInitialData = async () => {
        const nearListGet = await getNeatListDetail(nowMyLocation, category, { page: 1, size: 10 });

        if (nearListGet.length > 0) {
          setNearByList(nearListGet);
          setPage(2); // 다음 페이지 요청을 위해 2로 설정
          setHasMore(nearListGet.length === 10); // 데이터가 10개 미만이면 더 이상 불러올 데이터가 없음
        } else {
          setNearByList([]);
          setHasMore(false); // 최초 호출에 데이터가 없는 경우
        }
      };
      loadInitialData();
      console.log("loadInitialData");
      console.log(nearByList);
      console.log(page);
        console.log(hasMore);
    }
  }, [category,nowMyLocation,searchText]);


  const fetchData = async () => {
    console.log("fetchData");
    console.log(page);
    const newData = await getNeatListDetail(nowMyLocation, category, { page: page, size: 10 });

    if(newData.length > 0){
        setNearByList([...nearByList, ...newData]);
        setPage(page + 1);
    }
    else{
        setHasMore(false);
    }
  }

  useEffect(() => {
    console.log(nearByList);
  }, [nearByList]);




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
          <InfiniteScroll
              style={{display: "flex", flexWrap: "wrap", justifyContent: "space-between",overflowX: "hidden"}}
              dataLength={nearByList.length} next={fetchData} hasMore={hasMore} loader={<></>}>
            {/* 스터디 목록을 출력 */}
            {nearByList.map((restaurant, index) => (
                <li key={restaurant.strId}>
                  {" "}
                  {/* restaurant.id가 고유 식별자라고 가정 */}
                  <MiniPlaceCard likeList={likeList} restaurant={restaurant} />
                </li>
            ))}
          </InfiniteScroll>

        </ul>
      </div>
    </div>
  );
}
