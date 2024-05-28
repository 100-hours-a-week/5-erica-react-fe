import styles from "../../styles/UpdatePassword.module.css";
import { useState, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { navUrl } from "../../utils/navigate";
import { usePasswordValidation } from "../../hooks/usePasswordValidation";
import {
  passwordInitialMessage,
  passwordMessageReducer,
} from "../../reducer/passwordReducer";
import {
  passwordCheckInitialMessage,
  passwordCheckMessageReducer,
} from "../../reducer/passwordCheckReducer";
import PasswordInput from "../input/PasswordInput";
import { apiRequest } from "../../utils/fetchData";
import withLogIn from "../../hoc/withLogIn";
import { FetchUrl } from "../../utils/constants";

function UpdatePasswordContainer() {
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const navigate = useNavigate();

  const [passwordState, passwordDispatcher] = useReducer(
    passwordMessageReducer,
    passwordInitialMessage
  );
  const [passwordCheckState, passwordCheckDispatcher] = useReducer(
    passwordCheckMessageReducer,
    passwordCheckInitialMessage
  );

  const isAble = usePasswordValidation(
    password,
    passwordCheck,
    passwordState,
    passwordCheckState
  );

  const handleClickUpdatePassword = async () => {
    try {
      const updateResponse = await apiRequest({
        url: FetchUrl.userPassword,
        method: "PATCH",
        body: { password },
      });

      switch (updateResponse.status) {
        case 201:
          alert("비밀번호가 수정되었습니다.");
          navigate(navUrl.home);
          return;
        default:
          alert("비밀번호 수정실패");
          return;
      }
    } catch (error) {
      console.error("비밀번호 수정 중 에러 발생:", error);
      alert("비밀번호 수정 중 에러가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  return (
    <form className={styles.passwordWrapper}>
      <div className={styles.passwordInnerWrapper}>
        <PasswordInput
          password={password}
          setPassword={setPassword}
          passwordCheck={passwordCheck}
          setPasswordCheck={setPasswordCheck}
          passwordState={passwordState}
          passwordDispatcher={passwordDispatcher}
          passwordCheckState={passwordCheckState}
          passwordCheckDispatcher={passwordCheckDispatcher}
        />
      </div>

      <button
        type="button"
        onClick={handleClickUpdatePassword}
        className={isAble ? styles.updateButton : styles.updateButtonDisabled}
        disabled={!isAble}
      >
        완료
      </button>
    </form>
  );
}

export const AuthUpdatePassword = withLogIn(UpdatePasswordContainer);
