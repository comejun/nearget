import React from "react";

const BasicLayout = ({ children }) => {
  return (
    <>
      <div className="bodyWrap">
        <div className="contentWrap">{children}</div>
      </div>
    </>
  );
};

export default BasicLayout;
