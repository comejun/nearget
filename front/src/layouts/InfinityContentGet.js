import React from "react";
import { Link } from "react-router-dom";

export default function InfinityContentGet() {
  return (
    <div className="InfinityContentWrap">
      <div className="InfinityContent">
        <ul>
          <li>
            <img className="InfinityContentSum" src={process.env.PUBLIC_URL + "/assets/imgs/sample2.png"} />
            <img className="GetDeleteBtn" src={process.env.PUBLIC_URL + "/assets/imgs/icon/ic_del.png"} />
            <h2 className="GetGroupTitle">내가 갈집</h2>
          </li>
        </ul>
      </div>
    </div>
  );
}
