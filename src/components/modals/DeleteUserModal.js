import { useNavigate } from "react-router-dom";
import { enableScroll } from "../../utils/scroll.js";
import Modal from "./Modal.js";
import { navUrl } from "../../utils/navigate.js";
import { FetchUrl } from "../../utils/constants.js";
import { apiRequest } from "../../utils/fetchData.js";

export default function DeleteUserModal({ isDelete, setIsDelete }) {
  const navigate = useNavigate();

  const title = "회원탈퇴 하시겞습니까?";
  const description = "작성된 게시글과 댓글은 삭제됩니다.";

  const handleClickDeleteUserCancel = () => {
    setIsDelete(false);
    enableScroll();
  };

  const handleClickDeleteUserConfirm = async () => {
    try {
      const deleteData = await apiRequest({
        url: FetchUrl.user,
        method: "DELETE",
      });

      if (deleteData.status === 200) {
        alert("계정이 삭제되었습니다.");
        navigate(navUrl.logIn);
      } else {
        alert("계정삭제 실패");
      }
      setIsDelete(false);
    } catch (error) {
      console.error("계정 삭제 중 에러 발생:", error);
      alert("계정 삭제 중 에러가 발생했습니다.");
    }
  };

  return (
    <Modal
      isShow={isDelete}
      title={title}
      description={description}
      handleCancel={handleClickDeleteUserCancel}
      handleConfirm={handleClickDeleteUserConfirm}
    />
  );
}
