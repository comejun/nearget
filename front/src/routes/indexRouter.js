import React, { lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";
import LoadingPage from "../components/common/LoadingPage";
import memberRouter from "./memberRouter";

const Main = lazy(() => import("../pages/MainPage"));
const Login = lazy(() => import("../pages/member/LoginPage"));

const Router = () => {
  return useRoutes([
    {
      path: "",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <Main />
        </Suspense>
      ),
    },
    {
      path: "Login",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <Login />
        </Suspense>
      ),
    },
    {
      path: "member",
      children: memberRouter(),
    },
  ]);
};
export default Router;
