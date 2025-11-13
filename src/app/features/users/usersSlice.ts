import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User, UsersState } from "./types";
import { fetchUsers } from "./usersThunks";

const initialState: UsersState = {
  items: [],
  status: "idle",
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        console.log("LOADING");
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        console.log("SUCCEEDED");
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        console.log("REJECTED");
        state.status = "failed";
        state.error = action.payload ?? "Unknown error";
      });
  },
});

export default usersSlice.reducer;
