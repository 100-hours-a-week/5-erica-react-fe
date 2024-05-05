import { useState, useEffect } from "react";
import { backHost, headers } from "../../static";

export default function AddComment({ postId, isAdd, setIsAdd, updateTarget }) {
  const [comment, setComment] = useState("");
  const [isAble, setIsAble] = useState(false);

  useEffect(() => {
    if (!isAdd && updateTarget) {
      setComment(updateTarget.comment);
    }
  }, [updateTarget, isAdd]);

  const handleOnInputComment = (event) => {
    const inputComment = event.target.value;
    setComment(inputComment);
    setIsAble(!!inputComment);
  };

  const handleOnClickComment = async () => {
    if (!comment) {
      setIsAble(false);
      return;
    }

    const url = isAdd
      ? `${backHost}/api/posts/${postId}/comments`
      : `${backHost}/api/posts/${postId}/comments/${updateTarget.commentId}`;

    const method = isAdd ? "POST" : "PATCH";

    try {
      const response = await fetch(url, {
        headers,
        credentials: "include",
        method,
        body: JSON.stringify({ comment }),
      });

      const responseData = await response.json();

      if (responseData.status === 201 && isAdd) {
        alert("댓글이 등록되었습니다.");
        setComment("");
        setIsAble(false);
        window.location.reload();
      } else if (responseData.status === 200 && !isAdd) {
        alert("댓글이 수정되었습니다.");
        setIsAdd(true);
        setComment("");
      } else {
        alert("댓글 작성 실패");
      }
    } catch (error) {
      console.error("댓글 작성/수정 중 에러 발생:", error);
      alert("댓글 작성/수정 중 에러가 발생했습니다.");
    }
  };

  return (
    <form className="writeComment">
      <label htmlFor="commentInput"></label>
      <textarea
        id="commentInput"
        rows="4"
        value={comment}
        onInput={handleOnInputComment}
        placeholder="댓글을 남겨주세요!"
      ></textarea>
      <div className="line"></div>
      <div className="commentPostButton">
        <button
          onClick={handleOnClickComment}
          style={{
            backgroundColor: isAble ? "#7f6aee" : null,
          }}
          disabled={!isAble}
          type="button"
          className="writeButton"
        >
          {isAdd ? "댓글 등록" : "댓글 수정"}
        </button>
      </div>
    </form>
  );
}
