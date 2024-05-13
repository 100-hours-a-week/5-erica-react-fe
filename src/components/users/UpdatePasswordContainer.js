import styles from "../../styles/UpdatePassword.module.css";
import { useState, useReducer } from "react";
import { backHost, headers } from "../../static";
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

import withLogIn from "../../hoc/withLogIn";

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
        navigate(navUrl.logIn);
        return;
      default:
        alert("비밀번호 수정실패");
        return;
    }
  };

  return (
    <form className={styles.passwordWrapper}>
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
