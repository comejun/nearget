import React from "react";
import { Link } from "react-router-dom";

export default function MainTodayGet() {
  return (
    <div className="TodayGetWrap">
      <div className="TodayGetContainer">
        <ul>
          <li>
            <div className="scrollContent">
              <img src={process.env.PUBLIC_URL + "/assets/imgs/sample.png"} />
            </div>
            <div className="scrollTextContent"></div>
          </li>
          <li>zz</li>
          <li>zz</li>
        </ul>
      </div>
    </div>
  );
}
