import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Reply } from "../../type/types";

type ReplyState = {
  replies: Reply[];
  showReply: { [commentId: string]: boolean };
  error: Error | null;
};

const initialState: ReplyState = {
  replies: [],
  showReply: {},
  error: null,
};

const repliesSlice = createSlice({
  name: "replies",
  initialState,
  reducers: {
    getReply: (state, action: PayloadAction<Reply[]>) => {
      state.replies = action.payload;
    },
    addReply: (state, action) => {
      state.replies.unshift(action.payload);
    },
    toggleShowReply: (state, action: PayloadAction<string>) => {
      const commentId = action.payload;
      state.showReply[commentId] = !state.showReply[commentId];
    },
    fetchReplyError: (state, action: PayloadAction<Error | null>) => {
      state.error = action.payload;
    },
  },
});

export const replyActions = repliesSlice.actions;
const repliesReducer = repliesSlice.reducer;
export default repliesReducer;
