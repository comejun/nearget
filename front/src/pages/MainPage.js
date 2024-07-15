import { useEffect } from "react";
import { useSelector } from "react-redux";
import useCustomLogin from "../hooks/useCustomLogin";
import BasicLayout from "../layouts/BasicLayout";
import HeaderMain from "../layouts/HeaderMain";
import BottomNav from "../layouts/BottomNav";
import MainTodayGet from "../layouts/MainTodayGet";
import MainPriceby from "../layouts/MainPriceby";
import InfinityContent from "../layouts/InfinityContent";
import useMemberProfile from "../hooks/useMemberProfile";
import UseCustomMove from "../hooks/useCustomMove";

const MainPage = () => {
  // 현재 로그인 된 회원의 이메일 가져오기
  const loginState = useSelector((state) => state.loginSlice);
  const userEmail = useSelector((state) => state.loginSlice.email);
  const { moveToProfileEdit } = UseCustomMove();

  // 수정이 필요없는 조회용 회원 정보 가져오기
  const { member } = useMemberProfile(userEmail);

  useEffect(() => {
    console.log(userEmail);
    if (member.new) {
      moveToProfileEdit();
    }
  }, [member.new]);

  const { execLogout, moveToPath } = useCustomLogin();

  const handleClickLogout = () => {
    execLogout();
    moveToPath("/");
  };

  return (
    <BasicLayout>
      <HeaderMain />
      <div className="header_margin_main"></div>
      <div className="MainH2Wrap">
        <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/h2_Todaysget.png"} />
      </div>
      <MainTodayGet />
      <div className="MainH2Wrap">
        <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/h2_PricebyPlace.png"} />
      </div>
      <MainPriceby />
      <div className="MainH2Wrap">
        <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/h2_NearbyPlace.png"} />
      </div>
      <InfinityContent />
      <div className="bottom_margin"></div>
      <BottomNav />
    </BasicLayout>
  );
};
export default MainPage;
