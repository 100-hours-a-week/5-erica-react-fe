import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { postError } from "../../utils/errorMessage";
import { navUrl } from "../../utils/navigate";
import withLogIn from "../../hoc/withLogIn";
import styles from "../../styles/post/UpdatePost.module.css";
import { FetchUrl } from "../../utils/constants";
import { apiRequest } from "../../utils/fetchData";

function UpdateContainer({ responseData, postId }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [postImage, setPostImage] = useState("");
  const [isEnable, setIsEnable] = useState(false);
  const [type, setType] = useState("");

  const navigate = useNavigate();

  useEffect(
    function addPostInfo() {
      if (responseData) {
        setTitle(responseData.title);
        setContent(responseData.content);
        setPostImage(responseData.postImage ?? "");
        setType(responseData.type);
      }
    },
    [responseData]
  );

  useEffect(
    function enableButton() {
      setIsEnable(title && content);
    },
    [title, content]
  );

  const handleChangePostImage = (event) => {
    const reader = new FileReader();
    reader.onload = (data) => {
      setPostImage(data.target.result);
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  const handleClickUpdatePost = async () => {
    console.log({
      title,
      type,
      content,
      postImageInput: postImage,
    });
    setIsEnable(false);
    try {
      const responseData = await apiRequest({
        url: `${FetchUrl.posts}/${postId}`,
        method: "PATCH",
        body: {
          title,
          type,
          content,
          postImageInput: postImage,
        },
      });

      switch (responseData.status) {
        case 200:
          alert("게시글 수정이 완료되었습니다.");
          navigate(`${navUrl.posts}/${postId}`);
          break;
        default:
          alert("수정 실패: 이미지가 너무 크거나 다른 오류로 실패했습니다.");
          break;
      }
    } catch (error) {
      console.error("게시글 수정 중 에러가 발생했습니다:", error);
      alert("게시글 수정 중 에러가 발생했습니다. 잠시 후 다시 시도해주세요.");
      setIsEnable(true);
    }
  };

  return (
    <>
      <form className={styles.boardContainer}>
        <div className={styles.boardLeft}>
          <div className={styles.boardType}>
            <label htmlFor="boardTypeInput" className={styles.inputTitle}>
              주제*
            </label>
            <select
              value={type}
              className={styles.boardTypeSelect}
              id="boardTypeInput"
              onChange={(e) => setType(e.target.value)}
            >
              <option value="coding">개발</option>
              <option value="other">고민</option>
            </select>
          </div>
          <div className={styles.boardTitle}>
            <label htmlFor="boardTitleInput" className={styles.inputTitle}>
              제목*
            </label>
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              maxLength="26"
              id={styles.boardTitleInput}
            />
          </div>
          <div className={styles.boardContent}>
            <label htmlFor="boardContentInput" className={styles.inputTitle}>
              내용*
            </label>
            <textarea
              type="text"
              rows="10"
              value={content}
              maxLength="200"
              onChange={(event) => setContent(event.target.value)}
              id={styles.boardContentInput}
            ></textarea>
          </div>
          <div className={styles.helperTextContainer}>
            <div className={styles.helperText}>
              {!title || !content ? postError : ""}
            </div>
          </div>
        </div>
        <div className={styles.space}></div>
        <div className={styles.updateBoardImage}>
          <div className={styles.updateImageTop}>
            <div className={styles.inputTitle}>포스트 이미지</div>
            <div className={styles.buttonContainer}>
              <label htmlFor="imageInput" className={styles.imageInputButton}>
                추가
              </label>
            </div>
          </div>
          <div className={styles.imageContainer}>
            {postImage ? (
              <img className={styles.imageShow} alt="post" src={postImage} />
            ) : (
              <div className={styles.imageNone}>이미지 없음</div>
            )}
            <input
              type="file"
              className={styles.imageInput}
              id="imageInput"
              onChange={handleChangePostImage}
              accept="image/*"
            />
          </div>
        </div>
      </form>
      <button
        type="button"
        disabled={!isEnable || !title || !content}
        onClick={handleClickUpdatePost}
        className={isEnable ? styles.updateButton : styles.updateButtonDisabled}
      >
        완료
      </button>
    </>
  );
}

export const AuthUpdatePost = withLogIn(UpdateContainer);
