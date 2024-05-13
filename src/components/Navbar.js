import BackButton from "./BackButton";
import { Link } from "react-router-dom";
import { navUrl } from "../utils/navigate";

import UserProfile from "./users/UserProfile";
import styles from "../styles/Navbar.module.css";
import { useShowProfile } from "../hooks/useShowProfile";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();
  const { showProfile, showBackButton } = useShowProfile(pathname);
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
