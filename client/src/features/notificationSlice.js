import { createSlice } from "@reduxjs/toolkit";

export const notificationSlice = createSlice({
  name: "notificationPanel",
  initialState: {
    value: "close",
  },
  reducers: {
    toggleNotificationPanel: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { toggleNotificationPanel } = notificationSlice.actions;
export default notificationSlice.reducer;
