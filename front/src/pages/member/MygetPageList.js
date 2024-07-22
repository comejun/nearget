import React, { useEffect } from "react";
import BasicLayout from "../../layouts/BasicLayout";
import HeaderBack from "../../layouts/HeaderBack";
import BottomNav from "../../layouts/BottomNav";
import InfinityContentGet from "../../layouts/InfinityContentGet";
import UseCustomMove from "../../hooks/useCustomMove";

const MyGetListPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { moveToAdd } = UseCustomMove();

  return (
    <BasicLayout>
      <HeaderBack imgSrc="/assets/imgs/icon/h1_Myget.png" />
      <div className="header_margin"></div>
      <InfinityContentGet />
      <div className="textBtnWrap">
        <img onClick={moveToAdd} src={process.env.PUBLIC_URL + "/assets/imgs/icon/btn_AddGet.png"} />
      </div>
      <div className="bottom_margin"></div>
      <BottomNav />
    </BasicLayout>
  );
};
export default MyGetListPage;
