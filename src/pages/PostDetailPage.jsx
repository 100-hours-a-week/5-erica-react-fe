import { useParams } from "react-router-dom";
import Comments from "../components/comments/Comments.js";
import { backHost, headers } from "../static.js";
import { checkPostOwner } from "../utils/checkOwner.js";
import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import { viewToK, commentToK } from "../utils/numberToK.js";
import styles from "../styles/PostDetail.module.css";
import DeletePostModal from "../components/modals/DeletePostModal.js";
import { disableScroll } from "../utils/scroll.js";
import UserProfileImage from "../components/users/UserProfileImage.js";
import useFetch from "../hooks/useFetch.js";
import { navUrl } from "../utils/navigate.js";

export default function PostDetail() {
  const postId = Number(useParams().id);
  const navigate = useNavigate();
  const [isPostDelete, setIsPostDelete] = useState(false);

  const {data, error, loading} = useFetch(`${backHost}/api/posts/${postId}`, {
    headers,
    credentials: "include",
  })

  if(!data || loading || error) {
    return null
  }

  if(error) {
    console.log(error);
  }

  const handleClickUpdate = async () => {
    const checkResponseData = await checkPostOwner(postId);
    if (checkResponseData.status === 403) {
      alert("본인이 작성한 게시물이 아닙니다.");
      return;
    }
    navigate(`${navUrl.posts}/${postId}/update`);
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

  return (
    <>
      <div className={styles.detailBoard}>
        <div className={styles.boardHeader}>
          <p className={styles.detailBoardTitle}>{data.title}</p>
          <div className={styles.boardHeaderBottom}>
            <div className={styles.writer}>
              <UserProfileImage image={data.userImage} />
              <p className={styles.postWriterName}>{data.nickname}</p>
              <div className={styles.postWriteDate}>{data.created_at}</div>
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
          {data.postImage ? (
            <div className={styles.boardImageContainer}>
              <img
                className={styles.boardImage}
                src={data.postImage}
                alt="board"
              />
            </div>
          ) : null}
          <div className={styles.boardDetailContent}>{data.content}</div>
        </div>
        <div className={styles.boardAction}>
          <div className={styles.readCount}>
            <strong className={styles.readNumber}>{viewToK(data.view)}</strong>
            <div>조회수</div>
          </div>
          <div className={styles.commentCount}>
            <strong className={styles.commentNumber}>
              {commentToK(data.comment_count)}
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
