import styles from "../../styles/user/UserImage.module.css";

export default function UserProfileImage({ image, size = 32 }) {
  return (
    <img
      alt="profile"
      src={image}
      style={{ width: `${size}px`, height: `${size}px` }}
      className={styles.userImage}
    />
  );
}
