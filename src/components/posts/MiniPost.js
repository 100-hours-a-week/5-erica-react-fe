import { viewToK, commentToK } from "../../utils/numberToK";
import styles from "../../styles/MiniPost.module.css";
import { Link } from "react-router-dom";
import UserProfileImage from "../users/UserProfileImage";
import { navUrl } from "../../utils/navigate";
import bookMark from "../../images/bookmark.png";

export default function MiniPost({ data }) {
  const postTitle = data.title.slice(0, 26);

  const postView = viewToK(data.view);

  const postCommentCount = commentToK(data.comment_count);

  return (
    <Link
      className={styles.miniBoardContainer}
      to={`${navUrl.posts}/${data.postId}`}
    >
      <div className={styles.miniBoard}>
        <div className={styles.titleContainer}>
          <img src={bookMark} className={styles.bookMark} alt="" />
          <div className={styles.miniBoardTitle}>{postTitle}</div>
        </div>
        <div className={styles.miniBoardContent}>
          <div className={styles.action}>
            <div className={styles.miniComment}>댓글 {postCommentCount}</div>
            <div className={styles.miniLike}>좋아요 {data.like}</div>
            <div className={styles.miniView}>조회수 {postView}</div>
          </div>
          <div className={styles.date}>📆 {data.created_at}</div>
        </div>
      </div>
      <hr className={styles.miniBoardHr} />
      <div className={styles.miniBoardWriter}>
        <UserProfileImage image={data.userImage} />
        <p className={styles.miniWriterName}>{data.nickname}</p>
      </div>
    </Link>
  );
}
