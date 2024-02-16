import { createSlice } from "@reduxjs/toolkit";

export const signedInSlice = createSlice({
  name: "signedIn",
  initialState: {
    value: false,
  },
  reducers: {
    login: (state) => {
      state.value = true;
    },
    logout: (state) => {
      state.value = false;
    },
  },
});

export const { login, logout } = signedInSlice.actions;
export default signedInSlice.reducer;
