import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { User } from "../../types/types";

type UserList = {
  users: User[];
  isLoading: boolean;
};

const initialState: UserList = {
  users: [],
  isLoading: true,
};

const usersSlice = createSlice({
  name: "userList",
  initialState,
  reducers: {
  setUserList: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
      state.isLoading = false;
    },

  },
});

export const usersActions = usersSlice.actions;
const usersReducer = usersSlice.reducer;
export default usersReducer;
