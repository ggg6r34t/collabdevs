import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { Post } from "../../type/types";

type PostDetailState = {
  postDetail: Post | null;
  showShareModal: { [postId: string]: boolean };
  currentOpenPostId: string | null;
  error: Error | null;
  isLoading: boolean;
};

const initialState: PostDetailState = {
  postDetail: null,
  showShareModal: {},
  currentOpenPostId: null,
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
      action: PayloadAction<{ postId: string; show: boolean }>
    ) => {
      const { postId, show } = action.payload;

      if (show) {
        // if 'show' is true, set the currentOpenPostId to postId
        state.currentOpenPostId = postId;
      } else if (state.currentOpenPostId === postId) {
        // if false and the currentOpenPostId matches postId, reset it
        state.currentOpenPostId = null;
      }

      // update the showShareModal object for the specific postId
      state.showShareModal = { ...state.showShareModal, [postId]: show };
    },

    fetchPostError: (state, action: PayloadAction<Error | null>) => {
      state.error = action.payload;
    },
  },
});

export const postDetailActions = postDetailSlice.actions;
const postDetailReducer = postDetailSlice.reducer;
export default postDetailReducer;
