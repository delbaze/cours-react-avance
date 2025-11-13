import { createAsyncThunk } from "@reduxjs/toolkit";

import type { Post } from "./types";

export const fetchPosts = createAsyncThunk<
  Post[],
  void,
  { rejectValue: string }
>("posts/fetchPosts", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!response.ok) {
      return rejectWithValue("Failed to fetch posts");
    }
    const data = await response.json();
    return data as Post[];
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Unknown error"
    );
  }
});
