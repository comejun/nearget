import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"; // axios import
import BasicLayout from "../../layouts/BasicLayout";
import HeaderBack from "../../layouts/HeaderBack";
import BottomNav from "../../layouts/BottomNav";
import InfinityContentGetGroup from "../../layouts/InfinityContentGetGroup";
import { API_SERVER_HOST } from "../../staticData";
import LoadingPage from "../../components/common/LoadingPage";

const host = `${API_SERVER_HOST}/api/place`;
const imghost = `${API_SERVER_HOST}/api/image`;

const MyGetGroupPage = () => {
  const { groupId } = useParams();
  const [group, setGroup] = useState(null);

  useEffect(() => {
    axios
      .get(`${host}/group/${groupId}`)
      .then((response) => {
        setGroup(response.data);
      })
      .catch((error) => {
        console.error("Error fetching group:", error);
      });
  }, [groupId]);

  if (!group) {
    return (
      <div>
        <LoadingPage />
      </div>
    ); // 로딩 중일 때 처리
  }

  return (
    <BasicLayout>
      <HeaderBack imgSrc="/assets/imgs/icon/h1_Myget.png" />
      <div className="header_margin"></div>
      <div className="GetH1Wrap">
        <img className="GroupSum" src={`${imghost}/view/th_${group.thImg}`} />
        <h2 className="GroupTitle">{group.groupName}</h2>
        <div className="GetEditWrap">
          <img className="GetEditBtn" src={process.env.PUBLIC_URL + "/assets/imgs/icon/btn_edit.png"} />
        </div>
      </div>
      <div className="MainH2Wrap">
        <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/h2_PlaceList.png"} />
      </div>
      <InfinityContentGetGroup />
      <div className="textBtnWrap">
        <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/btn_AddMore.png"} />
      </div>
      <div className="bottom_margin"></div>
      <BottomNav />
    </BasicLayout>
  );
};
export default MyGetGroupPage;
