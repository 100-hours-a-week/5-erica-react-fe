import { viewToK, commentToK } from "../../utils/numberToK.js";
import styles from "../../styles/PostAction.module.css";

export default function PostAction({ view, comment }) {
  return (
    <div className={styles.boardAction}>
      <div className={styles.readCount}>
        <strong className={styles.readNumber}>{viewToK(view)}</strong>
        <div>조회수</div>
      </div>
      <div className={styles.commentCount}>
        <strong className={styles.commentNumber}>{commentToK(comment)}</strong>
        <div>댓글수</div>
      </div>
    </div>
  );
}
