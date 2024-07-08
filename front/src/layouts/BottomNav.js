import React from "react";
import { Link } from "react-router-dom";

export default function BottomNav() {
  return (
    <div className="bottomNavWrap">
      <div className="bottomNavContent">
        <div className="bottomNav">
          <ul>
            <li>
              <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/ic_home_bt.png"} />
            </li>
            <li>
              <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/ic_map_bt.png"} />
            </li>
            <li>
              <img className="nav_Add_Btn" src={process.env.PUBLIC_URL + "/assets/imgs/icon/ic_add_bt.png"} />
            </li>
            <li>
              <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/ic_like_bt.png"} />
            </li>
            <li>
              <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/ic_pro_bt.png"} />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
