import { configureStore } from "@reduxjs/toolkit";

import usersReducer from "./slices/users";
import userReducer from "./slices/user";

export const store = configureStore({
  reducer: {
    user: userReducer,
    userList: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
