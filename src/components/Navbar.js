import { backHost, headers } from "../static";
import BackButton from "./BackButton";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import UserProfileImage from "./users/UserProfileImage";
import useFetch from "../hooks/useFetch";
import { navUrl } from "../utils/navigate";

import styles from "../styles/Navbar.module.css";

function UserProfile() {
  const navigate = useNavigate();

  const { data, error, loading } = useFetch(`${backHost}/api/users/user`, {
    headers,
    credentials: "include",
  });

  if (!data || loading || error) {
    return null;
  }

  if (error) {
    console.log(error);
  }

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
    <div className={styles.userSetting}>
      {data?.profile_image ? (
        <UserProfileImage image={data.profile_image} size={36} />
      ) : (
        <div
          className={styles.profileImage}
          style={{ backgroundColor: "#f4f5f7" }}
        ></div>
      )}
      <div className={styles.settingList}>
        <Link
          to="/user/update"
          className={`${styles.profileUpdate} ${styles.setting}`}
        >
          회원정보수정
        </Link>
        <Link
          to="/user/password"
          className={`${styles.passwordUpdate} ${styles.setting}`}
        >
          비밀번호수정
        </Link>
        <button
          onClick={handleClickLogOut}
          className={`${styles.logOut} ${styles.setting}`}
        >
          로그아웃
        </button>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [showProfile, setShowProfile] = useState(false);
  const [showBackButton, setShowBackButton] = useState(false);
  const { pathname } = useLocation();

  useEffect(
    function showProfile() {
      if (pathname !== "/" && pathname !== "/signUp") {
        setShowProfile(true);
      } else {
        setShowProfile(false);
      }

      if (pathname === "/signUp" || pathname.includes("/posts")) {
        setShowBackButton(true);
      } else {
        setShowBackButton(false);
      }
    },
    [pathname]
  );

  return (
    <section className={styles.navbar}>
      <div className={styles.navbarContainer}>
        {showBackButton ? (
          <BackButton />
        ) : (
          <div style={{ width: "36px", height: "1px" }}></div>
        )}
        <Link
          className={styles.navbarTitle}
          to={pathname === "/" || pathname === "/signUp" ? "" : "/posts"}
        >
          아무 말 대잔치
        </Link>
        {showProfile ? (
          <UserProfile />
        ) : (
          <div style={{ width: "36px", height: "1px" }}></div>
        )}
      </div>
    </section>
  );
}
