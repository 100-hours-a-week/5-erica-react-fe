import styles from "../../styles/input/emailInput.module.css";
import { headers, backHost } from "../../static";

export default function EmailInput({
  email,
  setEmail,
  emailState,
  emailDispatcher,
}) {
  //인풋값을 입력하다가 포커스 아웃될 때
  const handleChangeEmail = async (event) => {
    setEmail(event.target.value);
    await checkEmailValidation(event.target.value);
  };

  //이메일 유효성 검사
  const checkEmailValidation = async (email) => {
    if (!email) {
      emailDispatcher({ type: "emailNull" });
      return false;
    }
    emailDispatcher({ type: "reset" });

    const emailForm = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && (!emailForm.test(email) || email.length < 5)) {
      emailDispatcher({ type: "emailNotValid" });
      return false;
    }
    emailDispatcher({ type: "reset" });

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
      emailDispatcher({ type: "emailDuplicate" });
      return false;
    }
    emailDispatcher({ type: "reset" });

    return true;
  };

  return (
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
        <div className={styles.helperText}>{emailState.emailMessage}</div>
      </div>
    </div>
  );
}