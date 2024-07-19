import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BasicLayout from "../../layouts/BasicLayout";
import HeaderBack from "../../layouts/HeaderBack";
import BottomNav from "../../layouts/BottomNav";
import InfinityContentGetGroup from "../../layouts/InfinityContentGetGroup";
import { API_SERVER_HOST } from "../../staticData";
import LoadingPage from "../../components/common/LoadingPage";
import {getGroup, getGroupList} from "../../api/GroupAPI";
import useCustomMove from "../../hooks/useCustomMove";

const imghost = `${API_SERVER_HOST}/api/image`;

const MyGetGroupPage = () => {
    const {moveToMain} = useCustomMove();
  const { groupId } = useParams();
  const [group, setGroup] = useState(null);
    const [groupList, setGroupList] = useState()

  // 그룹 정보 조회
  useEffect(() => {
      const fetchGroupData = async () => {
          const groupData = await getGroup(groupId);
          setGroup(groupData);
          console.log(groupData);
      };
      fetchGroupData();
  }, [groupId]);

  // 그룹안 내용 조회
    useEffect(() => {
        const fetchGroupList = async () => {
            const groupList = await getGroupList(groupId);
            setGroupList(groupList);
            console.log(groupList);
        };
        fetchGroupList();
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

{/*groupList가 존재하고 길이가 0보다크다면*/}
        {groupList && groupList.length > 0 ? (
            <InfinityContentGetGroup restaurantsList={groupList} />
        ):<></>}
      <div className="textBtnWrap">
        <img onClick={moveToMain}
            src={process.env.PUBLIC_URL + "/assets/imgs/icon/btn_AddMore.png"} />
      </div>
      <div className="bottom_margin"></div>
      <BottomNav />
    </BasicLayout>
  );
};
export default MyGetGroupPage;
