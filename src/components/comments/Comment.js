import { DeleteCommentModal } from "../modals/Modals";
import { disableScroll } from "../../utils/scroll.js";
import { checkCommentOwner } from "../../utils/checkOwner.js";
import { useState } from "react";
import styles from "../../styles/PostDetail.module.css";

export default function Comment({ data, postId, setIsAdd, setUpdateTarget }) {
  const [isCommentDelete, setIsCommentDelete] = useState(false);

  const handleOnClick = async (action) => {
    const checkResponseData = await checkCommentOwner(postId, data.commentId);

    if (checkResponseData.status === 403) {
      alert("본인이 작성한 댓글이 아닙니다.");
      return;
    }

    if (action === "update") {
      setUpdateTarget({ commentId: data.commentId, comment: data.comment });
      setIsAdd(false);
    } else if (action === "delete") {
      disableScroll();
      setIsCommentDelete(true);
    }
  };

  return (
    <>
      <div className={styles.comment}>
        <div className={styles.commentHeader}>
          <div className={styles.commentWriter}>
            <input type="hidden" id="commentId" value={data.commentId} />
            <img
              src={data.profile_image}
              alt="profile"
              className={styles.commentWriterImage}
            ></img>
            <div className={styles.commentWriterName}>{data.nickname}</div>
            <div className={styles.commentWriterDate}>{data.created_at}</div>
          </div>
          <div className={styles.commentButton}>
            <button
              onClick={() => handleOnClick("update")}
              className={styles.commentUpdate}
            >
              수정
            </button>
            <button
              onClick={() => handleOnClick("delete")}
              className={styles.commentDelete}
            >
              삭제
            </button>
          </div>
        </div>
        <div className={styles.commentBody}>{data.comment}</div>
      </div>
      <DeleteCommentModal
        postId={postId}
        commentId={data.commentId}
        isCommentDelete={isCommentDelete}
        setIsCommentDelete={setIsCommentDelete}
      />
    </>
  );
}
