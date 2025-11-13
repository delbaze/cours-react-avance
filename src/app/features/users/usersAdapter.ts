import { createEntityAdapter } from "@reduxjs/toolkit";
import type { User } from "./types";

export const usersAdapter = createEntityAdapter<User>({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});
