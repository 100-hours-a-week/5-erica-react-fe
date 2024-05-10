import styles from "../styles/SignUp.module.css";
import { backHost, headers } from "../static";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { SignUpError, passwordNotMatchError } from "../utils/errorMessage";
import { navUrl } from "../utils/navigate";

const reader = new FileReader();

export default function SignUp() {
  const [profileImage, setProfileImage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [nickname, setNickname] = useState("");

  const [imageNull, setImageNull] = useState(true);

  const [emailNull, setEmailNull] = useState(false);
  const [emailNotCorrect, setEmailNotCorrect] = useState(false);
  const [emailDuplicate, setEmailDuplicate] = useState(false);

  const [passwordNull, setPasswordNull] = useState(false);
  const [passwordCheckNull, setPasswordCheckNull] = useState(false);
  const [passwordNotSame, setPasswordNotSame] = useState(false);
  const [passwordNotMatch, setPasswordNotMatch] = useState(false);

  const [nicknameNull, setNicknameNull] = useState(false);
  const [nicknameSpace, setNicknameSpace] = useState(false);
  const [nicknameDuplicate, setNicknameDuplicate] = useState(false);
  const [isValid, setIsValid] = useState(false);

  useEffect(function checkValid() {
    setIsValid(profileImage && email && password && passwordCheck && nickname && !imageNull && !emailNull &&!emailNotCorrect &&!emailDuplicate &&!passwordNotSame &&!passwordNotMatch &&!nicknameSpace &&!nicknameDuplicate &&profileImage);
  }, [email, password, passwordCheck, nickname, imageNull, emailNull, emailNotCorrect, emailDuplicate, passwordNotSame, passwordNotMatch, nicknameSpace, nicknameDuplicate, profileImage]);

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

  //인풋값을 입력하다가 포커스 아웃될 때
  const handleChangeEmail = async (event) => {
    setEmail(event.target.value);
    await checkEmailValidation(event.target.value);
  };

  const handleChangePassword = (event) => {
      setPassword(event.target.value);
      checkPasswordValidation(event.target.value, passwordCheck);
    }
 
  const handleChangePasswordCheck = (event) => {
    setPasswordCheck(event.target.value);
    checkPasswordValidation(password, event.target.value);
  };

  const handleChangeNickname = async (event) => {
    setNickname(event.target.value);
    await checkNicknameValidation(event.target.value);
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

  //이메일 유효성 검사
  const checkEmailValidation = async (email) => {
    console.log(email);
  
    if (!email) {
      console.log("setEmailNull");
      setEmailNull(true);
      setEmailNotCorrect(false);
      return false;
    }
    setEmailNull(false);
    console.log("setEmailNull false");

    const emailForm = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && (!emailForm.test(email) || email.length < 5)) {
      setEmailNotCorrect(true);
      setEmailNull(false);
      console.log("setEmailNotCorrect");
      return false;
    }
    setEmailNotCorrect(false);
    console.log("setEmailNotCorrect false");

    const isEmailDuplicate = await fetch(
      `${backHost}/api/users/email/${email}`,
      {
        headers,
        credentials: "include",
        method: "POST",
      }
    ).then(async (response) => {
      const data = await response.json();
      if (data.status === 400) {
        return true;
      }
      return false;
    });

    if (isEmailDuplicate) {
      setEmailDuplicate(true);
      return false;
    }
    setEmailDuplicate(false);

    return true;
  };

  //비밀번호 유효성 검사
  const checkPasswordValidation = (password, passwordCheck) => {
    if (!password) {
      setPasswordNull(true);
      setPasswordNotMatch(false);
      return false;
    }
    setPasswordNull(false);

    const passwordRegExp =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/;
    if (password && !passwordRegExp.test(password)) {
      setPasswordNotMatch(true);
      setPasswordNull(false);
      return false;
    }
    setPasswordNotMatch(false);

    if (!passwordCheck) {
      setPasswordCheckNull(true);
      return false;
    }
    setPasswordCheckNull(false);

    if (password !== passwordCheck) {
      setPasswordNotSame(true);
      return false;
    }
    setPasswordNotSame(false);

    return true;
  };

  //닉네임 유효성 검사
  const checkNicknameValidation = async (nickname) => {
    if (!nickname) {
      setNicknameNull(true);
      return false;
    }
    setNicknameNull(false);

    if (String(nickname).includes(" ")) {
      setNicknameSpace(true);
      return false;
    }
    setNicknameSpace(false);

    const isNicknameDuplicate = await fetch(
      `${backHost}/api/users/signup/nickname/${nickname}`,
      {
        headers,
        credentials: "include",
        method: "POST",
      }
    ).then(async (response) => {
      const data = await response.json();
      if (data.status === 400) {
        return true;
      }
      return false;
    });

    if (isNicknameDuplicate) {
      setNicknameDuplicate(true);
      return false;
    }
    setNicknameDuplicate(false);
    return true;
  };

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
          <div className={styles.emailContainer}>
            <label htmlFor="emailInput" className={styles.inputTitle}>
              이메일*
            </label>
            <input
              required
              value={email}
              type="email"
              id={styles.emailInput}
              onChange={handleChangeEmail}
              placeholder="이메일을 입력하세요"
            />
            <div className={styles.helperTextContainer}>
              <div className={styles.helperText}>
                {emailNull && SignUpError.emailNullError}
                {emailDuplicate && SignUpError.emailDuplicateError}
                {emailNotCorrect && SignUpError.emailNotValidError}
              </div>
            </div>
          </div>
          <div className={styles.passwordContainer}>
            <label htmlFor="passwordInput" className={styles.inputTitle}>
              비밀번호*
            </label>
            <input
              required
              type="password"
              value={password}
              id={styles.passwordInput}
              onChange={handleChangePassword}
              placeholder="비밀번호를 입력하세요"
            />
            <div className={styles.helperTextContainer}>
              <div className={styles.helperText}>
                {passwordNull && SignUpError.passwordNullError}
                {passwordNotSame && SignUpError.passwordNotSameError}
                {passwordNotMatch && passwordNotMatchError}
              </div>
            </div>
          </div>
          <div className={styles.passwordCheckContainer}>
            <label htmlFor="passwordCheckInput" className={styles.inputTitle}>
              비밀번호 확인*
            </label>
            <input
              required
              value={passwordCheck}
              type="password"
              id={styles.passwordCheckInput}
              onChange={handleChangePasswordCheck}
              placeholder="비밀번호를 한번 더 입력하세요"
            />
            <div className={styles.helperTextContainer}>
              <div className={styles.helperText}>
                {passwordCheckNull && SignUpError.passwordCheckNullError}
                {passwordNotSame && SignUpError.passwordNotSameError}
              </div>
            </div>
          </div>
          <div className={styles.nicknameContainer}>
            <label htmlFor="nicknameInput" className={styles.inputTitle}>
              닉네임*
            </label>
            <input
              value={nickname}
              type="text"
              id={styles.nicknameSignUpInput}
              maxLength="10"
              required
              onChange={handleChangeNickname}
              placeholder="닉네임을 입력하세요"
            />
            <div className={styles.helperTextContainer}>
              <div className={styles.helperText}>
                {nicknameNull && SignUpError.nicknameNullError}
                {nicknameSpace && SignUpError.nicknameSpaceError}
                {nicknameDuplicate && SignUpError.nicknameDuplicateError}
              </div>
            </div>
          </div>
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
