import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Comment } from "../../type/types";

type CommentState = {
  comments: Comment[];
  error: Error | null;
};

const initialState: CommentState = {
  comments: [],
  error: null,
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    getComment: (state, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload;
    },
    addComment: (state, action) => {
      state.comments.unshift(action.payload);
    },
    fetchCommentError: (state, action: PayloadAction<Error | null>) => {
      state.error = action.payload;
    },
  },
});

export const commentActions = commentsSlice.actions;
const commentsReducer = commentsSlice.reducer;
export default commentsReducer;
