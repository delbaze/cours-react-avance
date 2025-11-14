import { useGetPostsQuery } from "../app/features/api/apiSlice";

function PostsList() {
  const { data, isLoading, error } = useGetPostsQuery();
  console.log("ERROR", error);
  console.log("DATA", data);
  console.log("ISLOADING", isLoading);

  if (isLoading) return <div>Chargement...</div>;

  return (
    <div>
      {data?.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}

export default PostsList;
