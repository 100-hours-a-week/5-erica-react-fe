import { FetchUrl } from "./constants";
import { apiRequest } from "./fetchData";

export const checkCommentOwner = async ({ postId, commentId }) => {
  try {
    console.log(commentId);
    const checkData = await apiRequest({
      url: `${FetchUrl.posts}/${postId}/comments/checkOwner`,
      method: "POST",
      body: { commentId },
    });

    return checkData;
  } catch (error) {
    console.log(error);
  }
};

export const checkPostOwner = async (postId) => {
  try {
    const checkData = await apiRequest({
      url: FetchUrl.checkPostOwner,
      method: "POST",
      body: { postId },
    });
    console.log(checkData);
    return checkData;
  } catch (error) {
    console.log(error);
  }
};
