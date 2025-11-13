import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User, UsersState } from "./types";
import { fetchUsers } from "./usersThunks";
import { usersAdapter } from "./usersAdapter";

const initialState: UsersState = usersAdapter.getInitialState({
  status: "idle",
  error: null,
});
// const initialState: UsersState = {
//   items: [],
//   status: "idle",
//   error: null,

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
        state.status = "succeeded";
        usersAdapter.setAll(state, action.payload); // avec l'adapter
        // state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Unknown error";
      });
  },
});

export default usersSlice.reducer;
