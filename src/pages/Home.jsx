import welcome from "../images/welcome.gif"
import styles from "../styles/Home.module.css"
import { useState } from "react";
import { usePosition } from "../hooks/usePosition";
import { disableScroll } from "../utils/scroll";
import LogInPage from "./LogInPage";
import SignUpPage from "./SignUpPage"

export default function Home() {
  const [logIn, setLogIn] = useState(false);
  const [signUp, setSignUp] = useState(false);
  
  const position = usePosition(logIn || signUp);

  const handleLogInClick = () => {
    disableScroll();
    setLogIn(true);
  }

  const handleSignUpClick = () => {
    disableScroll();
    setSignUp(true);
  }

  const closeModal= () => {
    setLogIn(false);
    setSignUp(false);
  }

  return (
  <div>
    <img className={styles.welcomeImage} src={welcome} alt="초기 이미지" />
    <div className={styles.buttonContainer}>
      <div onClick={handleLogInClick}  className={`${styles.logIn} ${styles.button}`}>
        로그인
      </div>
      <div onClick={handleSignUpClick} className={`${styles.signUp} ${styles.button}`}>
        회원가입
      </div>
    </div>

    {(logIn || signUp) && 
      <div className={styles.modalContainer} style={{ top: `${position}px` }}>
        <div onClick={closeModal} className={styles.deem}></div>
        {logIn && <div className={styles.modal}>
          <div className={styles.logInModal}>
            <LogInPage />
          </div>
        </div>}
        {signUp && <div className={styles.modal}>
          <div className={styles.signUpModal}>
            <SignUpPage setLogIn={setLogIn} setSignUp={setSignUp}/>
          </div>
        </div>}
      </div>
    }
    </div>
  )
}