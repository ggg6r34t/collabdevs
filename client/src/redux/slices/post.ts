import { createSlice } from "@reduxjs/toolkit";

import { Post } from "../../type/types";

type PostState = {
  posts: Post[];
};

const initialState: PostState = {
  posts: [],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.posts.unshift(action.payload);
    },
  },
});

export const postActions = postsSlice.actions;
const postsReducer = postsSlice.reducer;
export default postsReducer;
