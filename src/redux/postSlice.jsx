import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    getPosts: (state, action) => {
      state.posts = action.payload;
    },
  },
});

export const {} = postSlice.actions;

export default postSlice.reducer;

export const setPosts = (post) => {
  return (dispatch) => {
    dispatch(postSlice.actions.getPosts(post));
  };
};
