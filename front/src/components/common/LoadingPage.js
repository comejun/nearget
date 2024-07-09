import React from "react";
import BasicLayout from "../../layouts/BasicLayout";

const LoadingPage = () => {
  return (
    <BasicLayout>
      <div className="loadingPage">
        <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/Nearget_color.png"} />
        <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/loading.gif"} />
        <p>Now Loading...</p>
      </div>
    </BasicLayout>
  );
};
export default LoadingPage;
