import "../../styles/UpdateProfile.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { backHost, headers } from "../../static";
import { disableScroll } from "../../utils/scroll";
import { DeleteUserModal } from "../modals/Modals";

export default function UpdateProfile() {
  const [profile, setProfile] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [isDelete, setIsDelete] = useState(false);
  const [isNicknameDuplicate, setIsNicknameDuplicate] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();
  const reader = new FileReader();

  useEffect(() => {
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
    fetchData();
  }, [navigate]);

  const handleChangeNickname = (event) => {
    setNickname(event.target.value);
  };

  const handleChangeProfileImage = (event) => {
    reader.onload = (data) => {
      setProfile(data.target.result);
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  const checkNicknameDuplicate = async () => {
    try {
      const response = await fetch(
        `${backHost}/api/users/nickname/${nickname}`,
        {
          headers,
          credentials: "include",
          method: "POST",
        }
      );
      const responseData = await response.json();

      if (responseData.status !== 200) {
        setIsNicknameDuplicate(true);
        return false;
      } else {
        setIsNicknameDuplicate(false);
        return true;
      }
    } catch (error) {
      console.error("중복성 검사 실패:", error);
      return false;
    }
  };

  const handleClickUpdateButton = async () => {
    const isDuplicate = await checkNicknameDuplicate();

    if (!isDuplicate) return;

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
    <>
      <section className="updateMain">
        <p className="pageTitle">회원정보 수정</p>
        <form className="wrapper">
          <div className="profileTitle">
            <p className="inputTitle">프로필 사진*</p>
            <div className="imageContainer">
              {profile ? (
                <img className="imageShow" alt="profile" src={profile} />
              ) : (
                <div
                  className="imageShow"
                  style={{ backgroundColor: "#f4f5f7" }}
                ></div>
              )}
              <div className="imageUpdate">
                <label htmlFor="imageInput" className="imageUpdateButton">
                  변경
                </label>
                <input
                  id="imageInput"
                  onChange={handleChangeProfileImage}
                  type="file"
                  accept="image/*"
                  src={profile}
                />
              </div>
            </div>
          </div>
          <div className="profileEmail">
            <label htmlFor="emailInput" className="inputTitle">
              이메일
            </label>
            <div id="updateEmailInput">{email || "불러오는 중"}</div>
          </div>
          <div className="profileNickname">
            <label htmlFor="nicknameInput" className="inputTitle">
              닉네임
            </label>
            <input
              type="text"
              id="nicknameInput"
              maxLength="10"
              value={nickname ?? "불러오는 중"}
              onChange={handleChangeNickname}
            />
            <div className="helperTextContainer">
              <div className="helperText">
                {isNicknameDuplicate ? "* 중복된 닉네임입니다." : null}
              </div>
            </div>
          </div>
        </form>
        <div className="profilebutton">
          <button
            type="button"
            className="profileUpdateButton"
            onClick={handleClickUpdateButton}
          >
            수정하기
          </button>
        </div>
        <div className="profilebutton">
          <button
            onClick={handleClickUserDelete}
            className="profileDeleteButton"
          >
            회원 탈퇴
          </button>
        </div>
        {showToast ? <div className="updateMessage">수정완료</div> : null}
      </section>
      <DeleteUserModal isDelete={isDelete} setIsDelete={setIsDelete} />
    </>
  );
}
