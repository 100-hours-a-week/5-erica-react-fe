import { backHost, headers } from "../../static";
import { Link } from "react-router-dom";
import UserProfileImage from "./UserProfileImage";
import useFetch from "../../hooks/useFetch";
import LogoutButton from "../button/LogOutButton";
import styles from "../../styles/UserProfile.module.css";
import { navUrl } from "../../utils/navigate";

export default function UserProfile() {
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

  return (
    <div className={styles.userSetting}>
      {data?.profile_image ? (
        <UserProfileImage image={data.profile_image} size={36} />
      ) : (
        <div className={styles.profileImage}></div>
      )}
      <div className={styles.settingList}>
        <Link
          to={navUrl.updateProfile}
          className={`${styles.profileUpdate} ${styles.setting}`}
        >
          회원정보수정
        </Link>
        <Link
          to={navUrl.updatePassword}
          className={`${styles.passwordUpdate} ${styles.setting}`}
        >
          비밀번호수정
        </Link>
        <LogoutButton />
      </div>
    </div>
  );
}
