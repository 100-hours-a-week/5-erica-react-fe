import { useParams } from "react-router-dom";
import Comments from "../comments/Comments";
import { backHost, headers } from "../../static";
import { checkPostOwner } from "../../utils/checkOwner.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { viewToK, commentToK } from "../../utils/numberToK";
import styles from "../../styles/PostDetail.module.css";
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
      <div className={styles.detailBoard}>
        <div className={styles.boardHeader}>
          <p className={styles.detailBoardTitle}>{post.title}</p>
          <div className={styles.boardHeaderBottom}>
            <div className={styles.writer}>
              <img
                className={styles.writerImage}
                alt="profile"
                src={post.userImage}
                style={{ width: "30px", height: "30px" }}
              />
              <p className={styles.postWriterName}>{post.nickname}</p>
              <div className={styles.postWriteDate}>{post.created_at}</div>
            </div>
            <div className={styles.boardButton}>
              <button
                onClick={handleClickUpdate}
                className={styles.updateBoard}
              >
                수정
              </button>
              <button
                onClick={handleClickDelete}
                className={styles.deleteBoard}
              >
                삭제
              </button>
            </div>
          </div>
        </div>
        <div className={styles.boardBody}>
          {post.postImage ? (
            <div className={styles.boardImageContainer}>
              <img
                className={styles.boardImage}
                src={post.postImage}
                alt="board"
              />
            </div>
          ) : null}
          <div className={styles.boardDetailContent}>{post.content}</div>
        </div>
        <div className={styles.boardAction}>
          <div className={styles.readCount}>
            <strong className={styles.readNumber}>{viewToK(post.view)}</strong>
            <div>조회수</div>
          </div>
          <div className={styles.commentCount}>
            <strong className={styles.commentNumber}>
              {commentToK(post.comment_count)}
            </strong>
            <div>댓글수</div>
          </div>
        </div>
      </div>
      <hr />
      <Comments postId={postId} />
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
