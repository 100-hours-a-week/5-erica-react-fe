import styles from "../../styles/button/LogoutButton.module.css";
import { backHost, headers } from "../../static";
import { navUrl } from "../../utils/navigate";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleClickLogOut = async () => {
    try {
      const response = await fetch(`${backHost}/api/users/logOut`, {
        headers,
        method: "DELETE",
        credentials: "include",
      });

      const responseData = await response.json();

      if (responseData.status !== 200) {
        alert("로그아웃 실패. 다시 시도하세요.");
        return;
      }

      alert("로그아웃 됐습니다.");
      navigate(navUrl.logIn);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <button
      onClick={handleClickLogOut}
      className={`${styles.logOut} ${styles.setting}`}
    >
      로그아웃
    </button>
  );
}
