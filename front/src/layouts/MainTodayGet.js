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
            <div className="scrollTextContent">
              <div className="scrollTextLi">
                <p>02-777-2579</p>
                <span>연락하기</span>
              </div>
              <div className="scrollTextLi">
                <p>02-777-2579</p>
                <span>주소복사</span>
              </div>
            </div>
          </li>
          <li>zz</li>
          <li>zz</li>
        </ul>
      </div>
    </div>
  );
}
