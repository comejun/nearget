import React from "react";
import UseCustomMove from "../hooks/useCustomMove";
import { getCookie } from "../util/cookieUtil";
import {useSelector} from "react-redux";

export default function BottomNav() {
  const { moveToMain, moveToMap, moveToAdd, moveToMylike, moveToProfile, moveToLogin } = UseCustomMove();
  const loginState = useSelector((state) => state.loginSlice);

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
            <li onClick={loginState.email ? moveToAdd : moveToLogin}>
              <img className="nav_Add_Btn" src={process.env.PUBLIC_URL + "/assets/imgs/icon/ic_add_bt.png"} />
            </li>
            <li onClick={loginState.email ? moveToMylike : moveToLogin}>
              <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/ic_like_bt.png"} />
            </li>
            <li onClick={loginState.email ? moveToProfile : moveToLogin}>
              <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/ic_pro_bt.png"} />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
