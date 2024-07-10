import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./slices/loginSlice";
import mapSlice from "./slices/mapSlice";
import categorySlice from "./slices/categorySlice";
export default configureStore({
    reducer: {
        loginSlice: loginSlice,
        mapSlice: mapSlice,
        categorySlice: categorySlice,
    },
});