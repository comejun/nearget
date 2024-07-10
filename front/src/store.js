import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./slices/loginSlice";
import mapSlice from "./slices/mapSlice";
export default configureStore({
    reducer: {
        loginSlice: loginSlice,
        mapSlice: mapSlice,
    },
});