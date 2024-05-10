import { useParams } from "react-router-dom";
import Comments from "../components/comments/Comments.js";
import { backHost, headers } from "../static.js";
import {  useState } from "react";
import DeletePostModal from "../components/modals/DeletePostModal.js";
import useFetch from "../hooks/useFetch.js";
import PostDetail from "../components/posts/PostDetail.js";

export default function PostDetailPage() {
  const postId = Number(useParams().id);
  const [isPostDelete, setIsPostDelete] = useState(false);

  const {data, error, loading} = useFetch(`${backHost}/api/posts/${postId}`, {
    headers,
    credentials: "include",
  })

  if(!data || loading || error) return null

  if(error) {
    alert("에러가 발생했습니다.");
  };

  return (
    <>
      <PostDetail data={data} setIsPostDelete={setIsPostDelete}/>
      <hr />
      <Comments postId={postId} />
      <DeletePostModal
        postId={postId}
        isPostDelete={isPostDelete}
        setIsPostDelete={setIsPostDelete}
      />
    </>
  );
}

// function PostSkeleton() {
//   return (
//     <div className"=""boardSkeleton">
//       <div className"=""boardHeader">
//         <p className"=""boardTitle"></p>
//         <div className"=""boardHeaderBottom">
//           <div className"=""writer">
//             <div className"=""writerImage"></div>
//             <p className"=""postWriterName"></p>
//             <div className"=""postWriteDate"></div>
//           </div>
//         </div>
//       </div>
//       <div className"=""boardBody">
//         <div className"=""boardImageContainer">
//           <div className"=""boardImage"></div>
//         </div>
//         <div className"=""boardContent"></div>
//       </div>
//     </div>
//   );
// }
