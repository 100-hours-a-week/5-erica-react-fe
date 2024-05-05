import { useEffect, useState } from "react";
import { backHost, headers } from "../../static";
import AddComment from "./AddComment.js";
import Comment from "./Comment.js";

export default function Comments({ postId }) {
  const [comments, setComments] = useState([]);
  const [isAdd, setIsAdd] = useState(true);
  const [updateTarget, setUpdateTarget] = useState();

  const id = Number(postId);

  const fetchData = async () => {
    try {
      const response = await fetch(`${backHost}/api/posts/${postId}/comments`, {
        headers,
        credentials: "include",
      });
      const responseData = await response.json();

      if (response.status === 200) {
        setComments(responseData.data);
      }
    } catch (error) {
      console.error("댓글 데이터를 불러오는 중 에러 발생:", error);
    }
  };

  useEffect(() => {
    fetchData();
    console.log("Comments.js");
  }, [postId, isAdd]);

  return (
    <div className="commentContainer">
      <AddComment
        postId={postId}
        setIsAdd={setIsAdd}
        isAdd={isAdd}
        updateTarget={updateTarget}
      />
      <div className="commentList">
        {comments.map((comment) => (
          <Comment
            setUpdateTarget={setUpdateTarget}
            key={comment.commentId}
            setIsAdd={setIsAdd}
            postId={id}
            data={comment}
          />
        ))}
      </div>
    </div>
  );
}
