import React, { useEffect, useState } from "react";
import PlaceCard from "../components/common/PlaceCard";
import { getTodayRestaurant } from "../api/RestaurantAPI";
import { useSelector } from "react-redux";

export default function MainTodayGet({ likeList, myLocation }) {
  const [todayGet, setTodayGet] = useState();
  const category = useSelector((state) => state.categorySlice.category);

  // 오늘의 음식점 가져오기
  useEffect(() => {
    const fetchTodayGet = async () => {
      const todayGet = await getTodayRestaurant(myLocation, category);
      setTodayGet(todayGet);
    };
    fetchTodayGet();
  }, [category]);


    return (
        <div className="TodayGetWrap">
            <div className="TodayGetContainer">
                <ul>
                    {todayGet &&
                        todayGet.map((restaurant, index) => (
                        <li key={restaurant.strId}> {/* restaurant.id가 고유 식별자라고 가정 */}
                            <PlaceCard likeList={likeList} restaurant={restaurant}/>
                            <div className="scrollTextContent">
                                {restaurant.phone ?
                                    <div className="scrollTextLi">
                                        <p>{restaurant.phone}</p>
                                        <span onClick={() => (window.location.href = `tel:${restaurant.phone}`)}>연락하기</span>
                                    </div>
                                    :<></>
                                }
                                <div className="scrollTextLi">
                                    <p>{restaurant.address.split(" ")[0] + " " + restaurant.address.split(" ")[1] + " " + restaurant.address.split(" ")[2] + " " + restaurant.address.split(" ")[3]}</p>
                                    <span
                                        onClick={() => {
                                            navigator.clipboard.writeText(
                                                restaurant.address.split(" ")[0] + " " + restaurant.address.split(" ")[1] + " " + restaurant.address.split(" ")[2] + " " + restaurant.address.split(" ")[3]
                                            );
                                            alert("주소가 복사되었습니다.");
                                        }}
                                    >
                      주소복사
                    </span>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
