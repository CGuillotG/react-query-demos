import { fetchComments } from "./api";
import { useQuery } from "@tanstack/react-query";
import "./PostDetail.css";

export function PostDetail({ post, deleteMutation, updateMutation }) {

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["comments", post.id],
    queryFn: () => fetchComments(post.id),
  });

  if (isLoading) return <h3>Loading...</h3>;

  if (isError) return (
    <>
      <h3>Error!</h3>
      <p>{error.message}</p>
    </>
  );

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <div style={{ display: "flex"}}>
        <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button>
        {deleteMutation.isPending && <p className="loading">Deleting...</p>}
        {deleteMutation.isError && <p className="error">Error: {deleteMutation.error.toSring()}</p>}
        {deleteMutation.isSuccess && <p className="success">Deleted! (not really though)</p>}
      </div>
      <br />
      <div style={{ display: "flex"}}>
        <button onClick={() => updateMutation.mutate(post.id)}>Update title</button>
        {updateMutation.isPending && <p className="loading">Updating...</p>}
        {updateMutation.isError && <p className="error">Error: {updateMutation.error.toSring()}</p>}
        {updateMutation.isSuccess && <p className="success">Updated!</p>}
      </div>
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}:
          <p>{comment.body}</p>
        </li>
      ))}
    </>
  );
}
