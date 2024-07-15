import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRestaurantsLocation } from "../api/mapAPI";

// 두 좌표 사이의 거리를 계산하는 함수
function calculateDistance(location1, location2) {
  const R = 6371; // 지구의 반지름 (km)
  const dLat = ((location2.locationY - location1.lat) * Math.PI) / 180;
  const dLng = ((location2.locationX - location1.lng) * Math.PI) / 180;

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos((location1.lat * Math.PI) / 180) * Math.cos((location2.locationY * Math.PI) / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance;
}

export const getRestaurantsLocationList = createAsyncThunk("category/getRestaurantsLocation", async (category, thunkAPI) => {
  const data = await getRestaurantsLocation(category);
  return data;
});

export const setMyLocation = createAsyncThunk("category/setMyLocation", async (_, thunkAPI) => {
  return new Promise((resolve, reject) => {
    // TODO 시연용 위치 설정
    /* if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            get: true,
          });
        },
        (error) => {
          reject(error);
        }
      );
    } else {
      reject(new Error("Geolocation is not supported by this browser."));
    }*/
    resolve({
      lat: 37.55498771600092,
      lng: 126.93601217931102,
      get: true,
    });
  });
});

const initState = {
  category: "ALL",
  restaurantList: [],
  restaurantsLocationList: [],
  status: "idle",
  error: null,
  myLocation: { lat: 37.57163048751097, lng: 126.97591715920376 }, // 현재 위치를 상태에 추가
};

const categorySlice = createSlice({
  name: "CategorySlice",
  initialState: initState,
  reducers: {
    setCategory: (state, action) => {
      console.log("Setting category:", action.payload);
      state.category = action.payload;
    },
    // 검색어에 따라 필터링하는 액션 추가
    filterRestaurantsLocationList: (state, action) => {
      state.restaurantsLocationList = state.restaurantsLocationList.filter((restaurantsLocation) => {
        return restaurantsLocation.title.includes(action.payload);
      });
    },
  },
});

export const { setCategory, filterRestaurantsLocationList } = categorySlice.actions;
export default categorySlice.reducer;
