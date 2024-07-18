import React, {useEffect, useState} from "react";
import {getPriceRestaurant} from "../api/RestaurantAPI";
import PlaceCard from "../components/common/PlaceCard";
import {useSelector} from "react-redux";

export default function MainPriceby({likeList, myLocation}) {

    const [priceBy, setPriceBy] = useState([])
    const category = useSelector((state) => state.categorySlice.category);


    // 오늘의 음식점 가져오기
    useEffect(() => {
        const fetchPriceBy = async () => {
            const priceGet = await getPriceRestaurant(myLocation,category);
            setPriceBy(priceGet);
        };
        fetchPriceBy();
    }, [category]);


    return (
        <div className="PricebyPlaceWrap">
            <div className="PricebyPlaceContainer">
                <ul>
                    {priceBy.map((restaurant, index) => (
                        <li key={restaurant.strId}>
                            <PlaceCard likeList={likeList} restaurant={restaurant}/>

                            <div className="scrollTextContent">
                                {restaurant.menuList.sort((a, b) => a.price - b.price).slice(0, 2).map((menu, menuIndex) => (
                                    <div key={menu.id || menuIndex} className="scrollTextLi">
                                        <p>{menu.menuName}</p>
                                        <span>{menu.price}<span>원</span></span>
                                    </div>
                                ))}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
