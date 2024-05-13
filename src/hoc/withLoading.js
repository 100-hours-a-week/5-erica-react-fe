import PostsSkeleton from "../components/posts/PostsSkeleton";
import PostSkeleton from "../components/posts/PostSkeleton";
import { Navigate } from "react-router-dom";
import { navUrl } from "../utils/navigate";

export default function withLoading(Component, type) {
  return function (props) {
    if (props.loading) {
      return type === "posts" ? <PostsSkeleton /> : <PostSkeleton />;
    }

    if (props.error) {
      alert("로딩 중 에러 발생. 재로그인하십시오.");
      return <Navigate to={navUrl.logIn} />;
    }

    if (!props.loading && props.responseData) {
      return <Component {...props} />;
    }
  };
}
