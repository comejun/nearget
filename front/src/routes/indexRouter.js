import React, { lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";
import LoadingPage from "../components/common/LoadingPage";
import memberRouter from "./memberRouter";
import placeRouter from "./placeRouter";

const Main = lazy(() => import("../pages/MainPage"));
const Login = lazy(() => import("../pages/member/LoginPage"));
const Map = lazy(() => import("../pages/map/MapPage"));

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
      path: "map",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <Map />
        </Suspense>
      ),
    },
    {
      path: "place",
      children: placeRouter(),
    },
    {
      path: "member",
      children: memberRouter(),
    },
    {
      path: "load",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <LoadingPage />
        </Suspense>
      ),
    },
  ]);
};
export default Router;
