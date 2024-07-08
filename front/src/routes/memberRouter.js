import React, { lazy, Suspense } from "react";
import LoadingPage from "../components/common/LoadingPage";

const Login = lazy(() => import("../pages/member/LoginPage"));
const Profile = lazy(() => import("../pages/member/ProfilePage"));
const Edit = lazy(() => import("../pages/member/ProfileEditPage"));
const KakaoRedirect = lazy(() => import("../pages/member/KakaoRedirectPage"));
const MyGet = lazy(() => import("../pages/member/MygetPage"));
const MyLike = lazy(() => import("../pages/member/MylikePage"));

const memberRouter = () => {
  return [
    {
      path: "login",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <Login />
        </Suspense>
      ),
    },
    {
      path: "profile",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <Profile />
        </Suspense>
      ),
    },
    {
      path: "Edit",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <Edit />
        </Suspense>
      ),
    },
    {
      path: "kakao",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <KakaoRedirect />
        </Suspense>
      ),
    },
    {
      path: "mylike",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <MyLike />
        </Suspense>
      ),
    },
    {
      path: "myget",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <MyGet />
        </Suspense>
      ),
    },
  ];
};
export default memberRouter;
