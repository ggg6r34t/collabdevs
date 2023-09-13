import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./slices/post";
import commentsReducer from "./slices/comment";
import repliesReducer from "./slices/reply";
import savedPostsReducer from "./slices/savedPost";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    savedPosts: savedPostsReducer,
    comments: commentsReducer,
    replies: repliesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
