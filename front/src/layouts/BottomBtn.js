import React from "react";
import { Link } from "react-router-dom";

export default function BottomBtn({ btnTitle }) {
  return (
    <div className="bottomBtnWrap">
      <div className="bottomBtnContent">
        <button>{btnTitle}</button>
      </div>
    </div>
  );
}
