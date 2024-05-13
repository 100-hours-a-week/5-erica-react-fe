import styles from "../styles/AddPost.module.css";
import { backHost, headers } from "../static";
import { AuthAddPost } from "../components/posts/AddPostContainer";
import useFetch from "../hooks/useFetch";

export function AddPost() {
  const { responseData, loading, error, logIn } = useFetch(`${backHost}/api/users/logIn`, {
    headers,
    credentials: "include",
  });

  return (
    <>
      <p className={styles.pageTitle}>게시글 작성</p>
      <AuthAddPost responseData={responseData?.data} logIn={logIn} loading={loading} error={error} />
    </>
  );
}

