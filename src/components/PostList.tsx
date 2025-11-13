// src/app/features/posts/PostList.tsx
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useEffect } from "react";
import {
  selectPostsWithUser,
  selectTotalPosts,
  selectPostsState,
} from "../app/features/posts/postsSelectors";
import { fetchPosts } from "../app/features/posts/postsThunk";

function PostList() {
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector(selectPostsState);
  const posts = useAppSelector(selectPostsWithUser); // posts + user
  const total = useAppSelector(selectTotalPosts);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  if (status === "loading") return <div>Chargement des posts...</div>;
  if (status === "failed") return <div>Erreur : {error}</div>;

  return (
    <div>
      <h2>Posts ({total})</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id} style={{ marginBottom: "1rem" }}>
            <strong>{post.title}</strong>
            {post.user && <em> — par {post.user.name}</em>}
            <p>{post.body.substring(0, 100)}...</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostList;
