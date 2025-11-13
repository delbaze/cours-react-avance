import { createSlice } from "@reduxjs/toolkit";
import { postsAdapter } from "./postsAdapter";
import { fetchPosts } from "./postsThunk";
import type { PostsState } from "./types";

const initialState: PostsState = postsAdapter.getInitialState({
  status: "idle",
  error: null,
});

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        postsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Unknown error";
      });
  },
});

export default postsSlice.reducer;
