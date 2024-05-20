import { FetchUrl } from "../../utils/constants.js";
import { enableScroll } from "../../utils/scroll.js";
import Modal from "./Modal.js";
import { apiRequest } from "../../utils/fetchData.js";

export default function DeleteCommentModal({
  postId,
  commentId,
  isCommentDelete,
  setIsCommentDelete,
}) {
  const title = "댓글을 삭제하시겠습니까?";
  const description = "삭제한 내용은 복구할 수 없습니다.";

  const handleClickDeleteConfirm = async () => {
    try {
      const responseData = await apiRequest({
        url: `${FetchUrl.posts}/${postId}/comments/${commentId}`,
        method: "DELETE",
      });

      if (responseData?.status === 200) {
        alert("댓글이 삭제되었습니다.");
        window.location.reload();
      } else {
        alert("삭제 실패");
      }

      setIsCommentDelete(false);
      enableScroll();
    } catch (error) {
      console.error("댓글 삭제 중 에러 발생:", error);
      alert("댓글 삭제 중 에러가 발생했습니다.");
    }
  };

  const handleClickDeleteCancel = () => {
    enableScroll();
    setIsCommentDelete(false);
  };

  return (
    <Modal
      isShow={isCommentDelete}
      title={title}
      description={description}
      handleCancel={handleClickDeleteCancel}
      handleConfirm={handleClickDeleteConfirm}
    />
  );
}
