import styles from "../../styles/AddPost.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { postError } from "../../utils/errorMessage";
import { navUrl } from "../../utils/navigate";
import withLogIn from "../../hoc/withLogIn";
import { FetchUrl } from "../../utils/constants";
import { apiRequest } from "../../utils/fetchData";

function AddPostContainer() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [postImage, setPostImage] = useState();
  const [isEnable, setIsEnable] = useState(true);
  const navigate = useNavigate();

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

  const handleClickAddPost = async () => {
    setIsEnable(false);

    try {
      const responseData = await apiRequest({
        url: FetchUrl.posts,
        method: "POST",
        body: {
          title,
          content,
          postImageSrc: postImage,
        },
      });

      switch (responseData.status) {
        case 201:
          alert("게시글 작성이 완성됐습니다.");
          navigate(`${navUrl.posts}/${responseData.data.postId}`);
          return;
        default:
          alert("작성 오류");
          setIsEnable(true);
          return;
      }
    } catch (error) {
      console.error("게시글 작성 중 에러 발생:", error);
      alert("게시글 작성 중 에러가 발생했습니다.");
      setIsEnable(true);
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
          onChange={(event) => setTitle(event.target.value)}
          maxLength="26"
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
          rows="10"
          maxLength="200"
          onChange={(event) => setContent(event.target.value)}
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
          id={styles.boardInputImage}
          onChange={handleChangePostImage}
          accept="image/*"
        />
      </div>
      <button
        type="button"
        disabled={!isEnable || !title || !content}
        onClick={handleClickAddPost}
        className={isEnable ? styles.updateButton : styles.updateButtonDisabled}
      >
        완료
      </button>
    </form>
  );
}

export const AuthAddPost = withLogIn(AddPostContainer);
