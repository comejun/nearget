import React from 'react'
import { Link } from "react-router-dom";
import { getKakaoLoginLink } from "../../api/kakaoAPI";

const LoginPage = () => {

    const kakaoLoginLink = getKakaoLoginLink();

    return (
        <div className="loginWrap">
            <h2>🧑🏻‍💻 함께 성장할 크루를 모집해보세요</h2>
            <h3>코드크루는 IT 스터디모임 플랫폼입니다.</h3>

            <Link to={kakaoLoginLink}>
                <button>
                    <img src="../assets/imgs/icon/ic_kakaoLogo.svg" alt="kakaologo"/>
                    <span>카카오톡으로 로그인</span>
                </button>
            </Link>
            <Link to="/">go to Main</Link>
        </div>
    )
}
export default LoginPage
