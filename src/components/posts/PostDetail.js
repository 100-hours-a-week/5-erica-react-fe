import { useParams } from "react-router-dom";
import Comments from "../comments/Comments";
import { backHost, headers } from "../../static";
import { checkPostOwner } from "../../utils/checkOwner.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { viewToK, commentToK } from "../../utils/numberToK";
import "../../styles/PostDetail.css";
import { DeletePostModal } from "../modals/Modals";
import { disableScroll } from "../../utils/scroll.js";

export default function PostDetail() {
  const postId = Number(useParams().id);
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const [isPostDelete, setIsPostDelete] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch(`${backHost}/api/posts/${postId}`, {
        headers,
        credentials: "include",
      });
      const responseData = await response.json();

      switch (response.status) {
        case 200:
          setPost(responseData.data);
          break;
        case 401:
          navigate("/");
          break;
        case 404:
          alert("게시물이 없습니다");
          navigate("/posts");
          break;
        default:
          alert("게시물을 불러오는 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("게시물을 불러오는 중 에러가 발생했습니다:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [postId, navigate]);

  const handleClickUpdate = async () => {
    const checkResponseData = await checkPostOwner(postId);
    if (checkResponseData.status === 403) {
      alert("본인이 작성한 게시물이 아닙니다.");
      return;
    }
    navigate(`/posts/${postId}/update`);
  };

  const handleClickDelete = async () => {
    const checkResponseData = await checkPostOwner(postId);

    if (checkResponseData.status === 403) {
      alert("본인이 작성한 게시물이 아닙니다.");
      return;
    }
    disableScroll();
    setIsPostDelete(true);
  };

  if (!post) return null;

  return (
    <>
      <section className="main">
        <div className="detailBoard">
          <div className="boardHeader">
            <p className="detailBoardTitle">{post.title}</p>
            <div className="boardHeaderBottom">
              <div className="writer">
                <img
                  className="writerImage"
                  alt="profile"
                  src={post.userImage}
                  style={{ width: "30px", height: "30px" }}
                />
                <p className="postWriterName">{post.nickname}</p>
                <div className="postWriteDate">{post.created_at}</div>
              </div>
              <div className="boardButton">
                <button onClick={handleClickUpdate} className="updateBoard">
                  수정
                </button>
                <button onClick={handleClickDelete} className="deleteBoard">
                  삭제
                </button>
              </div>
            </div>
          </div>
          <div className="boardBody">
            {post.postImage ? (
              <div className="boardImageContainer">
                <img className="boardImage" src={post.postImage} alt="board" />
              </div>
            ) : null}
            <div className="boardDetailContent">{post.content}</div>
          </div>
          <div className="boardAction">
            <div className="readCount">
              <strong className="readNumber">{viewToK(post.view)}</strong>
              <div>조회수</div>
            </div>
            <div className="commentCount">
              <strong className="commentNumber">
                {commentToK(post.comment_count)}
              </strong>
              <div>댓글수</div>
            </div>
          </div>
        </div>
        <hr />
        <Comments postId={postId} />
      </section>
      <DeletePostModal
        postId={postId}
        isPostDelete={isPostDelete}
        setIsPostDelete={setIsPostDelete}
      />
    </>
  );
}

// function PostSkeleton() {
//   return (
//     <div className"=""boardSkeleton">
//       <div className"=""boardHeader">
//         <p className"=""boardTitle"></p>
//         <div className"=""boardHeaderBottom">
//           <div className"=""writer">
//             <div className"=""writerImage"></div>
//             <p className"=""postWriterName"></p>
//             <div className"=""postWriteDate"></div>
//           </div>
//         </div>
//       </div>
//       <div className"=""boardBody">
//         <div className"=""boardImageContainer">
//           <div className"=""boardImage"></div>
//         </div>
//         <div className"=""boardContent"></div>
//       </div>
//     </div>
//   );
// }
