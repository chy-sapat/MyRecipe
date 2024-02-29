import { configureStore } from "@reduxjs/toolkit";
import signedInReducer from "@features/signedInSlice.js";
import userDetailReducer from "@features/userDetailsSlice.js";
import notificationReducer from "@features/notificationSlice.js";
export default configureStore({
  reducer: {
    signedIn: signedInReducer,
    userDetail: userDetailReducer,
    notificationPanel: notificationReducer,
  },
});
