import backButton from "../images/back.png";
import styles from "../styles/Navbar.module.css";
import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();
  const handleClickBackButton = () => {
    navigate(-1);
  };

  return (
    <button onClick={handleClickBackButton} className={styles.beforeBtn}>
      <img src={backButton} alt="backbutton" className={styles.backImage} />
    </button>
  );
}
