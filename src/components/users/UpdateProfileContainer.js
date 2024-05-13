import { disableScroll } from "../../utils/scroll";
import DeleteUserModal from "../modals/DeleteUserModal";
import styles from "../../styles/UpdateProfile.module.css";
import { backHost, headers } from "../../static";
import { useState, useEffect } from "react";
import {
  nicknameNullError,
  nicknameSpaceError,
  nicknameDuplicateError,
} from "../../utils/errorMessage";
import { navUrl } from "../../utils/navigate";
import withLogIn from "../../hoc/withLogIn";

function UpdateProfileContainer({ responseData }) {
  const [profile, setProfile] = useState("");
  const [nickname, setNickname] = useState("");
  const [isDelete, setIsDelete] = useState(false);

  const [nicknameNull, setNicknameNull] = useState(false);
  const [nicknameSpace, setNicknameSpace] = useState(false);
  const [nicknameDuplicate, setNicknameDuplicate] = useState(false);
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
      if (
        profile &&
        nickname &&
        !nicknameNull &&
        !nicknameSpace &&
        !nicknameDuplicate
      )
        setIsAble(true);
      else setIsAble(false);
    },
    [profile, nickname, nicknameNull, nicknameSpace, nicknameDuplicate]
  );

  if (!responseData) {
    return null;
  }

  const handleChangeNickname = (event) => {
    if (!event.target.value) setNicknameNull(true);
    setNickname(event.target.value);
    setNicknameNull(false);
  };

  //닉네임 유효성 검사
  const checkNicknameValidation = async () => {
    if (!nickname) {
      setNicknameNull(true);
      return false;
    }
    setNicknameNull(false);

    if (String(nickname).includes(" ")) {
      setNicknameSpace(true);
      return false;
    }
    setNicknameSpace(false);

    const isNicknameDuplicate = await fetch(
      `${backHost}/api/users/nickname/${nickname}`,
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
      setNicknameDuplicate(true);
      return false;
    }
    setNicknameDuplicate(false);
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
      const updateResponse = await fetch(`${backHost}/api/users/user/profile`, {
        headers,
        credentials: "include",
        method: "PATCH",
        body: JSON.stringify({
          nickname,
          profile_image: profile,
        }),
      });

      const updateData = await updateResponse.json();

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
          <input
            type="text"
            id={styles.nicknameInput}
            maxLength="10"
            value={nickname}
            onChange={handleChangeNickname}
          />
          <div className={styles.helperTextContainer}>
            <div className={styles.helperText}>
              {nicknameNull && nicknameNullError}
              {nicknameSpace && nicknameSpaceError}
              {nicknameDuplicate && nicknameDuplicateError}
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
          수정하기
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
