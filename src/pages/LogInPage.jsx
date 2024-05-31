import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/LogIn.module.css";
import { emailNotValidErrorLine } from "../utils/errorMessage";
import { navUrl } from "../utils/navigate";
import { FetchUrl } from "../utils/constants";
import { apiRequest } from "../utils/fetchData";
import { enableScroll } from "../utils/scroll";

export default function LogInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailNotValid, setEmailNotValid] = useState(false);
  const [logInSuccess, setLogInSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
    checkEmailValidation(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleClickLogIn = async () => {
    const isEmailValid = checkEmailValidation(email);
  
    if (!isEmailValid) return;
  
    try {
      const responseData = await apiRequest({
        url: FetchUrl.logIn,
        method: "POST",
        body: {
          email,
          password,
        },
      });
  
      switch (responseData.status) {
        case 200:
          setLogInSuccess(true);
          enableScroll();
          setTimeout(() => {
            navigate(navUrl.posts, { replace: true });
          }, 3000);
          break;
        default:
          setLogInSuccess(false);
          alert("로그인 실패");
          break;
      }
    } catch (error) {
      console.error("로그인 요청 중 에러가 발생했습니다:", error);
      alert("로그인 요청 중 에러가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  };
  

  const checkEmailValidation = (email) => {
    const emailForm = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailForm.test(email) || email.length < 5) {
      setEmailNotValid(true);
      return false;
    }
    setEmailNotValid(false);
    return true;
  };

  return (
    <section className={styles.logIn}>
      <div className={styles.title}>로그인</div>
      <form className={styles.logInContent}>
        <div className={styles.emailLogInContainer}>
          <label htmlFor="email" className={styles.logInTitle}>
            이메일
          </label>
          <input
            type="email"
            minLength="8"
            id="email"
            required
            placeholder="이메일을 입력하세요"
            onChange={handleChangeEmail}
          />
        </div>
        <div className={styles.passwordLogInContainer}>
          <label htmlFor="password" className={styles.logInTitle}>
            비밀번호
          </label>
          <input
            type="password"
            id="password"
            required
            onChange={handleChangePassword}
            placeholder="비밀번호를 입력하세요"
          />
          <div className={styles.helperTextContainer}>
            <div className={styles.helperText}>
              {emailNotValid && emailNotValidErrorLine}
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={handleClickLogIn}
          className={
            logInSuccess ? styles.logInButton : styles.logInButtonDisabled
          }
          disabled={!email || !password}
        >
          로그인
        </button>
      </form>
    </section>
  );
}
