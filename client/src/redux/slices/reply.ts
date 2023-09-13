import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Reply } from "../../type/types";

type ReplyState = {
  replies: Reply[];
  error: Error | null;
};

const initialState: ReplyState = {
  replies: [],
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
    fetchReplyError: (state, action: PayloadAction<Error | null>) => {
      state.error = action.payload;
    },
  },
});

export const replyActions = repliesSlice.actions;
const repliesReducer = repliesSlice.reducer;
export default repliesReducer;
