import styles from "../../styles/button/LogoutButton.module.css";
import { backHost, headers } from "../../static";
import { navUrl } from "../../utils/navigate";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const navigate = useNavigate();
  const [logoutStatus, setLogoutStatus] = useState(null);

  const handleClickLogOut = useCallback(async () => {
    try {
      setLogoutStatus("loading");
      const response = await fetch(`${backHost}/api/users/logOut`, {
        headers,
        method: "DELETE",
        credentials: "include",
      });

      const responseData = await response.json();

      if (responseData.status !== 200) {
        setLogoutStatus("fail");
        alert("로그아웃 실패. 다시 시도하세요.");
        return;
      }
      setLogoutStatus("success");
      alert("로그아웃 됐습니다.");
      navigate(navUrl.logIn);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }, [navigate]);

  return (
    <button
      onClick={handleClickLogOut}
      className={`${styles.logOut} ${styles.setting}`}
      disabled={logoutStatus === "loading"}
    >
      로그아웃
    </button>
  );
}
