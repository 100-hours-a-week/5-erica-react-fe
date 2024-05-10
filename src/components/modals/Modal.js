import { useState, useEffect } from "react";
import { getScrollPosition } from "../../utils/scroll.js";
import styles from "../../styles/PostModal.module.css";

export default function Modal({
  isShow,
  title,
  description,
  handleCancel,
  handleConfirm,
}) {
  const [position, setPosition] = useState("");
  useEffect(
    function getPosition() {
      setPosition(getScrollPosition().scrollPosition);
    },
    [isShow]
  );

  return isShow ? (
    <div className={styles.modalContainer} style={{ top: `${position}px` }}>
      <div className={styles.deem}></div>
      <div className={`${styles.memberDelete} ${styles.modal}`}>
        <p className={styles.title}>{title}</p>
        <div className={styles.description}>{description}</div>
        <div className={styles.buttonContainer}>
          <button
            onClick={handleCancel}
            className={`${styles.cancelButton} ${styles.button}`}
          >
            취소
          </button>
          <button
            onClick={handleConfirm}
            className={`${styles.submitButton} ${styles.button}`}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  ) : null;
}
