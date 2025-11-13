import { createSelector } from "@reduxjs/toolkit";
import { postsAdapter } from "./postsAdapter";
import type { RootState } from "../../store";
import { selectUserEntities } from "../users/usersSelectors";

export const selectPostsState = (state: RootState) => state.posts;

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
  selectTotal: selectTotalPosts,
} = postsAdapter.getSelectors(selectPostsState);

export const selectPostsWithUser = createSelector(
  [selectAllPosts, selectUserEntities], // on récupère le selecteur des entities de users
  (posts, userEntities) =>
    posts.map((post) => {
      const user = userEntities[post.userId];
      return {
        ...post,
        user, // user complet ou null si pas trouvé
      };
    })
);
