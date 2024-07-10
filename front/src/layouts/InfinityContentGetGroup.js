import React from "react";
import { Link } from "react-router-dom";

export default function InfinityContentGetGroup() {
  return (
    <div className="InfinityContentWrap">
      <div className="InfinityContent">
        <ul>
          <li>
            <img className="InfinityContentSum" src={process.env.PUBLIC_URL + "/assets/imgs/sample2.png"} />
            <img className="GetDeleteBtn" src={process.env.PUBLIC_URL + "/assets/imgs/icon/ic_del.png"} />
            <div className="infinityItemTitle">
              <div>
                <h4>양식</h4>
                <span>
                  0.14<span>Km</span>
                </span>
              </div>
            </div>
            <h3>바베큐집</h3>
          </li>
        </ul>
      </div>
    </div>
  );
}
