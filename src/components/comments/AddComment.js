import { useState, useEffect } from "react";
import { FetchUrl } from "../../utils/constants";
import styles from "../../styles/comment/AddComment.module.css";
import { apiRequest } from "../../utils/fetchData";

export default function AddComment({ postId, isAdd, setIsAdd, updateTarget }) {
  const [comment, setComment] = useState("");
  const [isAble, setIsAble] = useState(false);

  useEffect(
    function getUpdateComment() {
      if (!isAdd && updateTarget) {
        setComment(updateTarget.comment);
      }
    },
    [updateTarget, isAdd]
  );

  //comment유무에 따른 버튼 비/활성화
  useEffect(
    function disableButton() {
      if (comment) setIsAble(true);
      else setIsAble(false);
    },
    [comment]
  );

  const handleChangeComment = (event) => {
    const inputComment = event.target.value;
    setComment(inputComment);
    setIsAble(!!inputComment);
  };

  const handleClickComment = async () => {
    const url = isAdd
      ? `${FetchUrl.posts}/${postId}/comments`
      : `${FetchUrl.posts}/${postId}/comments/${updateTarget.commentId}`;

    const method = isAdd ? "POST" : "PATCH";

    try {
      const responseData = await apiRequest({
        url,
        method,
        body: { comment },
      });

      if (responseData.status === 201 && isAdd) {
        alert("댓글이 등록되었습니다.");
        window.location.reload();
      } else if (responseData.status === 200 && !isAdd) {
        alert("댓글이 수정되었습니다.");
        setIsAdd(true);
        window.location.reload();
      } else {
        alert("댓글 작성 실패");
      }
    } catch (error) {
      console.error("댓글 작성/수정 중 에러 발생:", error);
      alert("댓글 작성/수정 중 에러가 발생했습니다.");
    }
  };

  return (
    <form className={styles.writeComment}>
      <label htmlFor="commentInput"></label>
      <textarea
        id={styles.commentInput}
        rows="4"
        value={comment}
        onChange={handleChangeComment}
        placeholder="댓글을 남겨주세요!"
      ></textarea>
      <div className={styles.line}></div>
      <div className={styles.commentPostButton}>
        <button
          onClick={handleClickComment}
          disabled={!isAble}
          type="button"
          className={isAble ? styles.writeButton : styles.writeButtonUnable}
        >
          {isAdd ? "댓글 등록" : "댓글 수정"}
        </button>
      </div>
    </form>
  );
}
