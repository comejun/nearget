import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { modifyMember, disableMember } from "../../api/memberAPI";
import BasicLayout from "../../layouts/BasicLayout";
import HeaderBack from "../../layouts/HeaderBack";
import useCustomLogin from "../../hooks/useCustomLogin";
import useMemberProfile from "../../hooks/useMemberProfile";
import useProfileImage from "../../hooks/useProfileImage";
import useCharacterCheck from "../../hooks/useCharacterCheck";
import UseCustomMove from "../../hooks/useCustomMove";

const ProfileEditPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { moveToProfile } = UseCustomMove();
  const { execLogout, moveToPath } = useCustomLogin();
  // 현재 로그인 된 회원의 이메일 가져오기
  const userEmail = useSelector((state) => state.loginSlice.email);

  // 수정이 필요한 회원 정보 가져오기
  const [member, setMember] = useState({});
  const memberProfile = useMemberProfile(userEmail).member;

  const memberProfileImg = useMemberProfile(userEmail).imgSrc;

  useEffect(() => {
    setMember(memberProfile);
  }, [memberProfile]);

  // 사진 수정용 CustomHook 사용하기
  const { imgSrc, handleFileChange, saveFile } = useProfileImage(memberProfileImg, memberProfile.profileImg);

  // 입력관련 방지 함수
  const { checkSpecialCharacters } = useCharacterCheck();

  const { exceptionHandle } = useCustomLogin();

  const handleChange = (e) => {
    member[e.target.name] = e.target.value;
    setMember({ ...member });
    console.log(member);
  };

  // 저장 클릭시 입력값 예외 처리용 함수
  const handleClickModify = (e) => {
    console.log("저장버튼 클릭");
    e.preventDefault(); // 이벤트의 기본 동작을 방지합니다.

    // 닉네임 입력 안했을 때
    if (member.nickname === "") {
      alert("닉네임을 입력해주세요.");
      return;
    }
    saveModify();
  };

  // 입력값 예외 처리후 실제 회원 정보 실제 저장 하는 함수
  const saveModify = async () => {
    if (!imgSrc.includes(member.profileImg)) {
      member.profileImg = await saveFile();
    }
    try {
      const res = await modifyMember(member);
      console.log(res);
    } catch (err) {
      exceptionHandle(err);
    }
    moveToProfile();
    alert("수정완료이 완료되었습니다.");
  };

  // 사용자 닉네임 글자 수 상태
  const [nicknameLength, setNicknameLength] = useState(0);

  // 닉네임 변경 핸들러
  const handleNicknameChange = (e) => {
    let value = e.target.value;

    // 특정 특수문자가 포함되어 있는지 확인
    if (/[ \{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/g.test(value)) {
      alert("특수문자는 입력할 수 없습니다.");

      // 특수문자 제거
      value = value.replace(/[ \{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/g, "");
    }

    const inputLength = value.length;
    if (inputLength <= 20) {
      e.target.value = value; // 이벤트 객체의 value 속성 업데이트
      handleChange(e); // 원래의 handleChange 함수 호출
      setNicknameLength(inputLength); // 글자 수 상태 업데이트
    }
  };

  // 회원탈퇴
  const handleClickDisabled = async () => {
    alert("회원 탈퇴가 완료되었습니다.");
    const response = await disableMember(userEmail);
    execLogout();
    moveToPath("/");
  };

  return (
    <BasicLayout>
      <HeaderBack imgSrc="/assets/imgs/icon/h1_EditProfile.png" />
      <div className="header_margin"></div>
      <form>
        <div className="MyModifyImg" style={member.profileImg !== "" ? { backgroundImage: `url(${imgSrc})` } : null}>
          <label htmlFor="fileInput">
            Edit
            <input id="fileInput" type="file" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} />
          </label>
        </div>
        <div className="MyModifyInput">
          <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/h2_Nickname.png"} />
          <input
            type="text"
            name="nickname"
            maxLength={14}
            placeholder="닉네임을 입력해주세요."
            value={member.nickname}
            onKeyUp={checkSpecialCharacters}
            onKeyDown={checkSpecialCharacters}
            onChange={handleNicknameChange}
          />
          <span
            style={{
              marginTop: "4px",
              color: "#BD8C5B",
              fontSize: "12px",
              textAlign: "right",
              display: "block",
            }}
          >
            {nicknameLength} / 14
          </span>
        </div>
        <div className="textBtnWrap">
          <img onClick={handleClickDisabled} src={process.env.PUBLIC_URL + "/assets/imgs/icon/btn_DeleteID.png"} alt="deleteID" />
        </div>
      </form>
      <div className="bottomBtnWrap">
        <div className="bottomBtnContent">
          <button onClick={handleClickModify}>Save</button>
        </div>
      </div>
    </BasicLayout>
  );
};
export default ProfileEditPage;
