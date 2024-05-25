import { Link } from "react-router-dom";
import MiniPost from "../components/posts/MiniPost";
import styles from "../styles/Posts.module.css";
import { navUrl } from "../utils/navigate";
import withLogIn from "../hoc/withLogIn";
import withLoading from "../hoc/withLoading";
import { headers } from "../static";
import useFetch from "../hooks/useFetch";
import { FetchUrl } from "../utils/constants";

export function Posts() {
  const { responseData, error, logIn, loading } = useFetch(FetchUrl.posts, {
    headers,
    credentials: "include",
  });

  return (
    <section className={styles.postsMain}>
      <span className={styles.postsTitle}>
        <p>
          안녕하세요, <br />
          아무 말 대잔치 <strong>게시판</strong> 입니다.
        </p>
      </span>
      <div className={styles.writeContainer}>
        <Link className={styles.writeBtn} to={navUrl.addPost}>
          게시글 작성
        </Link>
      </div>
      <AuthLoadingMiniPosts logIn={logIn} error={error} loading={loading} responseData={responseData?.data} />
    </section>
  );
}

function MiniPostList({ responseData }) {
  return (
      <div className={styles.postsWrapper}>
        {responseData.map((post) => (
          <MiniPost key={post.postId} data={post} />
        ))}
        <div className={styles.target}></div>
      </div>
  );
}

const LoadingMiniPosts = withLoading(MiniPostList, "posts");
export const AuthLoadingMiniPosts= withLogIn(LoadingMiniPosts);

export default Posts;
