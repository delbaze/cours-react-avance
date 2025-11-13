import { createEntityAdapter } from "@reduxjs/toolkit";

import type { Post } from "./types";

export const postsAdapter = createEntityAdapter<Post>({
  sortComparer: (a, b) => a.title.localeCompare(b.title),
});
