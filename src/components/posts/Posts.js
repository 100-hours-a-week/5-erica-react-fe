import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { backHost, headers } from "../../static";
import MiniPost from "./MiniPost";
import styles from "../../styles/Posts.module.css";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await fetch(`${backHost}/api/posts`, {
        headers,
        credentials: "include",
      });
      const responseData = await response.json();

      switch (response.status) {
        case 200:
          if (responseData.data.length === 0) {
            alert("게시물이 없습니다. 게시물을 작성하십시오");
            navigate("/posts/write");
          } else {
            setPosts(responseData.data);
          }
          break;
        case 401:
          navigate("/");
          break;
        default:
          alert("서버 오류");
      }
    } catch (error) {
      console.error("게시물을 불러오는 중 에러가 발생했습니다:", error);
      alert(
        "게시물을 불러오는 중 에러가 발생했습니다. 잠시 후 다시 시도해주세요."
      );
    }
  };

  useEffect(() => {
    fetchData();
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
        <Link className={styles.writeBtn} to="/posts/write">
          게시글 작성
        </Link>
      </div>
      <div className={styles.profileWrapper}>
        {posts.map((post) => (
          <MiniPost key={post.postId} data={post} />
        ))}
        <div className={styles.target}></div>
      </div>
    </section>
  );
}
