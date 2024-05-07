import styles from "../../styles/AddPost.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { backHost, headers } from "../../static";

export default function AddPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [postImage, setPostImage] = useState();
  const navigate = useNavigate();
  const [isEnable, setIsEnable] = useState(true);

  const handleOnChangePostImage = (event) => {
    const reader = new FileReader();
    reader.onload = (data) => {
      setPostImage(data.target.result);
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  const handleOnClickAddPost = async () => {
    setIsEnable(false);

    try {
      const response = await fetch(`${backHost}/api/posts`, {
        headers,
        credentials: "include",
        method: "POST",
        body: JSON.stringify({
          title,
          content,
          postImageSrc: postImage,
        }),
      });

      const responseData = await response.json();

      switch (responseData.status) {
        case 201:
          alert("게시글 작성이 완성됐습니다.");
          navigate(`/posts/${responseData.data.postId}`);
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
    <>
      <p className={styles.pageTitle}>게시글 작성</p>
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
            {!title || !content ? "* 제목, 내용을 모두 작성해주세요" : null}
          </div>
        </div>
        <div className={styles.updateBoardImage}>
          <label htmlFor="boardInputImage" className={styles.inputTitle}>
            이미지
          </label>
          <input
            type="file"
            id={styles.boardInputImage}
            onChange={handleOnChangePostImage}
            accept="image/*"
          />
        </div>
        <button
          type="button"
          style={
            isEnable && title && content
              ? { backgroundColor: "#7f6aee" }
              : { backgroundColor: "" }
          }
          disabled={!isEnable || !title || !content}
          onClick={handleOnClickAddPost}
          className={styles.updateButton}
        >
          완료
        </button>
      </form>
    </>
  );
}
