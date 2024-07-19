import React, { lazy, Suspense } from "react";
import LoadingPage from "../components/common/LoadingPage";

const Place = lazy(() => import("../pages/place/PlacePage"));
const Get = lazy(() => import("../pages/place/GetPage"));
const Add = lazy(() => import("../pages/place/AddPage"));

const placeRouter = () => {
  return [
    {
      path: "",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <Place />
        </Suspense>
      ),
    },
    {
      path: ":restaurantId",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <Place />
        </Suspense>
      ),
    },
    {
      path: "get/:restaurantId",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <Get />
        </Suspense>
      ),
    },
    {
      path: "add",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <Add />
        </Suspense>
      ),
    },
  ];
};
export default placeRouter;
