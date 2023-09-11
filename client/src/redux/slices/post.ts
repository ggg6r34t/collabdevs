import { createSlice } from "@reduxjs/toolkit";

import { Post } from "../../type/types";

type PostState = {
  posts: Post[];
  showShareModal: { [postId: string]: boolean };
};

const initialState: PostState = {
  posts: [],
  showShareModal: {},
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.posts.unshift(action.payload);
    },
    setShowShareModal: (state, action) => {
      state.showShareModal = action.payload;
    },
  },
});

export const postActions = postsSlice.actions;
const postsReducer = postsSlice.reducer;
export default postsReducer;
