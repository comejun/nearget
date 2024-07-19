import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getKakaoLoginLink } from "../../api/kakaoAPI";
import BasicLayout from "../../layouts/BasicLayout";
import HeaderBack from "../../layouts/HeaderBack";
import UseCustomMove from "../../hooks/useCustomMove";
import BottomNav from "../../layouts/BottomNav";
import useMemberProfile from "../../hooks/useMemberProfile";
import { logout } from "../../slices/loginSlice";

const ProfilePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const dispatch = useDispatch();
  const kakaoLoginLink = getKakaoLoginLink();
  const { moveToProfileEdit, moveToMylike, moveToMygetList, moveToMain } = UseCustomMove();
  // 현재 로그인 된 회원의 이메일 가져오기
  const userEmail = useSelector((state) => state.loginSlice.email);

  // 수정이 필요없는 조회용 회원 정보 가져오기
  const { member, imgSrc } = useMemberProfile(userEmail);

  // 로그아웃
  const handleLogout = () => {
    dispatch(logout());
    alert("로그아웃 되었습니다.");
    moveToMain();
  };

  return (
    <BasicLayout>
      <HeaderBack imgSrc="/assets/imgs/icon/h1_Profile.png" />
      <div className="header_margin"></div>
      <div className="ProfileWrap">
        <div
          className="PoImgWrap"
          style={
            imgSrc !== ""
              ? {
                  backgroundImage: `url(${imgSrc})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }
              : null
          }
        ></div>

        <div className="PoTextWrap">
          <h3>{member.nickname}</h3>
          <p>{member.email}</p>
        </div>

        <div className="PoEditWrap">
          <img onClick={moveToProfileEdit} src={process.env.PUBLIC_URL + "/assets/imgs/icon/btn_edit.png"} />
        </div>
      </div>
      <div onClick={moveToMylike} className="ProfileListWrap">
        <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/h2_MyLike.png"} />
        <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/ic_aro.png"} />
      </div>
      <div onClick={moveToMygetList} className="ProfileListWrap">
        <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/h2_MyGet.png"} />
        <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/ic_aro.png"} />
      </div>
      <div className="textBtnWrap">
        <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/btn_LogOut.png"} alt="logout" onClick={handleLogout} />
      </div>
      <div className="bottom_margin"></div>
      <BottomNav />
    </BasicLayout>
  );
};
export default ProfilePage;
