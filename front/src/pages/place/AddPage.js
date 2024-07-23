import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { postAdd } from "../../api/GroupAPI";
import BasicLayout from "../../layouts/BasicLayout";
import HeaderBack from "../../layouts/HeaderBack";
import useProfileImage from "../../hooks/useProfileImage";
import UseCustomMove from "../../hooks/useCustomMove";

const initState = {
  thImg: "",
  groupName: "",
  memberEmail: "",
};

const AddPage = () => {
  const { moveToMygetList } = UseCustomMove();
  const userEmail = useSelector((state) => state.loginSlice.email);

  // 그룹 저장값 state
  const [restaurantsGroup, setRestaurantsGroup] = useState(initState);

  // 사진 수정용 CustomHook 사용하기
  const { imgSrc, handleFileChange, saveFile } = useProfileImage(null, "http:");

  const handleChange = (e) => {
    restaurantsGroup.groupName= e;
    setRestaurantsGroup({ ...restaurantsGroup });
    console.log(restaurantsGroup);
  };

  const [groupNameLength, setGroupNameLength] = useState(0);

  const handleChangeGroup = (e) => {
    let value = e.target.value;

    // 특정 특수문자가 포함되어 있는지 확인
    if (/[ \{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/g.test(value)) {
      alert("특수문자는 입력할 수 없습니다.");

      // 특수문자 제거
      value = value.replace(/[ \{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/g, "");
    }

    const inputLength = value.length;
    if (inputLength <= 20) {
      handleChange(value); // 원래의 handleChange 함수 호출
      setGroupNameLength(inputLength); // 글자 수 상태 업데이트
    }
  };

  const handleClickAdd = (e) => {
    e.preventDefault(); // 이벤트의 기본 동작을 방지합니다.

    // 확인 처리
    if (imgSrc === null) {
      alert("이미지가 등록되지 않았습니다.");
      const imageDiv = document.querySelector(".GroupSum");
      imageDiv.setAttribute("tabindex", "0");
      imageDiv.focus();
      return; // 함수 실행을 여기서 중단합니다.
    }
    if (restaurantsGroup.groupName === "") {
      alert("그룹명이 입력되지 않았습니다.");
      document.getElementsByName("groupName")[0].focus();
      return; // 함수 실행을 여기서 중단합니다.
    }

    saveAdd();
  };

  // 입력값 예외 처리 후 실제 저장 함수
  const saveAdd = async () => {
    restaurantsGroup.thImg = await saveFile();

    const formData = new FormData();
    formData.append("thImg", restaurantsGroup.thImg);
    formData.append("groupName", restaurantsGroup.groupName);
    formData.append("memberEmail", userEmail);
    console.log(formData);

    // 여기에 서버로 데이터를 전송하는 코드를 추가합니다.
    postAdd(formData).then((data) => {
      console.log("postAdd result : ", data);
      alert("저장완료");
      moveToMygetList();
    });
  };

  return (
    <BasicLayout>
      <HeaderBack imgSrc="/assets/imgs/icon/h1_AddGet.png" />
      <div className="header_margin"></div>
      <form>
        <div className="GetH1Wrap">
          <img className="GroupSum" src={imgSrc ? imgSrc : process.env.PUBLIC_URL + "/assets/imgs/icon/EditImgBack.png"} />
          <label htmlFor="fileInput">
            <h3 className="GroupTitleEdit">Edit</h3>
            <input id="fileInput" type="file" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} />
          </label>
        </div>
        <div className="MyModifyInput">
          <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/h2_GetName.png"} />
          <input type="text" name="groupName" maxLength="20" placeholder="그룹명을 입력해주세요." onChange={handleChangeGroup} />
          <span
            style={{
              marginTop: "4px",
              color: "#BD8C5B",
              fontSize: "12px",
              textAlign: "right",
              display: "block",
            }}
          >
            {groupNameLength} / 14
          </span>
        </div>
        <div className="bottom_margin"></div>

        <div className="bottomBtnWrap">
          <div className="bottomBtnContent">
            <button onClick={handleClickAdd}>Save</button>
          </div>
        </div>
      </form>
    </BasicLayout>
  );
};
export default AddPage;
