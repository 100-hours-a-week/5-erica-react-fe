import styles from "../../styles/input/nicknameInput.module.css";
import { backHost, headers } from "../../static";

export default function NicknameInput({
  nickname,
  setNickname,
  nicknameState,
  nicknameDispatcher,
}) {
  const handleChangeNickname = async (event) => {
    setNickname(event.target.value);
    await checkNicknameValidation(event.target.value);
  };

  //닉네임 유효성 검사
  const checkNicknameValidation = async (nickname) => {
    if (!nickname) {
      nicknameDispatcher({ type: "nicknameNull" });
      return false;
    }
    nicknameDispatcher({ type: "reset" });

    if (String(nickname).includes(" ")) {
      nicknameDispatcher({ type: "nicknameSpace" });
      return false;
    }
    nicknameDispatcher({ type: "reset" });

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
      nicknameDispatcher({ type: "nicknameDuplicate" });
      return false;
    }
    nicknameDispatcher({ type: "reset" });
    return true;
  };

  return (
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
        <div className={styles.helperText}>{nicknameState.nicknameMessage}</div>
      </div>
    </div>
  );
}
