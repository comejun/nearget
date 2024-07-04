import React from 'react'
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import useCustomLogin from "../hooks/useCustomLogin";

const MainPage = () => {

    // 현재 로그인 된 회원의 이메일 가져오기
    const loginState = useSelector((state) => state.loginSlice);
    const { execLogout,moveToPath } = useCustomLogin();

    const handleClickLogout = () => {
        execLogout();
        moveToPath("/");

    };


    return (
        <div>MainPage

            {!loginState.email ? (
                <Link to="/member/login">go to Login</Link>
            ) : (
                <div onClick={handleClickLogout} className="MenuWrap">
                    <Link>
                        <h3>🔑 로그아웃</h3>
                        <span></span>
                    </Link>
                </div>
            )}

        </div>


    )
}
export default MainPage
