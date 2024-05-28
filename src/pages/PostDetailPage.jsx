import Comments from "../components/comments/Comments";
import { useState } from "react";
import DeletePostModal from "../components/modals/DeletePostModal";
import useFetch from "../hooks/useFetch";
import { headers } from "../static";
import { useParams } from "react-router-dom";
import { AuthPostDetailPage } from "../components/posts/PostDetail";
import { FetchUrl } from "../utils/constants";
import styles from "../styles/post/PostDetailPage.module.css"

export function PostDetailPage() {
  const postId = Number(useParams().id);
  const [isPostDelete, setIsPostDelete] = useState(false);
  const { responseData, error, logIn, loading } = useFetch(`${FetchUrl.posts}/${postId}`, {
    headers,
    credentials: "include",
  });

  return (
    <div className={styles.detailPage}>
      <AuthPostDetailPage responseData={responseData?.data} logIn={logIn} error={error} loading={loading} setIsPostDelete={setIsPostDelete}/>
      <Comments postId={postId} />
      <DeletePostModal
        postId={postId}
        isPostDelete={isPostDelete}
        setIsPostDelete={setIsPostDelete}
      />
    </div>
  );
}