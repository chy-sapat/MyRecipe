import { createSlice } from "@reduxjs/toolkit";

const popUpSlice = createSlice({
  name: "popUp",
  initialState: {
    value: {
      enableStatus: false,
      message: "",
    },
  },
  reducers: {
    togglePopUp: (state, action) => {
      state.value.enableStatus = !state.value.enableStatus;
      state.value.message = action.payload;
    },
  },
});

export const { togglePopUp } = popUpSlice.actions;
export default popUpSlice.reducer;
