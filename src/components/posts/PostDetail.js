import styles from "../../styles/PostDetail.module.css";
import UserProfileImage from "../../components/users/UserProfileImage.js";
import PostButton from "../button/PostButton.js";
import PostAction from "./PostAction.js";
import withLoading from "../../hoc/withLoading.js";
import withLogIn from "../../hoc/withLogIn.js";

function PostDetail({ responseData, setIsPostDelete }) {
  return (
    <div className={styles.detailBoard}>
      <div className={styles.boardHeader}>
        <p className={styles.detailBoardTitle}>{responseData.title}</p>
        <div className={styles.boardHeaderBottom}>
          <div className={styles.writer}>
            <UserProfileImage image={responseData.userImage} />
            <p className={styles.postWriterName}>{responseData.nickname}</p>
            <div className={styles.postWriteDate}>
              {responseData.created_at}
            </div>
          </div>
          <PostButton
            postId={responseData.postId}
            setIsPostDelete={setIsPostDelete}
          />
        </div>
        <div className={styles.boardBody}>
          {responseData.postImage ? (
            <div className={styles.boardImageContainer}>
              <img
                loading="eager"
                className={styles.boardImage}
                src={responseData.postImage}
                alt="board"
              />
            </div>
          ) : null}
          <div className={styles.boardDetailContent}>
            {responseData.content}
          </div>
        </div>
      </div>
      <PostAction
        view={responseData.view}
        comment={responseData.comment_count}
      />
    </div>
  );
}

const LoadingPostDetailPage = withLoading(PostDetail, "post");
export const AuthPostDetailPage = withLogIn(LoadingPostDetailPage);
