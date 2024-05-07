import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "../../styles/UpdatePost.module.css";
import { backHost, headers } from "../../static";
import { postError } from "../../utils/errorMessage";

export default function UpdatePost() {
  const postId = Number(useParams().id);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [postImage, setPostImage] = useState("");
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const checkData = await fetch(`${backHost}/api/posts/checkOwner`, {
        headers,
        credentials: "include",
        method: "POST",
        body: JSON.stringify({ postId }),
      });

      const checkResponseData = await checkData.json();

      if (checkResponseData.status === 403) {
        navigate(`/posts/${postId}`);
        alert("본인이 작성한 게시물이 아닙니다.");
        return;
      }

      const postResponse = await fetch(`${backHost}/api/posts/${postId}`, {
        headers,
        credentials: "include",
      });
      const postResponseData = await postResponse.json();

      switch (postResponseData.status) {
        case 200:
          setTitle(postResponseData.data.title);
          setContent(postResponseData.data.content);
          setPostImage(postResponseData.data.postImage ?? "");
          break;
        case 401:
          navigate("/");
          break;
        default:
          alert("해당 게시물이 없습니다");
          navigate("/board");
          break;
      }
    } catch (error) {
      console.error("게시물을 불러오는 중 에러가 발생했습니다:", error);
      alert(
        "게시물을 불러오는 중 에러가 발생했습니다. 잠시 후 다시 시도해주세요."
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, [postId]);

  const handleChangePostImage = (event) => {
    const reader = new FileReader();
    reader.onload = (data) => {
      setPostImage(data.target.result);
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleChangeContent = (event) => {
    setContent(event.target.value);
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
          navigate(`/posts/${postId}`);
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
    <>
      <p className={styles.pageTitle}>게시글 수정</p>
      <form className={styles.boardContainer}>
        <div className={styles.boardTitle}>
          <label htmlFor="boardTitleInput" className={styles.inputTitle}>
            제목*
          </label>
          <input
            type="text"
            maxLength="26"
            value={title}
            onChange={handleChangeTitle}
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
            onChange={handleChangeContent}
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
          disabled={!title || !content}
          onClick={handleClickUpdatePost}
          className={
            title && content ? styles.updateButton : styles.updateButtonDisabled
          }
        >
          완료
        </button>
      </form>
    </>
  );
}
