import { createSlice} from "@reduxjs/toolkit";

const initState = {
  category: "ALL",
  restaurantList: [],
};

const categorySlice = createSlice({
  name: "CategorySlice",
    initialState: initState,
    reducers: {
      setCategory: (state, action) => {
        console.log("Setting category:", action.payload);
        state.category = action.payload;
      },
    },

});

export const { setCategory } = categorySlice.actions;
export default categorySlice.reducer;