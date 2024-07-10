import React, { lazy, Suspense } from "react";
import LoadingPage from "../components/common/LoadingPage";

const Place = lazy(() => import("../pages/place/PlacePage"));
const Get = lazy(() => import("../pages/place/GetPage"));
const Add = lazy(() => import("../pages/place/AddPage"));
const Edit = lazy(() => import("../pages/place/EditPage"));

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
      path: "place",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <Place />
        </Suspense>
      ),
    },
    {
      path: "get",
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
    {
      path: "edit",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <Edit />
        </Suspense>
      ),
    },
  ];
};
export default placeRouter;
