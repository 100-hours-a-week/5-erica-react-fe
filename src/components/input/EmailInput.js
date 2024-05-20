import styles from "../../styles/input/emailInput.module.css";
import { EMAIL_STATUS } from "../../utils/status";
import { FetchUrl } from "../../utils/constants";
import { apiRequest } from "../../utils/fetchData";

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
      emailDispatcher({ type: EMAIL_STATUS.Null });
      return false;
    }
    emailDispatcher({ type: EMAIL_STATUS.Reset });

    const emailForm = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && (!emailForm.test(email) || email.length < 5)) {
      emailDispatcher({ type: EMAIL_STATUS.NotValid });
      return false;
    }
    emailDispatcher({ type: EMAIL_STATUS.Reset });

    const isEmailDuplicate = await apiRequest({
      url: `${FetchUrl.email}/${email}`,
      method: "POST",
    }).then((data) => data.status === 400);

    if (isEmailDuplicate) {
      emailDispatcher({ type: EMAIL_STATUS.Duplicate });
      return false;
    }
    emailDispatcher({ type: EMAIL_STATUS.Reset });

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
