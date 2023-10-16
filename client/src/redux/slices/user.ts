import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Post, User, UserGoogle } from "../../type/types";

type SingleUser = {
  posts: Post[];
  userInformation: User | null;
  userProfile: User | null;
  UserGoogle: UserGoogle;
  isLogin: boolean;
  isLoading: boolean;
  rememberMe: boolean;
  token: string | null;
  userId: string | null;
};

const storedUserState = localStorage.getItem("userState");
const initialState: SingleUser = storedUserState
  ? JSON.parse(storedUserState)
  : {
      posts: [],
      userInformation: null,
      userProfile: null,
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
      userId: null,
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
    setUserId: (state, action: PayloadAction<string | null>) => {
      state.userId = action.payload;
    },
    setUserProfile: (state, action: PayloadAction<User>) => {
      state.userProfile = action.payload;
      state.isLoading = true;
    },
    updateUserProfile: (state, action: PayloadAction<User>) => {
      state.userInformation = { ...state.userInformation, ...action.payload };
      localStorage.setItem("userState", JSON.stringify(state));
    },
    setUserPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
      state.isLoading = false;
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
