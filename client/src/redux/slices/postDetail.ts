import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { Post } from "../../type/types";

type PostDetailState = {
  postDetail: Post | null;
  showShareModal: { [postId: string]: boolean };
  error: Error | null;
  isLoading: boolean;
};

const initialState: PostDetailState = {
  postDetail: null,
  showShareModal: {},
  error: null,
  isLoading: true,
};

const postDetailSlice = createSlice({
  name: "postDetail",
  initialState,
  reducers: {
    getPostDetails: (state, action: PayloadAction<Post>) => {
      state.postDetail = action.payload;
      state.isLoading = false;
    },
    setShowShareModal: (
      state,
      action: PayloadAction<{ [postId: string]: boolean }>
    ) => {
      state.showShareModal = { ...state.showShareModal, ...action.payload };
    },
    fetchPostError: (state, action: PayloadAction<Error | null>) => {
      state.error = action.payload;
    },
  },
});

export const postDetailActions = postDetailSlice.actions;
const postDetailReducer = postDetailSlice.reducer;
export default postDetailReducer;
