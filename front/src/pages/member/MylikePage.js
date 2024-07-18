import { getKakaoLoginLink } from "../../api/kakaoAPI";
import BasicLayout from "../../layouts/BasicLayout";
import HeaderBack from "../../layouts/HeaderBack";
import BottomNav from "../../layouts/BottomNav";
import InfinityContentLike from "../../layouts/InfinityContentLike";
const MylikePage = () => {
  const kakaoLoginLink = getKakaoLoginLink();

  return (
    <BasicLayout>
      <HeaderBack imgSrc="/assets/imgs/icon/h1_Mylike.png" />
      <div className="header_margin"></div>
      <InfinityContentLike />
      <div className="bottom_margin"></div>
      <BottomNav />
    </BasicLayout>
  );
};
export default MylikePage;
