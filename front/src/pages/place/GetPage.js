import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { API_SERVER_HOST } from "../../staticData";
import { useSelector } from "react-redux";
import { getRestaurants } from "../../api/RestaurantAPI";
import BasicLayout from "../../layouts/BasicLayout";
import HeaderBack from "../../layouts/HeaderBack";
import UseCustomMove from "../../hooks/useCustomMove";

export const host = `${API_SERVER_HOST}/api/place`;

const GetPage = () => {
  const loginState = useSelector((state) => state.loginSlice);
  const { moveToAdd } = UseCustomMove();
  // 현재 로그인 된 회원의 이메일 가져오기
  const userEmail = useSelector((state) => state.loginSlice.email);
  const { restaurantId } = useParams();
  const [restaurantData, setRestaurantData] = useState(null); // 초기값을 null로 설정
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

  // 그룹 데이터를 저장할 상태
  const [groups, setGroups] = useState([]);

  // 그룹 목록 불러오는 함수
  const fetchGroups = () => {
    axios
      .get(`${host}/groups?email=${userEmail}`)
      .then((response) => {
        if (!response.data || response.data.length === 0) {
          alert("저장된 그룹이 없어 그룹 생성으로 이동합니다.");
          moveToAdd();
        } else {
          setGroups(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching groups:", error);
      });
  };

  useEffect(() => {
    const fetchRestaurant = async () => {
      const restaurant = await getRestaurants(restaurantId);
      setRestaurantData(restaurant);
      console.log("restaurant : ", restaurant);
    };

    fetchRestaurant();
  }, [restaurantId]);

  useEffect(() => {
    fetchGroups();
  }, [userEmail]);

  useEffect(() => {
    console.log(groups);
  }, [groups]);

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
      <form>
        <div className="MyModifyInput">
          <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/h2_GetGroup.png"} />
          <select name="nickname">
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
            <button>Save</button>
          </div>
        </div>
      </form>
    </BasicLayout>
  );
};

export default GetPage;
