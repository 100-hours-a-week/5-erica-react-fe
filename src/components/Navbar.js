import BackButton from "./BackButton";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { navUrl } from "../utils/navigate";

import UserProfile from "./users/UserProfile";
import styles from "../styles/Navbar.module.css";

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
          <div className={styles.emptyBackButton}></div>
        )}
        <Link
          className={styles.navbarTitle}
          to={
            pathname === navUrl.logIn || pathname === navUrl.signUp
              ? navUrl.logIn
              : navUrl.posts
          }
        >
          아무 말 대잔치
        </Link>
        {showProfile ? (
          <UserProfile />
        ) : (
          <div className={styles.emptyUserProfile}></div>
        )}
      </div>
    </section>
  );
}
