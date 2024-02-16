import { configureStore } from "@reduxjs/toolkit";
import signedInReducer from "@features/signedInSlice.js";

export default configureStore({
  reducer: {
    signedIn: signedInReducer,
  },
});
