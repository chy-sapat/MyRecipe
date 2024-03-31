import { createSlice } from "@reduxjs/toolkit";

const UserDetailSlice = createSlice({
  name: "userDetail",
  initialState: {
    value: {},
  },
  reducers: {
    setDetails: (state, action) => {
      state.value = action.payload;
    },
    removeDetails: (state) => {
      state.value = {};
    },
  },
});

export const { setDetails, removeDetails } = UserDetailSlice.actions;
export default UserDetailSlice.reducer;
