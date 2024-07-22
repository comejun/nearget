import {createSlice} from "@reduxjs/toolkit";

const initState = { searchText: ""};

const searchSlice = createSlice({
    name: "SearchSlice",
    initialState: initState,
    reducers: {
        setSearchText: (state, action) => {
            console.log("setSearchText");
            state.searchText = action.payload;
        },
    }
})

export const { setSearchText } = searchSlice.actions;
export default searchSlice.reducer;