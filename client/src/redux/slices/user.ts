import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { User } from "../../types/types";

type SingleUser = {
  userInformation: User | null;
  isLogin: boolean;
  isLoading: boolean;
};

const storedUserState = localStorage.getItem("userState");
const initialState: SingleUser = storedUserState
  ? JSON.parse(storedUserState)
  : {
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
    userLogin: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
      localStorage.setItem("userState", JSON.stringify(state));
    },
    removeUserData: (state) => {
      state.userInformation = initialState.userInformation;
      localStorage.removeItem("userToken")
      localStorage.removeItem("userState")
      state.isLogin = false;
      state.isLoading = false;
    },
  },
});

export const userActions = userSlice.actions;
const userReducer = userSlice.reducer;
export default userReducer;
