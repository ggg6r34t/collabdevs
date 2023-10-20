import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FormState = {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  rememberMe: boolean;
};

const initialFormState: FormState = {
  firstName: "",
  lastName: "",
  userName: "",
  email: "",
  password: "",
  confirmPassword: "",
  rememberMe: false,
};

const formSlice = createSlice({
  name: "form",
  initialState: initialFormState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setRememberMe: (state, action: PayloadAction<boolean>) => {
      state.rememberMe = action.payload;
    },
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
    setFirstName: (state, action: PayloadAction<string>) => {
      state.firstName = action.payload;
    },
    setLastName: (state, action: PayloadAction<string>) => {
      state.lastName = action.payload;
    },
    setConfirmPassword: (state, action: PayloadAction<string>) => {
      state.confirmPassword = action.payload;
    },
    clearForm: (state) => {
      state.email = "";
      state.password = "";
      state.rememberMe = false;
      state.userName = "";
      state.firstName = "";
      state.lastName = "";
      state.confirmPassword = "";
    },
  },
});

export const formActions = formSlice.actions;
const formReducer = formSlice.reducer;
export default formReducer;
