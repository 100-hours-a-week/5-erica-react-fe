import { useParams } from "react-router-dom";
import styles from "../styles/UpdatePost.module.css";
import { backHost, headers } from "../static";
import useFetch from "../hooks/useFetch";
import { AuthUpdatePost } from "../components/posts/UpdatePostContainer";

export function UpdatePost() {
  const postId = Number(useParams().id);

  const {responseData, loading, error} = useFetch(`${backHost}/api/posts/${postId}/update`, {
    headers,
    credentials: "include",
  });

  return (
    <>
      <p className={styles.pageTitle}>게시글 수정</p>
      <AuthUpdatePost responseData = {responseData?.data} postId={postId} loading={loading} error={error}/>
    </>
  );
}

