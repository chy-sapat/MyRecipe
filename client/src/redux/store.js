import { configureStore } from "@reduxjs/toolkit";
import signedInReducer from "@features/signedInSlice.js";
import userDetailReducer from "@features/userDetailsSlice.js";
import notificationReducer from "@features/notificationSlice.js";
import popUpReducer from "@features/popUp";
export default configureStore({
  reducer: {
    signedIn: signedInReducer,
    userDetail: userDetailReducer,
    notificationPanel: notificationReducer,
    popUp: popUpReducer,
  },
});
