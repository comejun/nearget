import React, {lazy, Suspense} from 'react'
import LoadingPage from "../components/common/LoadingPage";

const Login = lazy(() => import("../pages/member/LoginPage"))

const memberRouter = () => {
    return [
        {
            path: "login",
            element: (
                <Suspense fallback={<LoadingPage/>}>
                    <Login/>
                </Suspense>
            )
        }
    ]
}
export default memberRouter
