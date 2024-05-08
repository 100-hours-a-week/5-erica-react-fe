import styles from "../styles/UpdatePassword.module.css";
import { useState } from "react";
import { backHost, headers } from "../static";
import { useNavigate } from "react-router-dom";
import {
  passwordCheckNullError,
  passwordNotMatchError,
  passwordNullError,
  passwordNotSameError,
} from "../utils/errorMessage";

export default function UpdatePassword() {
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const [passwordNull, setPasswordNull] = useState(true);
  const [passwordCheckNull, setPasswordCheckNull] = useState(false);
  const [passwordNotSame, setPasswordNotSame] = useState(false);
  const [passwordNotMatch, setPasswordNotMatch] = useState(false);

  const navigate = useNavigate();

  const isAble =
    !passwordNull &&
    !passwordCheckNull &&
    !passwordNotSame &&
    !passwordNotMatch;

  const handleChangePassword = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    setPasswordNull(!newPassword);
    checkPasswordValidation(newPassword, passwordCheck);
  };

  const handleChangePasswordCheck = (event) => {
    const newPasswordCheck = event.target.value;
    setPasswordCheck(newPasswordCheck);
    setPasswordCheckNull(!newPasswordCheck);
    checkPasswordValidation(password, newPasswordCheck);
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

  const handleClickUpdatePassword = async () => {
    const updateResponse = await fetch(`${backHost}/api/users/user/password`, {
      headers,
      credentials: "include",
      method: "PATCH",
      //TODO: postimage url 다시 생성
      body: JSON.stringify({
        password,
      }),
    });

    switch (updateResponse.status) {
      case 201:
        alert("비밀번호가 수정되었습니다.");
        navigate("/");
        return;
      default:
        alert("비밀번호 수정실패");
        return;
    }
  };

  return (
    <section className={styles.passwordMain}>
      <p className={styles.pageTitle}>비밀번호 수정</p>
      <form className={styles.passwordWrapper}>
        <div className={styles.password}>
          <p className={styles.inputTitle}>비밀번호</p>
          <input
            type="password"
            id="passwordInput"
            maxLength="20"
            minLength="8"
            value={password}
            onChange={handleChangePassword}
            placeholder="비밀번호를 입력하세요"
          />
          <div className={styles.helperTextContainer}>
            <div className={`${styles.helperText} ${styles.passwordText}`}>
              {passwordNull && passwordNullError}
              {passwordNotSame && passwordNotSameError}
              {passwordNotMatch && passwordNotMatchError}
            </div>
          </div>
        </div>
        <div className={styles.passwordCheck}>
          <p className={styles.inputTitle}>비밀번호 확인</p>
          <input
            type="password"
            maxLength="20"
            minLength="8"
            value={passwordCheck}
            onChange={handleChangePasswordCheck}
            id="passwordCheckInput"
            placeholder="비밀번호를 한번 더 입력하세요"
          />
          <div className={styles.helperTextContainer}>
            <div className={`${styles.helperText} ${styles.passwordCheckText}`}>
              {passwordCheckNull && passwordCheckNullError}
              {passwordNotSame && passwordNotSameError}
            </div>
          </div>
        </div>
        <button
          type="button"
          style={isAble ? { backgroundColor: "#7f6aee" } : null}
          onClick={handleClickUpdatePassword}
          className={styles.updateButton}
          disabled={!isAble}
        >
          완료
        </button>
      </form>
    </section>
  );
}
