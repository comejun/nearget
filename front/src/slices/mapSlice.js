import {createSlice} from "@reduxjs/toolkit";

const initState = {
    myLocationBtnClicked: false,
}

const MapSlice = createSlice({
    name: "MapSlice",
    initialState: initState,
    reducers: {
        clickedMyLocationBtn: (state) => {
            state.myLocationBtnClicked = !state.myLocationBtnClicked;
        }

    },
});

export const { clickedMyLocationBtn } = MapSlice.actions;
export default MapSlice.reducer;