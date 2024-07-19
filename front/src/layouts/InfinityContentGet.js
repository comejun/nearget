import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { API_SERVER_HOST } from "../staticData";
import UseCustomMove from "../hooks/useCustomMove";
import { getGroupsList, deleteGroup } from "../api/GroupAPI"; // 수정

export const host = `${API_SERVER_HOST}/api/group`; // 수정
const imghost = `${API_SERVER_HOST}/api/image`;

export default function InfinityContentGet() {
  const { moveToAdd, moveTomygetGroup } = UseCustomMove();

  // 현재 로그인 된 회원의 이메일 가져오기
  const userEmail = useSelector((state) => state.loginSlice.email);

  // 그룹 데이터를 저장할 상태
  const [groups, setGroups] = useState();

  // 그룹 삭제 함수
  const handleDeleteGroup = async (groupId) => {
    // 사용자에게 확인 메시지 표시
    if (window.confirm("정말로 이 그룹을 삭제하시겠습니까?")) {
      try {
        const response = await deleteGroup(groupId);
        console.log("Group deleted:", response);
        // 그룹 목록을 다시 불러옴
        fetchGroupsList();
      } catch (error) {
        console.error("Error deleting group:", error);
      }
    }
  };

  // 그룹 목록 불러오는 함수
  const fetchGroupsList = async () => {
    try {
      const groups = await getGroupsList(userEmail);
      console.log(groups);
      if (!groups || groups.length === 0) {
        alert("저장된 그룹이 없어 그룹 생성으로 이동합니다.");
        moveToAdd();
      } else {
        setGroups(groups);
      }
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  useEffect(() => {
    fetchGroupsList();
  }, [userEmail]);

  useEffect(() => {
    console.log(groups);
  }, [groups]);

  return (
    <div className="InfinityContentWrap">
      <div className="InfinityContent">
        <ul>
          {groups &&
            groups.map((group) => (
              <li key={group.groupId}>
                <img onClick={() => moveTomygetGroup(group.groupId)} className="InfinityContentSum" src={`${imghost}/view/th_${group.thImg}`} />
                <img className="GetDeleteBtn" src={process.env.PUBLIC_URL + "/assets/imgs/icon/ic_del.png"} onClick={() => handleDeleteGroup(group.groupId)} />
                <h2 className="GetGroupTitle">{group.groupName}</h2>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
