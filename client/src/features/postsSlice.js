import { createSlice } from "@reduxjs/toolkit";

const PostSlice = createSlice({
  name: "Posts",
  initialState: {
    value: {
      allPost: [],
      savedPost: [],
      topDailyPost: [],
      topWeeklyPost: [],
    },
  },
  reducers: {
    setAllPosts: (state, action) => {
      state.value.allPost = action.payload;
    },
  },
});

export const { setAllPosts } = PostSlice.actions;
export default PostSlice.reducer;
