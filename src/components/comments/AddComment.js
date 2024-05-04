import { useState, useEffect } from "react";
import { backHost, headers } from "../../static";

export default function AddComment({ postId, isAdd, setIsAdd, updateTarget }) {
  const [comment, setComment] = useState("");
  const [isAble, setIsAble] = useState(false);

  useEffect(() => {
    if (isAdd === false && updateTarget) {
      setComment(updateTarget.comment);
    }
    console.log("AddComments.js");
  }, [updateTarget, isAdd]);

  const handleOnInputComment = (event) => {
    setComment(event.target.value);
    setIsAble(true);
    if (!event.target.value) {
      setIsAble(false);
    }
    setComment(event.target.value);
  };

  const handleOnClickAddComment = async () => {
    if (!comment) {
      setIsAble(false);
      return;
    }

    const response = await fetch(`${backHost}/api/posts/${postId}/comments`, {
      headers,
      credentials: "include",
      method: "POST",
      body: JSON.stringify({
        postId,
        comment,
      }),
    });

    const responseData = await response.json();

    switch (responseData?.status) {
      case 201:
        alert("댓글이 등록됐습니다.");
        setComment("");
        setIsAble(false);
        window.location.reload();
        return;
      default:
        alert("댓글 작성 실패");
        setIsAble(false);
        return;
    }
  };

  const handleOnClickUpdateComment = async () => {
    const response = await fetch(
      `${backHost}/api/posts/${postId}/comments/${updateTarget.commentId}`,
      {
        headers,
        credentials: "include",
        method: "PATCH",
        body: JSON.stringify({ comment }),
      }
    );

    const responseData = await response.json();

    switch (responseData?.status) {
      case 200:
        alert("댓글 수정 성공");
        break;
      default:
        alert("댓글 수정 실패");
        break;
    }
    setIsAdd(true);
    setComment("");
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
          onClick={isAdd ? handleOnClickAddComment : handleOnClickUpdateComment}
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
