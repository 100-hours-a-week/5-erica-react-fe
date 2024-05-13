import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { postError } from "../../utils/errorMessage";
import { navUrl } from "../../utils/navigate";
import withLogIn from "../../hoc/withLogIn";
import styles from "../../styles/UpdatePost.module.css";
import { backHost, headers } from "../../static";

function UpdateContainer({ responseData, postId }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [postImage, setPostImage] = useState("");
  const [isEnable, setIsEnable] = useState(false);

  const navigate = useNavigate();

  useEffect(
    function addPostInfo() {
      if (responseData) {
        setTitle(responseData.title);
        setContent(responseData.content);
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
    try {
      const response = await fetch(`${backHost}/api/posts/${postId}`, {
        headers,
        credentials: "include",
        method: "PATCH",
        body: JSON.stringify({
          title,
          content,
          postImageInput: postImage,
        }),
      });

      const responseData = await response.json();

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
    }
  };

  return (
    <form className={styles.boardContainer}>
      <div className={styles.boardTitle}>
        <label htmlFor="boardTitleInput" className={styles.inputTitle}>
          제목*
        </label>
        <input
          type="text"
          maxLength="26"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          id={styles.boardTitleInput}
        />
      </div>
      <hr />
      <div className={styles.boardContent}>
        <label htmlFor="boardContentInput" className={styles.inputTitle}>
          내용*
        </label>
        <textarea
          type="text"
          maxLength="200"
          onChange={(event) => setContent(event.target.value)}
          rows="10"
          value={content}
          id={styles.boardContentInput}
        ></textarea>
      </div>
      <hr />
      <div className={styles.helperTextContainer}>
        <div className={styles.helperText}>
          {(!title || !content) && postError}
        </div>
      </div>
      <div className={styles.updateBoardImage}>
        <label htmlFor="boardInputImage" className={styles.inputTitle}>
          이미지
        </label>
        <input
          type="file"
          src={postImage}
          onChange={handleChangePostImage}
          id={styles.boardInputImage}
          accept="image/*"
        />
      </div>
      <button
        type="button"
        disabled={!isEnable}
        onClick={handleClickUpdatePost}
        className={isEnable ? styles.updateButton : styles.updateButtonDisabled}
      >
        완료
      </button>
    </form>
  );
}

export const AuthUpdatePost = withLogIn(UpdateContainer);
