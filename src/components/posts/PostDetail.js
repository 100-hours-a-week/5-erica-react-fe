import styles from "../../styles/PostDetail.module.css";
import UserProfileImage from "../../components/users/UserProfileImage.js";
import PostButton from "../button/PostButton.js";
import PostAction from "./PostAction.js";

export default function PostDetail({ data, setIsPostDelete }) {
  return (
    <div className={styles.detailBoard}>
      <div className={styles.boardHeader}>
        <p className={styles.detailBoardTitle}>{data.title}</p>
        <div className={styles.boardHeaderBottom}>
          <div className={styles.writer}>
            <UserProfileImage image={data.userImage} />
            <p className={styles.postWriterName}>{data.nickname}</p>
            <div className={styles.postWriteDate}>{data.created_at}</div>
          </div>
          <PostButton postId={data.postId} setIsPostDelete={setIsPostDelete} />
        </div>
        <div className={styles.boardBody}>
          {data.postImage ? (
            <div className={styles.boardImageContainer}>
              <img
                className={styles.boardImage}
                src={data.postImage}
                alt="board"
              />
            </div>
          ) : null}
          <div className={styles.boardDetailContent}>{data.content}</div>
        </div>
      </div>
      <PostAction view={data.view} comment={data.comment_count} />
    </div>
  );
}
