import styles from "../styles/SignUp.module.css";
import { backHost, headers } from "../static";
import { Link } from "react-router-dom";
import { useState, useEffect, useReducer } from "react";
import { SignUpError } from "../utils/errorMessage";
import { navUrl } from "../utils/navigate";
import { emailInitialMessage, emailMessageReducer  } from "../reducer/emailReducer";
import { passwordInitialMessage, passwordMessageReducer } from "../reducer/passwordReducer";
import { passwordCheckInitialMessage,passwordCheckMessageReducer } from "../reducer/passwordCheckReducer";
import { nicknameReduer, nicknameInitialMessage } from "../reducer/nicknameReducer";

import EmailInput from "../components/input/EmailInput";
import PasswordInput from "../components/input/PasswordInput";
import NicknameInput from "../components/input/NicknameInput";

const reader = new FileReader();

export default function SignUp() {
  const [emailState, emailDispatcher] = useReducer(emailMessageReducer, emailInitialMessage);
  const [passwordState, passwordDispatcher] = useReducer(passwordMessageReducer,passwordInitialMessage)
  const [passwordCheckState, passwordCheckDispatcher] = useReducer(passwordCheckMessageReducer, passwordCheckInitialMessage)
  const [nicknameState, nicknameDispatcher] = useReducer(nicknameReduer, nicknameInitialMessage, )

  const [profileImage, setProfileImage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [nickname, setNickname] = useState("");

  const [imageNull, setImageNull] = useState(true);

  const [isValid, setIsValid] = useState(false);

  useEffect(function checkValid() {
    setIsValid(profileImage && email && password && passwordCheck && nickname && !emailState.emailMessage && !passwordState.passwordMessage && !passwordCheckState.passwordCheckMessage && !nicknameState.nicknameMessage);
  }, [profileImage, email, nickname, password, passwordCheck, emailState, passwordState, passwordCheckState, nicknameState]);

  //이미지 변경 시
  const handleChangeProfileImage = (event) => {
    if (event.target.files.length === 0) {
      setProfileImage(null);
      setImageNull(true);
      return;
    }
    reader.onload = (data) => {
      setImageNull(false);
      setProfileImage(data.target.result);
    };
    reader.readAsDataURL(event.target.files[0]);
  };
  //프로필 이미지 유효성 검사
  // const checkImageValidation = () => {
  //   if (!profileImage) {
  //     setImageNull(true);
  //     return false;
  //   }
  //   setImageNull(false);
  //   return true;
  // };


  //회원가입 버튼 클릭 시
  const handleClickSignUp = async () => {
    if (!isValid)  return ;

    const data = JSON.stringify({
      email,
      password,
      nickname,
      profile_image: profileImage,
    });

    try {
      const response = await fetch(`${backHost}/api/users/signup`, {
        headers,
        credentials: "include",
        method: "POST",
        body: data,
      });

      const responseData = await response.json();

      switch (responseData.status) {
        case 201:
          alert("회원가입 성공");
          window.location.href = navUrl.logIn;
          break;
        default:
          alert("회원가입 실패");
          break;
      }
    } catch (error) {
      console.error("회원가입 중 에러 발생:", error);
      alert("회원가입 중 에러가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  return (
    <section className={styles.signUpMain}>
      <p className={styles.mainTitle}>회원가입</p>
      <form className={styles.signUpContainer}>
        <div className={styles.topContainer}>
          <p className={styles.inputTitle}>프로필 사진</p>
          <div className={styles.helperTextContainer}>
            <div className={styles.helperText}>
              {imageNull && SignUpError.imageNullError}
            </div>
          </div>
          <div className={styles.imageContainer}>
            {profileImage ? (
              <img
                className={styles.imageShow}
                alt="profile"
                src={profileImage}
              />
            ) : null}
            <div className={styles.imageUpdate}>
              <label htmlFor="imageInput" className={styles.imageUpdateButton}>
                +
              </label>
              <input
                className={styles.imageInput}
                id="imageInput"
                onChange={handleChangeProfileImage}
                type="file"
                accept="image/*"
              />
            </div>
          </div>
        </div>
        <div className={styles.bottomContainer}>
          <EmailInput email={email} setEmail={setEmail} emailState={emailState} emailDispatcher={emailDispatcher} />
          <PasswordInput password={password} setPassword={setPassword} passwordCheck={passwordCheck} setPasswordCheck={setPasswordCheck} passwordState={passwordState} passwordDispatcher={passwordDispatcher} passwordCheckState={passwordCheckState} passwordCheckDispatcher={passwordCheckDispatcher} />
          <NicknameInput nickname={nickname} setNickname={setNickname} nicknameState={nicknameState} nicknameDispatcher={nicknameDispatcher} />
        </div>
        <button
          type="button"
          onClick={handleClickSignUp}
          className={
            isValid ? styles.signUpButton : styles.signUpButtonDisabled
          }
          disabled={!isValid}
        >
          회원가입
        </button>
      </form>
      <Link to="/" className={styles.goLoginButton}>
        로그인하러 가기
      </Link>
    </section>
  );
}
