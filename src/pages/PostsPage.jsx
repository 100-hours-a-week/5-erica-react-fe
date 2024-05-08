import { Link } from "react-router-dom";
import { backHost, headers } from "../static";
import MiniPost from "../components/posts/MiniPost";
import styles from "../styles/Posts.module.css";
import useFetch from "../hooks/useFetch";

export default function Posts() {

  const {data, loading, error} = useFetch(`${backHost}/api/posts`, {
    headers,
    credentials: "include",
  })

  if(!data || loading || error) {
    return null;
  }

  if(error) {
    console.error("게시물을 불러오는 중 에러가 발생했습니다:", error);
    alert("게시물을 불러오는 중 에러가 발생했습니다. 잠시 후 다시 시도해주세요.");
  }

  return (
    <section className={styles.postsMain}>
      <span className={styles.postsTitle}>
        <p>
          안녕하세요, <br />
          아무 말 대잔치 <strong>게시판</strong> 입니다.
        </p>
      </span>
      <div className={styles.writeContainer}>
        <Link className={styles.writeBtn} to="/posts/write">
          게시글 작성
        </Link>
      </div>
      <div className={styles.profileWrapper}>
        {data.map((post) => (
          <MiniPost key={post.postId} data={post} />
        ))}
        <div className={styles.target}></div>
      </div>
    </section>
  );
}
