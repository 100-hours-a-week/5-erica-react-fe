import styles from "../../styles/skeleton/PostsSkeleton.module.css";

export default function PostsSkeleton() {
  return (
    <>
      {Array.from({ length: 5 }, (_, index) => (
        <MiniPostSkeleton key={index} />
      ))}
    </>
  );
}

function MiniPostSkeleton() {
  return (
    <div className={styles.miniBoardContainer}>
      <div className={styles.miniBoard}>
        <div className={styles.miniBoardTitle}></div>
        <div className={styles.miniBoardContent}>
          <div className={styles.action}></div>
          <div className={styles.date}></div>
        </div>
      </div>
      <hr className={styles.miniBoardHr} />
      <div className={styles.miniBoardWriter}>
        <div className={styles.miniWriterImage} />
        <p className={styles.miniWriterName}></p>
      </div>
    </div>
  );
}
