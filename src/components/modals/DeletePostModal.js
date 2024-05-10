import { backHost, headers } from "../../static.js";
import { useNavigate } from "react-router-dom";
import { enableScroll } from "../../utils/scroll.js";
import Modal from "./Modal.js";
import { navUrl } from "../../utils/navigate.js";

export default function DeletePostModal({
  postId,
  setIsPostDelete,
  isPostDelete,
}) {
  const navigate = useNavigate();
  const title = "게시글을 삭제하시겠습니까?";
  const description = "삭제한 내용은 복구할 수 없습니다.";

  const handleClickDeleteCancel = () => {
    enableScroll();
    setIsPostDelete(false);
  };

  const handleClickDeleteConfirm = async () => {
    try {
      const deleteResponse = await fetch(`${backHost}/api/posts/${postId}`, {
        headers,
        credentials: "include",
        method: "DELETE",
      });
      const responseData = await deleteResponse.json();

      if (responseData.status === 200) {
        alert("게시물이 삭제되었습니다.");
        navigate(navUrl.posts);
      } else {
        alert("게시물 삭제 실패");
      }
      setIsPostDelete(false);
      enableScroll();
    } catch (error) {
      console.error("게시물 삭제 중 에러 발생:", error);
      alert("게시물 삭제 중 에러가 발생했습니다.");
    }
  };

  return (
    <Modal
      isShow={isPostDelete}
      title={title}
      description={description}
      handleCancel={handleClickDeleteCancel}
      handleConfirm={handleClickDeleteConfirm}
    />
  );
}
