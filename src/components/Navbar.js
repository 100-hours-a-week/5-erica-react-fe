import { Link } from "react-router-dom";
import { navUrl } from "../utils/navigate";
import logo from "../images/logo.png";
import UserProfile from "./users/UserProfile";
import styles from "../styles/Navbar.module.css";
import { useShowProfile } from "../hooks/useShowProfile";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();
  const { showProfile } = useShowProfile(pathname);
  return (
    <section className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <Link
          className={styles.navbarTitle}
          to={
            pathname === navUrl.logIn || pathname === navUrl.signUp
              ? navUrl.logIn
              : navUrl.posts
          }
        >
          <img alt="로고이미지" src={logo} className={styles.logo} />
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
