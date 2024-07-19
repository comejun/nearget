import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { API_SERVER_HOST } from "../../staticData";
import { useSelector } from "react-redux";
import { getRestaurants } from "../../api/RestaurantAPI";
import BasicLayout from "../../layouts/BasicLayout";
import HeaderBack from "../../layouts/HeaderBack";
import UseCustomMove from "../../hooks/useCustomMove";
import jwtAxios from "../../util/jwtUtil";
import {addGroupData, getGroupsList} from "../../api/GroupAPI";

export const host = `${API_SERVER_HOST}/api/place`;

const GetPage = () => {
  const loginState = useSelector((state) => state.loginSlice);
  const { moveToAdd, moveToMygetList } = UseCustomMove();
  const userEmail = useSelector((state) => state.loginSlice.email);
  const { restaurantId } = useParams();
  const [restaurantData, setRestaurantData] = useState(null);
  const [groups, setGroups] = useState([]);
  // const [selectedGroup, setSelectedGroup] = useState("");
  const [addData, setAddData] = useState({})

  const getCategoryValue = (category) => {
    switch (category) {
      case "WESTERN":
        return "양식";
      case "CAFE":
        return "카페";
      case "KOREAN":
        return "한식";
      case "CHINESE":
        return "중식";
      case "JAPANESE":
        return "일식";
      case "FASTFOOD":
        return "패스트푸드";
      case "PUB":
        return "술집";
      case "STREET":
        return "분식";
      default:
        return "";
    }
  };

  // 그룹 목록 조회
  const fetchGroups = async () => {
    const groups = await getGroupsList(userEmail)
    console.log(groups);
    if(!groups || groups.length === 0){
      alert("저장된 그룹이 없어 그룹 생성으로 이동합니다.");
      moveToAdd();
    } else {
      setGroups(groups);
    }
  };

  // 식당 정보 조회
  useEffect(() => {
    const fetchRestaurant = async () => {
      const restaurant = await getRestaurants(restaurantId);
      setRestaurantData(restaurant);
      addData.restaurantId = restaurant.strId;
      setAddData({ ...addData });
      console.log("restaurant : ", restaurant);
    };

    fetchRestaurant();
  }, [restaurantId]);

  useEffect(() => {
    fetchGroups();
  }, [userEmail]);

  const handleChange = (e) => {
    addData[e.target.name] = e.target.value;
    setAddData({ ...addData });
    console.log(addData);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!addData.groupId) {
      alert("그룹을 선택해주세요.");
      return;
    }

    try {
      await addGroupData(addData);
      alert("식당이 그룹에 추가되었습니다.");
      moveToMygetList();
    } catch (error) {
      console.error("Error adding restaurant to group:", error);
      alert("식당을 그룹에 추가하는 중 오류가 발생했습니다.");
    }
  };

  return (
    <BasicLayout>
      <HeaderBack imgSrc="/assets/imgs/icon/h1_GetPlace.png" />
      <div className="header_margin"></div>
      <div className="placeContentWrap">
        {restaurantData &&
          (restaurantData.image === "없음" || restaurantData.image === "이미지없음" ? <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/NoImg.png"} /> : <img src={restaurantData.image} />)}
      </div>
      <div className="PlaceH2Wrap">
        <h2 className="GetPageMargin">{restaurantData ? restaurantData.name : "Loading..."}</h2>
        <h3>{restaurantData ? getCategoryValue(restaurantData.category) : "Loading..."}</h3>
      </div>
      <form onSubmit={handleSave}>
        <div className="MyModifyInput">
          <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/h2_GetGroup.png"} />
          <select name="groupId" onChange={handleChange}>
            <option value="" selected disabled hidden>
              그룹을 선택해주세요.
            </option>
            {groups.map((group) => (
              <option key={group.groupId} value={group.groupId}>
                {group.groupName}
              </option>
            ))}
          </select>
        </div>
        <div className="bottom_margin"></div>

        <div className="bottomBtnWrap">
          <div className="bottomBtnContent">
            <button type="submit">Save</button>
          </div>
        </div>
      </form>
    </BasicLayout>
  );
};

export default GetPage;
