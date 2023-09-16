import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Post } from "../../type/types";

type PostState = {
  posts: Post[];
  error: Error | null;
  showShareModal: { [postId: string]: boolean };
};

const initialState: PostState = {
  posts: [],
  error: null,
  showShareModal: {},
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    getPost: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
    createPost: (state, action) => {
      state.posts.unshift(action.payload);
    },
    // setShowShareModal: (state, action) => {
    //   state.showShareModal = action.payload;
    // },
    setShowShareModal: (
      state,
      action: PayloadAction<{ [postId: string]: boolean }>
    ) => {
      state.showShareModal = { ...state.showShareModal, ...action.payload };
    },

    createPostError: (state, action: PayloadAction<Error | null>) => {
      state.error = action.payload;
    },
    fetchPostError: (state, action: PayloadAction<Error | null>) => {
      state.error = action.payload;
    },
  },
});

export const postActions = postsSlice.actions;
const postsReducer = postsSlice.reducer;
export default postsReducer;
