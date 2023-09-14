import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { User, UserGoogle } from "../../type/types";

type SingleUser = {
  userInformation: User | null;
  UserGoogle: UserGoogle;
  isLogin: boolean;
  isLoading: boolean;
};

const initialState: SingleUser = {
  userInformation: null,
  UserGoogle: {
    _id: "",
    email: "",
    firstName: "",
    lastName: "",
    userName: "",
    avatar: "",
  },
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
      localStorage.setItem("SingleUser", JSON.stringify(state));
    },
    removeUserData: (state) => {
      state.userInformation = initialState.userInformation;
      localStorage.removeItem("userToken");
      localStorage.removeItem("SingleUser");
      state.isLogin = false;
      state.isLoading = false;
    },
  },
});

export const userActions = userSlice.actions;
const userReducer = userSlice.reducer;
export default userReducer;