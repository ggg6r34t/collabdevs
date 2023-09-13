import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { SavedPost } from "../../type/types";

type SavedPostState = {
  savedPosts: SavedPost[];
  error: Error | null;
};

const initialState: SavedPostState = {
  savedPosts: [],
  error: null,
};

const savedPostsSlice = createSlice({
  name: "savedPosts",
  initialState,
  reducers: {
    getSavedPosts: (state, action: PayloadAction<SavedPost[]>) => {
      state.savedPosts = action.payload;
      state.error = null;
    },
    addSavedPost: (state, action: PayloadAction<SavedPost>) => {
      state.savedPosts.unshift(action.payload);
      state.error = null;
    },
    fetchSavedPostsError: (state, action: PayloadAction<Error | null>) => {
      state.error = action.payload;
    },
    removeSavedPost: (state, action: PayloadAction<string>) => {
      const postIdToRemove = action.payload;
      state.savedPosts = state.savedPosts.filter(
        (post) => post._id !== postIdToRemove
      );
      state.error = null;
    },
  },
});

export const savedPostActions = savedPostsSlice.actions;
const savedPostsReducer = savedPostsSlice.reducer;
export default savedPostsReducer;
