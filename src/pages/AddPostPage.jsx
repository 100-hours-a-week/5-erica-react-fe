import styles from "../styles/AddPost.module.css";
import { headers } from "../static";
import { AuthAddPost } from "../components/posts/AddPostContainer";
import useFetch from "../hooks/useFetch";
import { FetchUrl } from "../utils/constants";

export function AddPost() {
  const { responseData, loading, error, logIn } = useFetch(FetchUrl.logIn, {
    headers,
    credentials: "include",
  });

  return (
    <div className={styles.addPost}>
      <p className={styles.pageTitle}>게시글 작성</p>
      <AuthAddPost responseData={responseData?.data} logIn={logIn} loading={loading} error={error} />
    </div>
  );
}

