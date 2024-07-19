import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import BasicLayout from "../../layouts/BasicLayout";
import HeaderBack from "../../layouts/HeaderBack";
import { getGroup, getGroupList, postEditGroup } from "../../api/GroupAPI";
import useCustomMove from "../../hooks/useCustomMove";
import useProfileImage from "../../hooks/useProfileImage";
import LoadingPage from "../../components/common/LoadingPage";
import { API_SERVER_HOST } from "../../staticData";

const imghost = `${API_SERVER_HOST}/api/image`;

const MyGetGroupEditPage = () => {
  const { moveTomygetGroup } = useCustomMove();
  const { groupId } = useParams();
  const userEmail = useSelector((state) => state.loginSlice.email);

  const [group, setGroup] = useState(null);
  const [groupList, setGroupList] = useState();

  // 사진 수정용 CustomHook 사용하기
  const { imgSrc, handleFileChange, saveFile } = useProfileImage(null, "http:");

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

  // 그룹명 길이 상태
  const [groupNameLength, setGroupNameLength] = useState(0);

  // 그룹명 길이 업데이트
  const handleChangeGroup = (e) => {
    const inputLength = e.target.value.length;
    if (inputLength <= 20) {
      setGroup((prevGroup) => ({ ...prevGroup, groupName: e.target.value }));
      setGroupNameLength(inputLength);
    }
  };

  // 그룹 저장 처리
  const handleClickSave = (e) => {
    e.preventDefault(); // 이벤트의 기본 동작을 방지합니다.

    // 예외 처리
    if (imgSrc === null && !group.thImg) {
      alert("이미지가 등록되지 않았습니다.");
      const imageDiv = document.querySelector(".GroupSum");
      imageDiv.setAttribute("tabindex", "0");
      imageDiv.focus();
      return; // 함수 실행을 여기서 중단합니다.
    }
    if (group.groupName === "") {
      alert("그룹명이 입력되지 않았습니다.");
      document.getElementsByName("groupName")[0].focus();
      return; // 함수 실행을 여기서 중단합니다.
    }

    saveEdit();
  };

  // 수정 내용 서버 전송
  const saveEdit = async () => {
    if (imgSrc) {
      group.thImg = await saveFile();
    }

    const formData = new FormData();
    formData.append("thImg", group.thImg);
    formData.append("groupName", group.groupName);
    formData.append("memberEmail", userEmail);
    formData.append("groupId", groupId);
    console.log(formData);

    // 서버로 데이터를 전송하는 코드
    postEditGroup(formData).then((data) => {
      console.log("postEditGroup result : ", data);
      alert("수정완료");
      moveTomygetGroup(group.groupId);
    });
  };

  if (!group) {
    return (
      <div>
        <LoadingPage />
      </div>
    ); // 로딩 중일 때 처리
  }

  return (
    <BasicLayout>
      <HeaderBack imgSrc="/assets/imgs/icon/h1_EditGet.png" />
      <div className="header_margin"></div>
      <form>
        <div className="GetH1Wrap">
          <img className="GroupSum" src={imgSrc ? imgSrc : group.thImg ? `${imghost}/view/th_${group.thImg}` : process.env.PUBLIC_URL + "/assets/imgs/sample.png"} />
          <label htmlFor="fileInput">
            <h3 className="GroupTitleEdit">Edit</h3>
            <input id="fileInput" type="file" onChange={handleFileChange} style={{ display: "none" }} />
          </label>
        </div>
        <div className="MyModifyInput">
          <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/h2_GetName.png"} />
          <input type="text" name="groupName" maxLength="20" placeholder="그룹명을 입력해주세요." value={group.groupName} onChange={handleChangeGroup} />
          <span
            style={{
              marginTop: "4px",
              color: "#BD8C5B",
              fontSize: "12px",
              textAlign: "right",
              display: "block",
            }}
          >
            {groupNameLength} / 20
          </span>
        </div>
        <div className="bottom_margin"></div>

        <div className="bottomBtnWrap">
          <div className="bottomBtnContent">
            <button onClick={handleClickSave}>Save</button>
          </div>
        </div>
      </form>
    </BasicLayout>
  );
};
export default MyGetGroupEditPage;
