import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getRestaurants } from "../../api/RestaurantAPI";
import BasicLayout from "../../layouts/BasicLayout";
import HeaderBack from "../../layouts/HeaderBack";

const GetPage = () => {
  const loginState = useSelector((state) => state.loginSlice);
  const { restaurantId } = useParams();
  const [restaurantData, setRestaurantData] = useState();

  useEffect(() => {
    const fetchRestaurant = async () => {
      const restaurant = await getRestaurants(restaurantId);
      setRestaurantData(restaurant);
      console.log("restaurant : ", restaurant);
    };

    fetchRestaurant();
  }, [restaurantId]);

  return (
    <BasicLayout>
      <HeaderBack imgSrc="/assets/imgs/icon/h1_GetPlace.png" />
      <div className="header_margin"></div>
      <div className="placeContentWrap">
        <img src={process.env.PUBLIC_URL + "/assets/imgs/sample.png"} />
        <h3>양식</h3>
      </div>
      <div className="PlaceH2Wrap">
        <h2 className="GetPageMargin">라칸티나</h2>
      </div>
      <form>
        <div className="MyModifyInput">
          <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/h2_GetGroup.png"} />
          <select name="nickname">
            <option value="" selected disabled hidden>
              그룹을 선택해주세요.
            </option>
            <option value="01sample">sample</option>
          </select>
        </div>
        <div className="bottom_margin"></div>

        <div className="bottomBtnWrap">
          <div className="bottomBtnContent">
            <button>Save</button>
          </div>
        </div>
      </form>
    </BasicLayout>
  );
};
export default GetPage;
