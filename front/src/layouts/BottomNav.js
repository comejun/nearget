import React from "react";
import UseCustomMove from "../hooks/useCustomMove";

export default function BottomNav() {
  const { moveToMain, moveToMap, moveToAdd, moveToMylike, moveToProfile } = UseCustomMove();

  return (
    <div className="bottomNavWrap">
      <div className="bottomNavContent">
        <div className="bottomNav">
          <ul>
            <li onClick={moveToMain}>
              <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/ic_home_bt.png"} />
            </li>
            <li onClick={moveToMap}>
              <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/ic_map_bt.png"} />
            </li>
            <li onClick={moveToAdd}>
              <img className="nav_Add_Btn" src={process.env.PUBLIC_URL + "/assets/imgs/icon/ic_add_bt.png"} />
            </li>
            <li onClick={moveToMylike}>
              <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/ic_like_bt.png"} />
            </li>
            <li onClick={moveToProfile}>
              <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/ic_pro_bt.png"} />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
