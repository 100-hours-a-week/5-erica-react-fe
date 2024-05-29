import styles from "../../styles/post/PostDetail.module.css";
import UserProfileImage from "../../components/users/UserProfileImage.js";
import PostButton from "../button/PostButton.js";
import PostAction from "./PostAction.js";
import withLoading from "../../hoc/withLoading.js";
import withLogIn from "../../hoc/withLogIn.js";

function PostDetail({ responseData, setIsPostDelete }) {
  const data = responseData?.data[0];
  return (
    <div className={styles.detailBoard}>
      <div className={styles.boardHeader}>
        <div className={styles.postType}>
          {data.type === "other" ? "고민" : "개발"}
        </div>
        <div className={styles.writer}>
          <UserProfileImage image={data.profileImage} size={28} />
          <p className={styles.postWriterName}>{data.nickname}</p>
          <div className={styles.postWriteDate}>{data.created_at}</div>
        </div>
        <div className={styles.boardHeaderBottom}>
          <span className={styles.detailBoardTitle}>{data.title}</span>
          <PostButton postId={data.postId} setIsPostDelete={setIsPostDelete} />
        </div>
      </div>
      <PostAction view={data.view} comment={data.comment_count} />
      <div className={styles.boardBody}>
        {data.postImage ? (
          <div className={styles.boardImageContainer}>
            <img
              loading="eager"
              className={styles.boardImage}
              src={data.postImage}
              alt="board"
            />
          </div>
        ) : null}
        <div className={styles.boardDetailContent}>{data.content}</div>
      </div>
    </div>
  );
}

const LoadingPostDetailPage = withLoading(PostDetail, "post");
export const AuthPostDetailPage = withLogIn(LoadingPostDetailPage);
