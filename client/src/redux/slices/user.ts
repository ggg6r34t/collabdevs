import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { User, UserGoogle } from "../../type/types";

type SingleUser = {
  userInformation: User | null;
  UserGoogle: UserGoogle;
  isLogin: boolean;
  isLoading: boolean;
  rememberMe: boolean;
  token: string | null;
};

const storedUserState = localStorage.getItem("userState");
const initialState: SingleUser = storedUserState
  ? JSON.parse(storedUserState)
  : {
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
      rememberMe: false,
      token: null,
    };

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<User>) => {
      state.userInformation = action.payload;
      state.isLoading = true;

      localStorage.setItem("userState", JSON.stringify(state));
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    userSignIn: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
      state.isLoading = false;

      localStorage.setItem("userState", JSON.stringify(state));
      localStorage.setItem("SingleUser", JSON.stringify(state));
    },
    removeUserData: (state) => {
      state.userInformation = initialState.userInformation;
      state.isLogin = false;
      state.isLoading = false;

      localStorage.removeItem("userToken");
      localStorage.removeItem("SingleUser");
    },
    userRememberMe: (state, action: PayloadAction<boolean>) => {
      state.rememberMe = action.payload;

      localStorage.setItem("userState", JSON.stringify(state));
    },
    userSignOut: (state) => {
      state.userInformation = null;
      state.isLogin = false;

      localStorage.removeItem("userState");
    },
  },
});

export const userActions = userSlice.actions;
const userReducer = userSlice.reducer;
export default userReducer;
