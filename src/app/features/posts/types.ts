import type { EntityState } from "@reduxjs/toolkit";

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface PostsState extends EntityState<Post, number> {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
