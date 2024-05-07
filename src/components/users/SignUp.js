import styles from "../../styles/SignUp.module.css";
import { backHost, headers } from "../../static";
import { Link } from "react-router-dom";
import { useState } from "react";
import { SignUpError, passwordNotMatchError } from "../../utils/errorMessage";

const reader = new FileReader();

export default function SignUp() {
  const [profileImage, setProfileImage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [nickname, setNickname] = useState("");

  const [imageNull, setImageNull] = useState(false);
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

  const isValid =
    !imageNull &&
    !emailNull &&
    !emailNotCorrect &&
    !emailDuplicate &&
    !passwordNotSame &&
    !passwordNotMatch &&
    !nicknameSpace &&
    !nicknameDuplicate &&
    profileImage;

  //이미지 변경 시
  const handleChangeProfileImage = (event) => {
    if (event.target.files.length === 0) {
      setProfileImage(null);
      setImageNull(false);
      return;
    }
    reader.onload = (data) => {
      setImageNull(false);
      setProfileImage(data.target.result);
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  //인풋값을 입력하다가 포커스 아웃될 때
  const handleBlurEmail = async (event) => {
    const email = event.target.value;
    setEmail(email);
    setEmailNull(!email);
    await checkEmailValidation(email);
  };

  const handleBlurPassword = (event) => {
    const password = event.target.value;
    setPassword(password);
    setPasswordNull(!password);
    checkPasswordValidation(password, passwordCheck);
  };

  const handleBlurPasswordCheck = (event) => {
    const passwordCheck = event.target.value;
    setPasswordCheck(passwordCheck);
    setPasswordCheckNull(!passwordCheck);
    checkPasswordValidation(password, passwordCheck);
  };

  const handleBlurNickname = async (event) => {
    const nickname = event.target.value;
    setNickname(nickname);
    await checkNicknameValidation(nickname);
  };

  //프로필 이미지 유효성 검사
  const checkImageValidation = (image) => {
    if (!image) {
      setImageNull(true);
      return false;
    }
    setImageNull(false);
    return true;
  };

  //이메일 유효성 검사
  const checkEmailValidation = async (email) => {
    if (!email) {
      setEmailNull(true);
      setEmailNotCorrect(false);
      return false;
    }
    setEmailNull(false);

    const emailForm = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailForm.test(email) || email.length < 5) {
      setEmailNotCorrect(true);
      return false;
    }
    setEmailNotCorrect(false);

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
      return false;
    }
    setPasswordNull(false);

    const passwordRegExp =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/;
    if (!passwordRegExp.test(password)) {
      setPasswordNotMatch(true);
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
    // 프로필 이미지 유효성 검사
    const isImageValid = checkImageValidation(profileImage);
    // 이메일 유효성 검사
    const isEmailValid = await checkEmailValidation(email);
    // 비밀번호 유효성 검사
    const isPasswordValid = checkPasswordValidation(password, passwordCheck);
    // 닉네임 유효성 검사
    const isNicknameValid = await checkNicknameValidation(nickname);

    if (
      !isImageValid ||
      !isEmailValid ||
      !isPasswordValid ||
      !isNicknameValid ||
      !profileImage
    ) {
      return;
    }

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
          window.location.href = "/";
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
              type="email"
              id={styles.emailInput}
              onBlur={handleBlurEmail}
              placeholder="이메일을 입력하세요"
            />
            <div className={styles.helperTextContainer}>
              <div className={styles.helperText}>
                {emailNull && SignUpError.emailNullError}
                {emailNotCorrect && SignUpError.emailNotValidError}
                {emailDuplicate && SignUpError.emailDuplicateError}
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
              id={styles.passwordInput}
              onBlur={handleBlurPassword}
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
              type="password"
              id={styles.passwordCheckInput}
              onBlur={handleBlurPasswordCheck}
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
              type="text"
              id={styles.nicknameSignUpInput}
              maxLength="10"
              required
              onBlur={handleBlurNickname}
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
