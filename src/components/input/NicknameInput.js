import styles from "../../styles/input/nicknameInput.module.css";
import { backHost, headers } from "../../static";
import { NICKNAME_STATUS } from "../../utils/status";

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
      nicknameDispatcher({ type: NICKNAME_STATUS.Null });
      return false;
    }
    nicknameDispatcher({ type: NICKNAME_STATUS.Reset });

    if (String(nickname).includes(" ")) {
      nicknameDispatcher({ type: NICKNAME_STATUS.Space });
      return false;
    }
    nicknameDispatcher({ type: NICKNAME_STATUS.Reset });

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
      nicknameDispatcher({ type: NICKNAME_STATUS.Duplicate });
      return false;
    }
    nicknameDispatcher({ type: NICKNAME_STATUS.Reset });
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
