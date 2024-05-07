import styles from "../../styles/UpdatePassword.module.css";
import { useState } from "react";
import { backHost, headers } from "../../static";
import { useNavigate } from "react-router-dom";

export default function UpdatePassword() {
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [isAble, setIsAble] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleChangePassword = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    validatePassword(newPassword, passwordCheck);
  };

  const handleChangePasswordCheck = (event) => {
    const newPasswordCheck = event.target.value;
    setPasswordCheck(newPasswordCheck);
    validatePassword(password, newPasswordCheck);
  };

  //비밀번호 유효성 검사
  const validatePassword = (newPassword, newPasswordCheck) => {
    if (!newPassword || !newPasswordCheck) {
      setErrorMessage("* 비밀번호를 입력해주세요.");
      setIsAble(false);
      return;
    }

    if (newPassword !== newPasswordCheck) {
      setErrorMessage("* 비밀번호가 다릅니다.");
      setIsAble(false);
      return;
    }

    const passwordRegExp =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/;

    if (!passwordRegExp.test(newPassword)) {
      setErrorMessage(
        "* 비밀번호는 대문자, 소문자, 숫자, 특수문자가 들어가야 합니다 (8자 이상 20자 이하)"
      );
      setIsAble(false);
      return;
    }

    setErrorMessage("");
    setIsAble(true);
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
        setIsAble(true);
        setTimeout(() => {
          alert("비밀번호가 수정되었습니다.");
          setIsAble(false);
          navigate("/");
        }, 3000);
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
            <div
              className={`${styles.helperText} ${styles.passwordText}`}
            ></div>
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
              {errorMessage}
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
