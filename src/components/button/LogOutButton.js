import styles from "../../styles/button/LogoutButton.module.css";
import { navUrl } from "../../utils/navigate";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FetchUrl } from "../../utils/constants";
import { apiRequest } from "../../utils/fetchData";

export default function LogoutButton() {
  const navigate = useNavigate();
  const [logoutStatus, setLogoutStatus] = useState(null);

  const handleClickLogOut = useCallback(async () => {
    try {
      setLogoutStatus("loading");
      const responseData = await apiRequest({
        url: FetchUrl.logOut,
        method: "DELETE",
      });

      if (responseData.status !== 200) {
        setLogoutStatus("fail");
        alert("로그아웃 실패. 다시 시도하세요.");
        return;
      }

      setLogoutStatus("success");
      alert("로그아웃 됐습니다.");
      navigate(navUrl.home);
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
