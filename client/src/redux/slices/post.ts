import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Post, User } from "../../type/types";

type PostState = {
  posts: Post[];
  users: User[];
  error: Error | null;
  showShareModal: { [postId: string]: boolean };
};

const initialState: PostState = {
  posts: [],
  users: [],
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
    setShowShareModal: (
      state,
      action: PayloadAction<{ [postId: string]: boolean }>
    ) => {
      state.showShareModal = { ...state.showShareModal, ...action.payload };
    },
    searchPost(state, action: PayloadAction<{ query: string; type: string }>) {
      const { query, type } = action.payload;
      if (type === "topic") {
        const post = state.posts.filter((post) =>
          post.title.toLowerCase().includes(query.toLowerCase())
        );
        state.posts = post;
      } else if (type === "user") {
        const filteredUsers = state.users.filter((user) =>
          user.username.toLowerCase().includes(query.toLowerCase())
        );
        state.users = filteredUsers;
      }
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
