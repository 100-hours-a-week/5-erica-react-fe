import { Link } from "react-router-dom";
import MiniPost from "../components/posts/MiniPost";
import styles from "../styles/Posts.module.css";
import { navUrl } from "../utils/navigate";
import withLogIn from "../hoc/withLogIn";
import withLoading from "../hoc/withLoading"

export  function Posts() {
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
      <LoadingMiniPosts />
    </section>
  );
}

function MiniPostList({data}) {
  return (
    <div className={styles.profileWrapper}>
    {data.map((post) => (
      <MiniPost key={post.postId} data={post} />
    ))}
    <div className={styles.target}></div>
  </div>
  )
}

const LoadingMiniPosts = withLoading(MiniPostList, "posts")
const AuthPosts = withLogIn(Posts);

export {AuthPosts};