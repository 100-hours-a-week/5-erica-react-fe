import styles from "../../styles/skeleton/PostSkeleton.module.css";

export default function PostSkeleton() {
  return (
    <div className={styles.boardSkeleton}>
      <div className={styles.boardHeader}>
        <div className={styles.boardTitle}></div>
        <div className={styles.boardHeaderBottom}>
          <div className={styles.writer}>
            <div className={styles.writerImage}></div>
            <div className={styles.postWriterName}></div>
            <div className={styles.postWriteDate}></div>
          </div>
        </div>
      </div>
      <div className={styles.boardBody}>
        <div className={styles.boardImageContainer}>
          <div className={styles.boardImage}></div>
        </div>
        <div className={styles.boardContent}></div>
      </div>
    </div>
  );
}
