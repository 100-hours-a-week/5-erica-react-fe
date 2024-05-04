import { useEffect, useState } from "react";
import { backHost, headers } from "../../static";
import AddComment from "./AddComment.js";
import Comment from "./Comment.js";

export default function Comments({ postId }) {
  const [result, setResult] = useState([]);
  const [isAdd, setIsAdd] = useState(true);
  const [updateTarget, setUpdateTarget] = useState();

  const id = Number(postId);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${backHost}/api/posts/${id}/comments`, {
        headers,
        credentials: "include",
      });

      const responseData = await response.json();

      switch (responseData.status) {
        case 200:
          setResult(responseData.data);
          break;
        default:
          return;
      }
    };

    fetchData();
    console.log("Comments.js");
  }, [id, isAdd]);

  return (
    <div className="commentContainer">
      <AddComment
        postId={postId}
        setIsAdd={setIsAdd}
        isAdd={isAdd}
        updateTarget={updateTarget}
      />
      <div className="commentList">
        {result.map((comment) => (
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
