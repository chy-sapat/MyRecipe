import { configureStore } from "@reduxjs/toolkit";
import signedInReducer from "@features/signedInSlice.js";
import userDetailReducer from "@features/userDetailsSlice.js";

export default configureStore({
  reducer: {
    signedIn: signedInReducer,
    userDetail: userDetailReducer,
  },
});
