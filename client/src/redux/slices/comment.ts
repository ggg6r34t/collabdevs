import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Comment, Post } from "../../type/types";

type CommentState = {
  posts: Post[];
  comments: Comment[];
  hideComment: boolean;
  error: Error | null;
};

const initialState: CommentState = {
  posts: [],
  comments: [],
  hideComment: true,
  error: null,
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    getComment: (state, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload;
    },
    setComments: (
      state,
      action: PayloadAction<{ postId: string; comments: Comment[] }>
    ) => {
      const { postId, comments } = action.payload;

      const postToUpdate = state.posts.find((post) => post._id === postId);
      if (postToUpdate) {
        postToUpdate.comments = comments;
      }
    },
    addComment: (state, action) => {
      state.comments.unshift(action.payload);
    },
    toggleHideComment: (state) => {
      state.hideComment = !state.hideComment;
    },
    fetchCommentError: (state, action: PayloadAction<Error | null>) => {
      state.error = action.payload;
    },
  },
});

export const commentActions = commentsSlice.actions;
const commentsReducer = commentsSlice.reducer;
export default commentsReducer;
