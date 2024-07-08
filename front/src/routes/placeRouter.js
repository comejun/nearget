import React, { lazy, Suspense } from "react";
import LoadingPage from "../components/common/LoadingPage";

const Place = lazy(() => import("../pages/place/PlacePage"));
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
      path: "place",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <Place />
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
