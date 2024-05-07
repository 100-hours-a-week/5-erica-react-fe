import { backHost, headers } from "../../static.js";
import { useNavigate } from "react-router-dom";
import { enableScroll } from "../../utils/scroll.js";
import Modal from "./Modal.js";

export default function DeleteUserModal({ isDelete, setIsDelete }) {
  const navigate = useNavigate();

  const title = "회원탈퇴 하시겞습니까?";
  const description = "작성된 게시글과 댓글은 삭제됩니다.";

  const handleOnClickDeleteUserCancel = () => {
    setIsDelete(false);
    enableScroll();
  };

  const handleOnClickDeleteUserConfirm = async () => {
    try {
      const deleteResponse = await fetch(`${backHost}/api/users/user`, {
        headers,
        credentials: "include",
        method: "DELETE",
      });
      const deleteData = await deleteResponse.json();

      if (deleteData.status === 200) {
        alert("계정이 삭제되었습니다.");
        navigate("/");
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
      handleCancel={handleOnClickDeleteUserCancel}
      handleConfirm={handleOnClickDeleteUserConfirm}
    />
  );
}
