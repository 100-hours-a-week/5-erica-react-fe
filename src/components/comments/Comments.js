import { useState } from "react";
import { backHost, headers } from "../../static";
import AddComment from "./AddComment.js";
import Comment from "./Comment.js";
import styles from "../../styles/Comments.module.css";
import useFetch from "../../hooks/useFetch.js";

export default function Comments({ postId }) {
  const [isAdd, setIsAdd] = useState(true);
  const [updateTarget, setUpdateTarget] = useState();

  const { responseData, loading, error } = useFetch(
    `${backHost}/api/posts/${postId}/comments`,
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
      <AddComment
        postId={postId}
        setIsAdd={setIsAdd}
        isAdd={isAdd}
        updateTarget={updateTarget}
      />
      <div className={styles.commentList}>
        {responseData?.data.map((comment) => (
          <Comment
            setUpdateTarget={setUpdateTarget}
            key={comment.commentId}
            setIsAdd={setIsAdd}
            postId
            data={comment}
          />
        ))}
      </div>
    </div>
  );
}
