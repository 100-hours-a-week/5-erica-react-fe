import Comments from "../components/comments/Comments";
import { useState } from "react";
import DeletePostModal from "../components/modals/DeletePostModal";
import useFetch from "../hooks/useFetch";
import { backHost, headers } from "../static";
import { useParams } from "react-router-dom";
import { AuthPostDetailPage } from "../components/posts/PostDetail";

export function PostDetailPage() {
  const postId = Number(useParams().id);
  const [isPostDelete, setIsPostDelete] = useState(false);
  const { responseData, error, logIn, loading } = useFetch(`${backHost}/api/posts/${postId}`, {
    headers,
    credentials: "include",
  });

  return (
    <>
      <AuthPostDetailPage responseData={responseData?.data} logIn={logIn} error={error} loading={loading} setIsPostDelete={setIsPostDelete}/>
      <hr />
      <Comments postId={postId} />
      <DeletePostModal
        postId={postId}
        isPostDelete={isPostDelete}
        setIsPostDelete={setIsPostDelete}
      />
    </>
  );
}