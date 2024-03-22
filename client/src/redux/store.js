import { configureStore } from "@reduxjs/toolkit";
import signedInReducer from "@features/signedInSlice.js";
import userDetailReducer from "@features/userDetailsSlice.js";
import notificationReducer from "@features/notificationSlice.js";
import popUpReducer from "@features/popUp";
import postReducer from "@features/postsSlice";
export default configureStore({
  reducer: {
    signedIn: signedInReducer,
    userDetail: userDetailReducer,
    notificationPanel: notificationReducer,
    popUp: popUpReducer,
    post: postReducer,
  },
});
