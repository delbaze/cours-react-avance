import type { EntityState } from "@reduxjs/toolkit";

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

export interface UsersState extends EntityState<User, number> {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
