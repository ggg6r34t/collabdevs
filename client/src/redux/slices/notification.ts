import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export enum NotificationType {
  Success = "success",
  Error = "error",
  Warning = "warning",
  Info = "info",
}

type Notification = {
  open: boolean;
  message: string;
  type: NotificationType;
};

type ShowNotification = Omit<Notification, "open">;

const initialState = {
  open: false,
  message: "",
  type: NotificationType.Success,
};

const notification= createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification: (state, action: PayloadAction<ShowNotification>) => {
      state.open = true;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    hideNotification: (state) => {
      state.open = false;
      state.message = "";
    },
  },
});

export const { showNotification, hideNotification } = notification.actions;
const notificationReducer = notification.reducer
export default notificationReducer;