import { checkPostOwner } from "../../utils/checkOwner.js";
import { useNavigate } from "react-router-dom";
import { navUrl } from "../../utils/navigate.js";
import { disableScroll } from "../../utils/scroll.js";

import styles from "../../styles/button/PostButton.module.css";

export default function PostButton({ postId, setIsPostDelete }) {
  const navigate = useNavigate();

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
    <div className={styles.boardButton}>
      <button onClick={handleClickUpdate} className={styles.updateBoard}>
        수정
      </button>
      <button onClick={handleClickDelete} className={styles.deleteBoard}>
        삭제
      </button>
    </div>
  );
}
