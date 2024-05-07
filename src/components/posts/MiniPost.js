import { viewToK, commentToK } from "../../utils/numberToK";
import styles from "../../styles/Posts.module.css";
import { Link } from "react-router-dom";

export default function MiniPost({ data }) {
  const postTitle = data.title.slice(0, 26);

  const postView = viewToK(data.view);

  const postCommentCount = commentToK(data.comment_count);

  return (
    <Link className={styles.miniBoardContainer} to={`/posts/${data.postId}`}>
      <div className={styles.miniBoard}>
        <h2 className={styles.miniBoardTitle}>{postTitle}</h2>
        <div className={styles.miniBoardContent}>
          <div className={styles.action}>
            <div className={styles.miniComment}>댓글 {postCommentCount}</div>
            <div className={styles.miniLike}>좋아요 {data.like}</div>
            <div className={styles.miniView}>조회수 {postView}</div>
          </div>
          <div className={styles.date}>{data.created_at}</div>
        </div>
      </div>
      <hr />
      <div className={styles.miniBoardWriter}>
        <img
          alt="profile"
          src={data.userImage}
          style={{ width: "30px", height: "30px" }}
          className={styles.miniWriterImage}
        />
        <p className={styles.miniWriterName}>{data.nickname}</p>
      </div>
    </Link>
  );
}
