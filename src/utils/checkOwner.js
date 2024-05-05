import { backHost, headers } from "../static";

export const checkCommentOwner = async (postId, commentId) => {
  try {
    const checkData = await fetch(
      `${backHost}/api/posts/${postId}/comments/checkOwner`,
      {
        headers,
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ commentId }),
      }
    );
    return await checkData.json();
  } catch (error) {
    console.log(error);
  }
};

export const checkPostOwner = async (postId) => {
  try {
    const checkData = await fetch(`${backHost}/api/posts/checkOwner`, {
      headers,
      credentials: "include",
      method: "POST",
      body: JSON.stringify({ postId }),
    });
    return await checkData.json();
  } catch (error) {
    console.log(error);
  }
};
