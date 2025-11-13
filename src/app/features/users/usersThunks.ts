import { createAsyncThunk } from "@reduxjs/toolkit";
import { type User } from "./types";

export const fetchUsers = createAsyncThunk<
  User[],
  void,
  { rejectValue: string }
>("users/fetchUsers", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
      return rejectWithValue("Failed to fetch users");
    }

    const data = await response.json();
    return data as User[];
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Unknown error"
    );
  }
});
