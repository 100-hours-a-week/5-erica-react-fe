import { DeleteCommentModal } from "../modals/Modals";
import { disableScroll } from "../../utils/scroll.js";
import { backHost, headers } from "../../static";
import { useState } from "react";

export default function Comment({ data, postId, setIsAdd, setUpdateTarget }) {
  const [isCommentDelete, setIsCommentDelete] = useState(false);

  const handleOnClickDelete = async () => {
    const checkData = await fetch(
      `${backHost}/api/posts/${postId}/comments/checkOwner`,
      {
        headers,
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ commentId: data.commentId }),
      }
    );

    const checkResponseData = await checkData.json();

    if (checkResponseData.status === 403) {
      alert("본인이 작성한 댓글이 아닙니다.");
      return;
    }
    disableScroll();
    setIsCommentDelete(true);
  };

  const handleOnClickUpdate = async () => {
    const checkData = await fetch(
      `${backHost}/api/posts/${postId}/comments/checkOwner`,
      {
        headers,
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ commentId: data.commentId }),
      }
    );

    const checkResponseData = await checkData.json();

    if (checkResponseData.status === 403) {
      alert("본인이 작성한 댓글이 아닙니다.");
      return;
    }

    setUpdateTarget({ commentId: data.commentId, comment: data.comment });
    setIsAdd(false);
  };

  return (
    <>
      <div className="comment">
        <div className="commentHeader">
          <div className="commentWriter">
            <input type="hidden" id="commentId" value={data.commentId} />
            <img
              src={data.profile_image}
              alt="profile"
              className="commentWriterImage"
            ></img>
            <div className="commentWriterName">{data.nickname}</div>
            <div className="commentWriterDate">{data.created_at}</div>
          </div>
          <div className="commentButton">
            <button onClick={handleOnClickUpdate} className="commentUpdate">
              수정
            </button>
            <button onClick={handleOnClickDelete} className="commentDelete">
              삭제
            </button>
          </div>
        </div>
        <div className="commentBody">{data.comment}</div>
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
