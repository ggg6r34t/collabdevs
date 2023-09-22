import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  mode: boolean | undefined;
};

const initialState: InitialState = {
  mode: undefined,
};

const themeSlice = createSlice({
  name: "mode",
  initialState,
  reducers: {
    switchTheme: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const themeActions = themeSlice.actions;
const themeReducer = themeSlice.reducer;
export default themeReducer;
