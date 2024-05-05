import "../../styles/SignUp.css";
import { backHost, headers } from "../../static";
import { Link } from "react-router-dom";
import { useState } from "react";

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

  //이미지 변경 시
  const handleChangeProfileImage = (event) => {
    if (event.target.files.length === 0) {
      setProfileImage(null);
      return;
    }
    reader.onload = (data) => {
      setProfileImage(data.target.result);
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  //인풋값을 입력하다가 포커스 아웃될 때
  const handleBlurEmail = async (event) => {
    const email = event.target.value;
    setEmail(email);
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
    setNicknameNull(!nickname);
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
    if (!password || !passwordCheck || password !== passwordCheck) {
      setPasswordNotSame(true);
      return false;
    }
    setPasswordNotSame(false);

    const passwordRegExp =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/;
    if (!passwordRegExp.test(password)) {
      setPasswordNotMatch(true);
      return false;
    }
    setPasswordNotMatch(false);
    return true;
  };

  //닉네임 유효성 검사
  const checkNicknameValidation = async (nickname) => {
    if (!nickname || nickname.indexOf(" ") !== -1) {
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
    <div className="signUpMain">
      <p className="mainTitle">회원가입</p>
      <form className="signUpContainer">
        <div className="topContainer">
          <p className="inputTitle">프로필 사진</p>
          <div className="helperTextContainer">
            <div className="helperText profileImageText">
              {imageNull ? "* 프로필 사진을 추가해주세요." : null}
            </div>
          </div>
          <div className="imageContainer">
            {profileImage ? (
              <img className="imageShow" alt="profile" src={profileImage} />
            ) : null}
            <div className="imageUpdate">
              <label htmlFor="imageInput" className="imageUpdateButton">
                +
              </label>
              <input
                id="imageInput"
                onChange={handleChangeProfileImage}
                type="file"
                accept="image/*"
              />
            </div>
          </div>
        </div>
        <div className="bottomContainer">
          <div className="emailContainer">
            <label htmlFor="emailInput" className="inputTitle">
              이메일*
            </label>
            <input
              required
              type="email"
              id="emailInput"
              onBlur={handleBlurEmail}
              placeholder="이메일을 입력하세요"
            />
            <div className="helperTextContainer">
              <div className="helperText emailText">
                {emailNull
                  ? "* 이메일을 입력해주세요"
                  : emailNotCorrect
                  ? "* 올바른 이메일 주소 형식을 입력해주세요. (예: example@example.com)"
                  : emailDuplicate
                  ? "*중복된 이메일 입니다."
                  : null}
              </div>
            </div>
          </div>
          <div className="passwordContainer">
            <label htmlFor="passwordInput" className="inputTitle">
              비밀번호*
            </label>
            <input
              required
              type="password"
              id="passwordInput"
              onBlur={handleBlurPassword}
              placeholder="비밀번호를 입력하세요"
            />
            <div className="helperTextContainer">
              <div className="helperText passwordText">
                {passwordNull
                  ? "* 비밀번호를 입력해주세요."
                  : passwordNotSame
                  ? "* 비밀번호가 다릅니다."
                  : passwordNotMatch
                  ? "* 비밀번호는 대문자, 소문자, 숫자, 특수문자가 들어가야 합니다 (8자 이상 20자 이하)"
                  : null}
              </div>
            </div>
          </div>
          <div className="passwordCheckContainer">
            <label htmlFor="passwordCheckInput" className="inputTitle">
              비밀번호 확인*
            </label>
            <input
              required
              type="password"
              id="passwordCheckInput"
              onBlur={handleBlurPasswordCheck}
              placeholder="비밀번호를 한번 더 입력하세요"
            />
            <div className="helperTextContainer">
              <div className="helperText passwordCheckText">
                {passwordCheckNull
                  ? "* 비밀번호를 한번 더 입력해주세요."
                  : passwordNotSame
                  ? "* 비밀번호가 다릅니다."
                  : null}
              </div>
            </div>
          </div>
          <div className="nicknameContainer">
            <label htmlFor="nicknameInput" className="inputTitle">
              닉네임*
            </label>
            <input
              type="text"
              id="nicknameSignUpInput"
              maxLength="10"
              required
              onBlur={handleBlurNickname}
              placeholder="닉네임을 입력하세요"
            />
            <div className="helperTextContainer">
              <div className="helperText nicknameText">
                {nicknameNull
                  ? "* 닉네임을 입력해주세요."
                  : nicknameSpace
                  ? "* 띄어쓰기를 없애주세요"
                  : nicknameDuplicate
                  ? "* 중복된 닉네임입니다."
                  : null}
              </div>
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={handleClickSignUp}
          className="signUpButton"
          style={{
            backgroundColor:
              !imageNull &&
              !emailNull &&
              !emailNotCorrect &&
              !emailDuplicate &&
              !passwordNotSame &&
              !passwordNotMatch &&
              !nicknameSpace &&
              !nicknameDuplicate &&
              profileImage
                ? "#7f6aee"
                : "lightgray",
          }}
          disabled={
            imageNull ||
            emailNull ||
            emailNotCorrect ||
            emailDuplicate ||
            passwordNotSame ||
            passwordNotMatch ||
            nicknameSpace ||
            nicknameDuplicate ||
            !profileImage
          }
        >
          회원가입
        </button>
      </form>
      <Link to="/" className="goLoginButton">
        로그인하러 가기
      </Link>
    </div>
  );
}
