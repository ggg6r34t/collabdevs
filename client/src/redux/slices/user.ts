import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { User } from "../../types/types";

type SingleUser = {
  userInformation: User | null;
  isLogin: boolean;
  isLoading: boolean;
};

const initialState: SingleUser = {
  userInformation: null,
  isLogin: false,
  isLoading: true,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<User>) => {
      state.userInformation = action.payload;
      state.isLogin = true;
      state.isLoading = false;
    },
    removeUserData: (state) => {
      state.userInformation = initialState.userInformation;
      localStorage.removeItem("userToken")
      state.isLogin = false;
      state.isLoading = false;
    },
  },
});

export const userActions = userSlice.actions;
const userReducer = userSlice.reducer;
export default userReducer;
