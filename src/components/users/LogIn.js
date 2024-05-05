import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { backHost, headers } from "../../static";
import "../../styles/LogIn.css";

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailNotValid, setEmailNotValid] = useState(false);
  const [logInSuccess, setLogInSuccess] = useState(false);
  const navigate = useNavigate();

  const handleOnChangeEmail = (event) => {
    setEmail(event.target.value);
    checkEmailValidation(event.target.value);
  };

  const handleOnChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleOnClickLogIn = async () => {
    const isEmailValid = checkEmailValidation(email);

    if (!isEmailValid) {
      return;
    }

    try {
      const response = await fetch(`${backHost}/api/users/login`, {
        headers,
        credentials: "include",
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const responseData = await response.json();

      switch (responseData.status) {
        case 200:
          setLogInSuccess(true);
          setTimeout(() => {
            navigate("/posts");
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
    <section className="logIn">
      <div className="title">로그인</div>
      <form className="logInContent">
        <div className="emailLogInContainer">
          <label htmlFor="email" className="logInTitle">
            이메일
          </label>
          <input
            type="email"
            minLength="8"
            id="email"
            required
            placeholder="이메일을 입력하세요"
            onChange={handleOnChangeEmail}
          />
        </div>
        <div className="passwordLogInContainer">
          <label htmlFor="password" className="logInTitle">
            비밀번호
          </label>
          <input
            type="password"
            id="password"
            required
            onChange={handleOnChangePassword}
            placeholder="비밀번호를 입력하세요"
          />
          <div className="helperTextContainer">
            <div className="helperText">
              {emailNotValid &&
                "* 올바른 이메일 주소 형식을 입력해주세요. \n (예: example@example.com)"}
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={handleOnClickLogIn}
          className="logInButton"
          style={
            logInSuccess
              ? { backgroundColor: "#7f6aee" }
              : { backgroundColor: "#aca0eb", disabled: true }
          }
          disabled={!email || !password}
        >
          로그인
        </button>
      </form>
      <Link to="/signUp" className="goSignUpButton">
        회원가입
      </Link>
    </section>
  );
}
