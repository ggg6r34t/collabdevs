import { configureStore } from "@reduxjs/toolkit";

import usersReducer from "./slices/users";
import userReducer from "./slices/user";
import postsReducer from "./slices/post";
import commentsReducer from "./slices/comment";
import repliesReducer from "./slices/reply";
import savedPostsReducer from "./slices/savedPost";
import postDetailReducer from "./slices/postDetail";
import themeReducer from "./slices/themeMode";
import formReducer from "./slices/form";

export const store = configureStore({
  reducer: {
    user: userReducer,
    userList: usersReducer,
    posts: postsReducer,
    postDetails: postDetailReducer,
    savedPosts: savedPostsReducer,
    comments: commentsReducer,
    replies: repliesReducer,
    form: formReducer,
    themes: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
