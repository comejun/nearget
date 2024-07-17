import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import PlaceCard from "../components/common/PlaceCard";
import {getTodayRestaurant} from "../api/RestaurantAPI";

export default function MainTodayGet({myLocation}) {

    const [todayGet, setTodayGet] = useState()

    // 오늘의 음식점 가져오기
    useEffect(() => {
        const fetchTodayGet = async () => {
            const todayGet = await getTodayRestaurant(myLocation);
            setTodayGet(todayGet);
        };
        fetchTodayGet();
        console.log(todayGet);
    }, []);


    return (
        <div className="TodayGetWrap">
            <div className="TodayGetContainer">
                <ul>
                    {todayGet && todayGet.map((restaurant, index) => (
                        <li key={restaurant.id || index}> {/* restaurant.id가 고유 식별자라고 가정 */}
                            <PlaceCard restaurant={restaurant}/>
                            <div className="scrollTextContent">
                                <div className="scrollTextLi">
                                    <p>{restaurant.phone}</p>
                                    <span>연락하기</span>
                                </div>
                                <div className="scrollTextLi">
                                    {/*" "기준으로 분리후 0번째부터 4번째 인덱스 까지만 출력*/}
                                    <p>{restaurant.address.split(" ")[0] + " " + restaurant.address.split(" ")[1] + " " + restaurant.address.split(" ")[2] + " " + restaurant.address.split(" ")[3]}</p>
                                    <span>주소복사</span>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
