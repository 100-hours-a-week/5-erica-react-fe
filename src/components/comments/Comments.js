import { useState } from "react";
import { headers } from "../../static";
import AddComment from "./AddComment.js";
import Comment from "./Comment.js";
import styles from "../../styles/Comments.module.css";
import useFetch from "../../hooks/useFetch.js";
import { FetchUrl } from "../../utils/constants.js";

export default function Comments({ postId }) {
  const [isAdd, setIsAdd] = useState(true);
  const [updateTarget, setUpdateTarget] = useState();

  const { responseData, loading, error } = useFetch(
    `${FetchUrl.posts}/${postId}/comments`,
    {
      headers,
      credentials: "include",
    }
  );

  if (!responseData || loading || error) {
    return null;
  }

  if (error) {
    console.log(error);
  }

  return (
    <div className={styles.commentContainer}>
      <div className={styles.commentTitle}>댓글</div>
      <AddComment
        postId={postId}
        setIsAdd={setIsAdd}
        isAdd={isAdd}
        updateTarget={updateTarget}
      />
      <hr className={styles.divHr} />
      <div className={styles.commentList}>
        {responseData?.data?.map((comment) => (
          <Comment
            setUpdateTarget={setUpdateTarget}
            key={comment.commentId}
            setIsAdd={setIsAdd}
            postId={postId}
            data={comment}
          />
        ))}
      </div>
    </div>
  );
}
