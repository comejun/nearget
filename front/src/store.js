import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./slices/loginSlice";
import mapSlice from "./slices/mapSlice";
import categorySlice from "./slices/categorySlice";
import searchSlice from "./slices/searchSlice";
export default configureStore({
    reducer: {
        loginSlice: loginSlice,
        mapSlice: mapSlice,
        categorySlice: categorySlice,
        searchSlice: searchSlice,
    },
});