import Comments from "../components/comments/Comments";
import { useState } from "react";
import DeletePostModal from "../components/modals/DeletePostModal";
import PostDetail from "../components/posts/PostDetail";
import withLogIn from "../hoc/withLogIn"
import withLoading from "../hoc/withLoading";

 function PostDetailPage({data}) {
  const [isPostDelete, setIsPostDelete] = useState(false);

  return (
    <>
      <PostDetail data={data} setIsPostDelete={setIsPostDelete}/>
      <hr />
      <Comments postId={data.postId} />
      <DeletePostModal
        postId={data.postId}
        isPostDelete={isPostDelete}
        setIsPostDelete={setIsPostDelete}
      />
    </>
  );
}

const LoadingPostDetailPage = withLoading(PostDetailPage, "post");
export const AuthPostDetailPage = withLogIn(LoadingPostDetailPage);
