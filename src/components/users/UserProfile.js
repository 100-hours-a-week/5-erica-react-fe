import { headers } from "../../static";
import { Link } from "react-router-dom";
import UserProfileImage from "./UserProfileImage";
import useFetch from "../../hooks/useFetch";
import LogoutButton from "../button/LogOutButton";
import styles from "../../styles/user/UserProfile.module.css";
import { navUrl } from "../../utils/navigate";
import { FetchUrl } from "../../utils/constants";

export default function UserProfile() {
  const { responseData, error, loading } = useFetch(FetchUrl.user, {
    headers,
    credentials: "include",
  });

  if (!responseData || loading || error) {
    return null;
  }

  if (error) {
    console.log(error);
  }

  return (
    <div className={styles.userSetting}>
      {responseData?.data.profileImage ? (
        <UserProfileImage image={responseData?.data.profileImage} size={36} />
      ) : (
        <div className={styles.profileImage}></div>
      )}
      <div className={styles.settingList}>
        <Link
          to={navUrl.updateProfile}
          className={`${styles.profileUpdate} ${styles.setting}`}
        >
          프로필 수정
        </Link>
        <Link
          to={navUrl.updatePassword}
          className={`${styles.passwordUpdate} ${styles.setting}`}
        >
          비밀번호 수정
        </Link>
        <LogoutButton />
      </div>
    </div>
  );
}
