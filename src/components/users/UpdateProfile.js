import styles from "../../styles/UpdateProfile.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { backHost, headers } from "../../static";
import { disableScroll } from "../../utils/scroll";
import DeleteUserModal from "../modals/DeleteUserModal";
import {
  nicknameNullError,
  nicknameSpaceError,
  nicknameDuplicateError,
} from "../../utils/errorMessage";

export default function UpdateProfile() {
  const [profile, setProfile] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [isDelete, setIsDelete] = useState(false);

  const [nicknameNull, setNicknameNull] = useState(false);
  const [nicknameSpace, setNicknameSpace] = useState(false);
  const [nicknameDuplicate, setNicknameDuplicate] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();
  const reader = new FileReader();

  const fetchData = async () => {
    try {
      const response = await fetch(`${backHost}/api/users/user`, {
        headers,
        credentials: "include",
      });
      const userData = await response.json();

      if (userData.status === 200) {
        setEmail(userData.data.email);
        setNickname(userData.data.nickname);
        setProfile(userData.data.profile_image);
        console.log("setProfile");
      } else {
        alert("등록되지 않은 유저입니다.");
        navigate("/posts");
      }
    } catch (error) {
      console.error("유저 데이터 가져오는데 실패했습니다.:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [navigate]);

  const handleChangeNickname = (event) => {
    setNickname(event.target.value);
  };

  //닉네임 유효성 검사
  const checkNicknameValidation = async (nickname) => {
    if (!nickname) {
      setNicknameNull(true);
      return false;
    }
    setNicknameNull(true);

    if (String(nickname).includes(" ")) {
      setNicknameSpace(true);
      return false;
    }
    setNicknameSpace(false);

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
          navigate("/posts");
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
    <section className={styles.updateMain}>
      <p className={styles.pageTitle}>회원정보 수정</p>
      <form className={styles.wrapper}>
        <div className={styles.profileTitle}>
          <p className={styles.inputTitle}>프로필 사진*</p>
          <div className={styles.imageContainer}>
            {profile ? (
              <img className={styles.imageShow} alt="profile" src={profile} />
            ) : (
              <div
                className={styles.imageShow}
                style={{ backgroundColor: "#f4f5f7" }}
              ></div>
            )}
            <div className={styles.imageUpdate}>
              <label htmlFor="imageInput" className={styles.imageUpdateButton}>
                변경
              </label>
              <input
                id={styles.imageInput}
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
          <div id={styles.updateEmailInput}>{email || "불러오는 중"}</div>
        </div>
        <div className={styles.profileNickname}>
          <label htmlFor="nicknameInput" className={styles.inputTitle}>
            닉네임
          </label>
          <input
            type="text"
            id={styles.nicknameInput}
            maxLength="10"
            value={nickname ?? "불러오는 중"}
            onChange={handleChangeNickname}
          />
          <div className={styles.helperTextContainer}>
            <div className={styles.helperText}>
              <div className={styles.helperText}>
                {nicknameNull && nicknameNullError}
                {nicknameSpace && nicknameSpaceError}
                {nicknameDuplicate && nicknameDuplicateError}
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className={styles.profilebutton}>
        <button
          type="button"
          className={styles.profileUpdateButton}
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
    </section>
  );
}
