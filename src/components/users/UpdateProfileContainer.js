import { disableScroll } from "../../utils/scroll";
import DeleteUserModal from "../modals/DeleteUserModal";
import styles from "../../styles/user/UpdateProfile.module.css";
import { useState, useEffect, useReducer } from "react";
import {
  nicknameMessageReduer,
  nicknameInitialMessage,
} from "../../reducer/nicknameReducer";
import { NICKNAME_STATUS } from "../../utils/status";
import { navUrl } from "../../utils/navigate";
import withLogIn from "../../hoc/withLogIn";
import { FetchUrl } from "../../utils/constants";
import { apiRequest } from "../../utils/fetchData";

function UpdateProfileContainer({ responseData }) {
  const [profile, setProfile] = useState("");
  const [nickname, setNickname] = useState("");
  const [isDelete, setIsDelete] = useState(false);
  const [nicknameState, nicknameDispatcher] = useReducer(
    nicknameMessageReduer,
    nicknameInitialMessage
  );

  const [showToast, setShowToast] = useState(false);
  const [isAble, setIsAble] = useState(false);
  const reader = new FileReader();

  useEffect(
    function userProfile() {
      if (responseData) {
        setProfile(responseData.profile_image);
        setNickname(responseData.nickname);
      }
    },
    [responseData]
  );

  useEffect(
    function enableButton() {
      if (profile && nickname && !nicknameState.nicknameMessage)
        setIsAble(true);
      else setIsAble(false);
    },
    [profile, nickname, nicknameState]
  );

  if (!responseData) {
    return null;
  }

  const handleChangeNickname = async (event) => {
    setNickname(event.target.value);
    await checkNicknameValidation(event.target.value);
  };

  //닉네임 유효성 검사
  const checkNicknameValidation = async () => {
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

    const isNicknameDuplicate = await apiRequest({
      url: `${FetchUrl.nickname}/${nickname}`,
      method: "POST",
    }).then((data) => data.status === 400);

    if (isNicknameDuplicate) {
      nicknameDispatcher({ type: NICKNAME_STATUS.Duplicate });
      return false;
    }
    nicknameDispatcher({ type: NICKNAME_STATUS.Reset });
    return true;
  };

  const handleChangeProfileImage = (event) => {
    reader.onload = (data) => {
      setProfile(data.target.result);
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  const handleClickUpdateButton = async () => {
    const isValid = await checkNicknameValidation();

    if (!isValid) return;

    try {
      const updateData = await apiRequest({
        url: FetchUrl.profile,
        method: "PATCH",
        body: {
          nickname,
          profile_image: profile,
        },
      });

      if (updateData.status === 201) {
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
          window.location.href = navUrl.posts;
        }, 2000);
      } else {
        alert("수정 실패");
      }
    } catch (error) {
      console.error("유저 프로필 업데이트 도중 에러가 발생헀습니다.:", error);
    }
  };

  const handleClickUserDelete = () => {
    disableScroll();
    setIsDelete(true);
  };

  return (
    <>
      <form className={styles.wrapper}>
        <div className={styles.profileTitle}>
          <p className={styles.inputTitle}>프로필 사진*</p>
          <div className={styles.imageContainer}>
            {profile ? (
              <img className={styles.imageShow} alt="profile" src={profile} />
            ) : (
              <div className={styles.imageNone}></div>
            )}
            <div className={styles.imageUpdate}>
              <label htmlFor="imageInput" className={styles.imageUpdateButton}>
                변경
              </label>
              <input
                className={styles.imageInput}
                id="imageInput"
                onChange={handleChangeProfileImage}
                type="file"
                accept="image/*"
                src={profile}
              />
            </div>
          </div>
        </div>
        <div className={styles.profileEmail}>
          <label htmlFor="emailInput" className={styles.inputTitle}>
            이메일
          </label>
          <div id={styles.updateEmailInput}>{responseData.email}</div>
        </div>
        <div className={styles.profileNickname}>
          <label htmlFor="nicknameInput" className={styles.inputTitle}>
            닉네임
          </label>
          <div className={styles.nicknameContainer}>
            <input
              type="text"
              id={styles.nicknameInput}
              maxLength="10"
              value={nickname}
              onChange={handleChangeNickname}
            />
            <div className={styles.helperTextContainer}>
              <div className={styles.helperText}>
                {nicknameState.nicknameMessage}
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className={styles.profilebutton}>
        <button
          type="button"
          className={
            isAble
              ? styles.profileUpdateButton
              : styles.profileUpdateButtonDisabled
          }
          disabled={!isAble}
          onClick={handleClickUpdateButton}
        >
          프로필 저장
        </button>
      </div>
      <div className={styles.profilebutton}>
        <button
          onClick={handleClickUserDelete}
          className={styles.profileDeleteButton}
        >
          회원 탈퇴
        </button>
      </div>
      {showToast ? <div className={styles.updateMessage}>수정완료</div> : null}
      <DeleteUserModal isDelete={isDelete} setIsDelete={setIsDelete} />
    </>
  );
}

export const AuthUpdateProfile = withLogIn(UpdateProfileContainer);
