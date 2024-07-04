import React, {lazy, Suspense} from 'react'
import LoadingPage from "../components/common/LoadingPage";

const Login = lazy(() => import("../pages/member/LoginPage"))
const KakaoRedirect = lazy(() => import("../pages/member/KakaoRedirectPage"))

const memberRouter = () => {
    return [
        {
            path: "login",
            element: (
                <Suspense fallback={<LoadingPage/>}>
                    <Login/>
                </Suspense>
            )
        },
        {
            path: "kakao",
            element: (
                <Suspense fallback={<LoadingPage />}>
                    <KakaoRedirect />
                </Suspense>
            ),
        },
    ]
}
export default memberRouter
